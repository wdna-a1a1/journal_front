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
      <el-form-item label="" prop="outgoingReason">
        <el-input v-model="dataForm.outgoingReason" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="outgoingTime">
        <el-input v-model="dataForm.outgoingTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="expectedReturnTime">
        <el-input v-model="dataForm.expectedReturnTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="actualReturnTime">
        <el-input v-model="dataForm.actualReturnTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="escorted">
        <el-input v-model="dataForm.escorted" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="relation">
        <el-input v-model="dataForm.relation" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="escortedTel">
        <el-input v-model="dataForm.escortedTel" placeholder="" />
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
        outgoingReason: '',
        outgoingTime: '',
        expectedReturnTime: '',
        actualReturnTime: '',
        escorted: '',
        relation: '',
        escortedTel: '',
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
        outgoingReason: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        outgoingTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        expectedReturnTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        actualReturnTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        escorted: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        relation: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        escortedTel: [
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
            url: this.$http.adornUrl(`/generator/outgoing/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
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
              this.dataForm.auditTine = data.outgoing.auditTine
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
            url: this.$http.adornUrl(`/generator/outgoing/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
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
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
