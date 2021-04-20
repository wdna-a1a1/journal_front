<template>
  <div id="app">
    <el-dialog
      ref="add_update"
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      :width="dialogWidthCal"
        top="5vh"
    >
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px"
               @keyup.enter.native="dataFormSubmit()">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户姓名:" prop="customerid">
              <el-select v-model="dataForm.customerid" placeholder="请选择客户姓名" filterable clearable
                         :style="{width: '100%'}">
                <el-option v-for="(item, index) in customerIdOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外出原因:" prop="outgoingReason">
              <el-input v-model="dataForm.outgoingReason" placeholder="请输入外出原因" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="flex">
          <el-col :span="12">
            <el-form-item label="外出时间:" prop="outgoingTime">
              <el-date-picker type="datetime" v-model="dataForm.outgoingTime" format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" placeholder="请选择日期选择"
                              clearable>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计回来时间:" prop="expectedReturnTime">
              <el-date-picker type="datetime" v-model="dataForm.expectedReturnTime" format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" placeholder="请选择预计回来时间"
                              clearable>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="陪同人:" prop="escorted">
              <el-input v-model="dataForm.escorted" placeholder="请输入陪同人" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="与陪同人关系:" prop="relation">
              <el-input v-model="dataForm.relation" placeholder="请输入与陪同人关系" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="陪同人电话:" prop="escortedTel">
                <el-input v-model="dataForm.escortedTel" placeholder="请输入陪同人电话" clearable
                          :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
    <el-dialog
      ref="actualReturnTimeDialog"
      title="登记回来时间"
      width="500px"
        top="5vh"
      :close-on-click-modal="false"
      :visible.sync="timeVisible">
      <el-date-picker type="datetime" v-model="dataForm.actualReturnTime" format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" placeholder="请选择预计回来时间"
                      clearable>
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
      <el-button @click="timeVisible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      timeVisible: false,
      dialogWidth: '40%',
      dataForm: {
        id: 0,
        isDeleted: '',
        customerid: '',
        outgoingReason: '',
        outgoingTime: '',
        expectedReturnTime: '',
        actualReturnTime: '',
        escorted: '',
        relation: '',
        escortedTel: '',
        auditStatus: '',
        auditPerson: '',
        auditTime: '',
        remarks: '无',
      },
      dataRule: {
        customerid: [{
          required: true,
          message: '请选择客户姓名',
          trigger: 'change'
        }],
        outgoingReason: [{
          required: true,
          message: '请输入外出原因:',
          trigger: 'blur'
        }],
        outgoingTime: [{
          required: true,
          message: '请选择外出时间:',
          trigger: 'change'
        }],
        expectedReturnTime: [{
          required: true,
          message: '请选择预计回来时间:',
          trigger: 'change'
        }],
        escorted: [{
          required: true,
          message: '请输入陪同人:',
          trigger: 'blur'
        }],
        relation: [{
          required: true,
          message: '请输入与陪同人关系:',
          trigger: 'blur'
        }],
        escortedTel: [{
          required: true,
          message: '请输入陪同人电话:',
          trigger: 'blur'
        }],
        remarks: [{
          message: '请输入备注:',
          trigger: 'blur'
        }],
      },
      customerIdOptions: [],
    }
  },
  methods: {
    init (info, key) {
      this.dataForm.id = info !== undefined ? info.id : ''
      this.$nextTick(() => {
        if (key !== 1) {
          this.timeVisible = true
        }
        this.visible = true
        this.getCustomerList()

        new Promise(() => {
          this.$refs['dataForm'].resetFields()
        }).then().catch(() => {
          this.$refs['dataForm'].resetFields()
        })

        if (this.dataForm.id) {
          this.$axios.post('/out-going/get-by-id', { id: this.dataForm.id }).then(({ data }) => {
            if (data) {
              this.dataForm.isDeleted = data.outgoing.isDeleted
              this.dataForm.customerid = data.outgoing.customerid
              this.dataForm.outgoingReason = data.outgoing.outgoingReason
              this.dataForm.outgoingTime = data.outgoing.outgoingTime
              this.dataForm.expectedReturnTime = data.outgoing.expectedReturnTime
              this.dataForm.actualReturnTime = data.outgoing.actualReturnTime
              this.dataForm.escorted = data.outgoing.escorted
              this.dataForm.relation = data.outgoing.relation
              this.dataForm.escortedTel = data.outgoing.escortedTel
              this.dataForm.auditStatus = data.outgoing.auditStatus
              this.dataForm.auditPerson = data.outgoing.auditPerson
              this.dataForm.auditTime = data.outgoing.auditTime
              this.dataForm.remarks = data.outgoing.remarks
            }
          })
        } else {
          this.dataForm.outgoingTime = this.$moment(new Date()).format('yyyy-MM-DD HH:mm:ss').toString()
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
          this.$axios.post(`/out-going/${!this.dataForm.id ? 'add' : 'update'}`, {
            'id': this.dataForm.id || undefined,
            'isDeleted': this.dataForm.isDeleted,
            'customerid': this.dataForm.customerid,
            'outgoingReason': this.dataForm.outgoingReason,
            'outgoingTime': this.dataForm.outgoingTime,
            'expectedReturnTime': this.dataForm.expectedReturnTime,
            'actualReturnTime': this.dataForm.actualReturnTime,
            'escorted': this.dataForm.escorted,
            'relation': this.dataForm.relation,
            'escortedTel': this.dataForm.escortedTel,
            'auditStatus': this.dataForm.auditStatus,
            'auditPerson': this.dataForm.auditPerson,
            'auditTime': this.dataForm.auditTime,
            'remarks': this.dataForm.remarks
          }).then(({ data }) => {
            if (data === true) {
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.visible = false
                  this.timeVisible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error('操作失败')
              this.visible = false
              this.timeVisible = false
            }
          })
        }
      })
    },
  }, computed: {
    dialogWidthCal () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dialogWidth = (1 - this.$store.state.innerWH.innerWidth / 1920) * 70 + 50 + '%'
      return this.dialogWidth
    }
  }
}
</script>
<style scoped="scoped">
@import "../../../styles/mix.scss";

#app {
}
</style>
