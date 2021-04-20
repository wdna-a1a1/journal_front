<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :width="dialogWidthCal"
      top="5vh"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
             @keyup.enter.native="dataFormSubmit()">
      <el-row>
        <el-form-item label="客户姓名" prop="customerid">
          <el-select v-model="dataForm.customerid" placeholder="请选择客户姓名" filterable
                     :style="{width: '100%'}">
            <el-option v-for="(item, index) in customerIdOptions" :key="index" :label="item.label"
                       :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="退住类型:" prop="retreatType">
          <el-select v-model="dataForm.retreatType" placeholder="请选择退住类型"  :style="{width: '100%'}">
            <el-option v-for="(item, index) in retreatTypeOptions" :key="index" :label="item.label"
                       :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="退住时间:" prop="retreatTime">
          <el-date-picker type="datetime" v-model="dataForm.retreatTime" format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" placeholder="请选择日期选择退住时间:"
                          clearable>
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="退住原因:" prop="retreatReason">
          <el-input v-model="dataForm.retreatReason" type="textarea" placeholder="请输入退住原因"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注:" prop="remarks">
          <el-input v-model="dataForm.remarks" type="textarea" placeholder="请输入备注"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dialogWidth: '40%',
      dataForm: {
        id: 0,
        isDeleted: '',
        customerid: '',
        retreatTime: '',
        retreatType: '',
        retreatReason: '',
        status: '已申请',
        auditStatus: '',
        auditPerson: '',
        auditTime: '',
        remarks: '',
      },
      dataRule: {
        customerid: [{
          required: true,
          message: '请选择客户姓名',
          trigger: 'change'
        }],
        retreatType: [{
          required: true,
          message: '请输入退住类型',
          trigger: 'blur'
        }],
        retreatTime: [{
          required: true,
          message: '请选择日期选择退住时间:',
          trigger: 'change'
        }],
        retreatReason: [{
          required: true,
          message: '请输入退住原因:',
          trigger: 'blur'
        }],
        remarks: [{
          message: '请输入备注:',
          trigger: 'blur'
        }],
      }, retreatTypeOptions: [{
        'label': '正常退住',
        'value': '正常退住'
      }, {
        'label': '保留床位',
        'value': '保留床位'
      }, {
        'label': '死亡退住',
        'value': '死亡退住'
      }],
      customerIdOptions: [],
    }
  },
  methods: {
    init (info) {
      this.getCustomerList()
      this.dataForm.id = info !== undefined ? info.id : ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$axios.post('/retreat/get-by-id', { id: this.dataForm.id }).then(({ data }) => {
            if (data) {
              this.dataForm.isDeleted = data.retreat.isDeleted
              this.dataForm.customerid = data.retreat.customerid
              this.dataForm.retreatTime = data.retreat.retreatTime
              this.dataForm.retreatType = data.retreat.retreatType
              this.dataForm.retreatReason = data.retreat.retreatReason
              this.dataForm.status = data.retreat.status
              this.dataForm.auditStatus = data.retreat.auditStatus
              this.dataForm.auditPerson = data.retreat.auditPerson
              this.dataForm.auditTime = data.retreat.auditTime
              this.dataForm.remarks = data.retreat.remarks
            }
          })
        }
      })
    },
    getCustomerList () {
      this.$axios.post('/customer/get-customer-selector').then(res => {
        if (res.data) {
          this.customerIdOptions = res.data
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$axios.post(`/retreat/${!this.dataForm.id ? 'add' : 'update'}`, {
            'id': this.dataForm.id || undefined,
            'isDeleted': this.dataForm.isDeleted,
            'customerid': this.dataForm.customerid,
            'retreatTime': this.dataForm.retreatTime,
            'retreatType': this.dataForm.retreatType,
            'retreatReason': this.dataForm.retreatReason,
            'status': this.dataForm.status,
            'auditStatus': this.dataForm.auditStatus,
            'auditPerson': this.dataForm.auditPerson,
            'auditTime': this.dataForm.auditTime,
            'remarks': this.dataForm.remarks

          }).then(({ data }) => {
            if (data) {
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error('操作失败')
            }
          })
        }
      })
    }
  }, computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 50 + '%'
      return this.dialogWidth
    }
  }
}
</script>
