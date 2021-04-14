<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="createBy">
        <el-input v-model="dataForm.createBy" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="updateBy">
        <el-input v-model="dataForm.updateBy" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="isDeleted">
        <el-input v-model="dataForm.isDeleted" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="username">
        <el-input v-model="dataForm.username" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input v-model="dataForm.password" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="sex">
        <el-input v-model="dataForm.sex" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="email">
        <el-input v-model="dataForm.email" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="phoneNumber">
        <el-input v-model="dataForm.phoneNumber" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="userCode">
        <el-input v-model="dataForm.userCode" placeholder="" />
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
        createTime: '',
        createBy: '',
        updateTime: '',
        updateBy: '',
        isDeleted: '',
        nickname: '',
        username: '',
        password: '',
        sex: '',
        email: '',
        phoneNumber: '',
        userCode: ''
      },
      dataRule: {
        createTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        createBy: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        updateBy: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        isDeleted: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        userCode: [
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
            url: this.$http.adornUrl(`/generator/user/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.createTime = data.user.createTime
              this.dataForm.createBy = data.user.createBy
              this.dataForm.updateTime = data.user.updateTime
              this.dataForm.updateBy = data.user.updateBy
              this.dataForm.isDeleted = data.user.isDeleted
              this.dataForm.nickname = data.user.nickname
              this.dataForm.username = data.user.username
              this.dataForm.password = data.user.password
              this.dataForm.sex = data.user.sex
              this.dataForm.email = data.user.email
              this.dataForm.phoneNumber = data.user.phoneNumber
              this.dataForm.userCode = data.user.userCode
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
            url: this.$http.adornUrl(`/generator/user/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'createTime': this.dataForm.createTime,
              'createBy': this.dataForm.createBy,
              'updateTime': this.dataForm.updateTime,
              'updateBy': this.dataForm.updateBy,
              'isDeleted': this.dataForm.isDeleted,
              'nickname': this.dataForm.nickname,
              'username': this.dataForm.username,
              'password': this.dataForm.password,
              'sex': this.dataForm.sex,
              'email': this.dataForm.email,
              'phoneNumber': this.dataForm.phoneNumber,
              'userCode': this.dataForm.userCode
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
