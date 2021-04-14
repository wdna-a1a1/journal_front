<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="" prop="sessionId">
        <el-input v-model="dataForm.sessionId" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="creationTime">
        <el-input v-model="dataForm.creationTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="lastAccessTime">
        <el-input v-model="dataForm.lastAccessTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="maxInactiveInterval">
        <el-input v-model="dataForm.maxInactiveInterval" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="expiryTime">
        <el-input v-model="dataForm.expiryTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="principalName">
        <el-input v-model="dataForm.principalName" placeholder="" />
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
        primaryId: 0,
        sessionId: '',
        creationTime: '',
        lastAccessTime: '',
        maxInactiveInterval: '',
        expiryTime: '',
        principalName: ''
      },
      dataRule: {
        sessionId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        creationTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        lastAccessTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        maxInactiveInterval: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        expiryTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        principalName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.primaryId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.primaryId) {
          this.$http({
            url: this.$http.adornUrl(`/generator/springsession/info/${this.dataForm.primaryId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.sessionId = data.springSession.sessionId
              this.dataForm.creationTime = data.springSession.creationTime
              this.dataForm.lastAccessTime = data.springSession.lastAccessTime
              this.dataForm.maxInactiveInterval = data.springSession.maxInactiveInterval
              this.dataForm.expiryTime = data.springSession.expiryTime
              this.dataForm.principalName = data.springSession.principalName
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
            url: this.$http.adornUrl(`/generator/springsession/${!this.dataForm.primaryId ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'primaryId': this.dataForm.primaryId || undefined,
              'sessionId': this.dataForm.sessionId,
              'creationTime': this.dataForm.creationTime,
              'lastAccessTime': this.dataForm.lastAccessTime,
              'maxInactiveInterval': this.dataForm.maxInactiveInterval,
              'expiryTime': this.dataForm.expiryTime,
              'principalName': this.dataForm.principalName
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
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
