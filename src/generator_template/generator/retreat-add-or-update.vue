<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="" prop="isDeleted">
        <el-input v-model="dataForm.isDeleted" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="customerid">
        <el-input v-model="dataForm.customerid" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="retreatTime">
        <el-input v-model="dataForm.retreatTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="retreatType">
        <el-input v-model="dataForm.retreatType" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="retreatReason">
        <el-input v-model="dataForm.retreatReason" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="status">
        <el-input v-model="dataForm.status" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="auditStatus">
        <el-input v-model="dataForm.auditStatus" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="auditPerson">
        <el-input v-model="dataForm.auditPerson" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="auditTine">
        <el-input v-model="dataForm.auditTine" placeholder="" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        isDeleted: '',
        customerid: '',
        retreatTime: '',
        retreatType: '',
        retreatReason: '',
        status: '',
        auditStatus: '',
        auditPerson: '',
        auditTine: ''
      },
      dataRule: {
        isDeleted: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        customerid: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        retreatTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        retreatType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        retreatReason: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        auditStatus: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        auditPerson: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        auditTine: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/generator/retreat/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.isDeleted = data.retreat.isDeleted
              this.dataForm.customerid = data.retreat.customerid
              this.dataForm.retreatTime = data.retreat.retreatTime
              this.dataForm.retreatType = data.retreat.retreatType
              this.dataForm.retreatReason = data.retreat.retreatReason
              this.dataForm.status = data.retreat.status
              this.dataForm.auditStatus = data.retreat.auditStatus
              this.dataForm.auditPerson = data.retreat.auditPerson
              this.dataForm.auditTine = data.retreat.auditTine
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/generator/retreat/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'isDeleted': this.dataForm.isDeleted,
              'customerid': this.dataForm.customerid,
              'retreatTime': this.dataForm.retreatTime,
              'retreatType': this.dataForm.retreatType,
              'retreatReason': this.dataForm.retreatReason,
              'status': this.dataForm.status,
              'auditStatus': this.dataForm.auditStatus,
              'auditPerson': this.dataForm.auditPerson,
              'auditTine': this.dataForm.auditTine
            })
          }).then(({ data }) => {
            if (data) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error("操作失败")
            }
          })
        }
      })
    }
  }
}
</script>
