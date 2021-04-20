<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
      top="5vh"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="120px"
             @keyup.enter.native="dataFormSubmit()">
      <el-row>
        <el-col :span="10">
          <el-form-item label="昵称:" prop="nickname">
            <el-input v-model="dataForm.nickname" placeholder="请输入昵称" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="dataForm.username" placeholder="请输入用户名" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!dataForm.id">
        <el-col :span="10">
          <el-form-item label="密码:" prop="password1">
            <el-input v-model="dataForm.password1" autocomplete="off" placeholder="请输入密码" type="password" clearable
                      show-password
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="再次输入密码:" prop="password2">
            <el-input v-model="dataForm.password2" autocomplete="off" placeholder="请输入再次输入密码" type="password" clearable
                      show-password
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="员工编号:" prop="userCode">
            <el-input v-model="dataForm.userCode" placeholder="请输入员工编号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="性别:" prop="sex">
            <el-select v-model="dataForm.sex" placeholder="请选择性别" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in sexOptions" :key="index" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="电子邮件:" prop="email">
            <el-input v-model="dataForm.email" placeholder="请输入电子邮件" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="电话号码:" prop="phoneNumber">
            <el-input v-model="dataForm.phoneNumber" placeholder="电话号码" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>


      </el-row>
      <!--修改密码Start-->

      <el-dialog
        width="40%"
        title="修改密码"
        :visible.sync="innerVisible"
        @close="closeModifyPasswordHandle"
          top="5vh"
        append-to-body>
        <el-form-item label="原密码:" prop="originalPassword">
          <el-input v-model="dataForm.originalPassword" autocomplete="off" placeholder="请输入密码" type="password" clearable
                    show-password
                    :style="{width: '80%'}"></el-input>
        </el-form-item>

        <el-form-item label="新密码:" prop="password1">
          <el-input v-model="dataForm.password1" autocomplete="off" placeholder="请输入密码" type="password" clearable
                    show-password
                    :style="{width: '80%'}"></el-input>
        </el-form-item>


        <el-form-item label="再次输入新密码:" prop="password2">
          <el-input v-model="dataForm.password2" autocomplete="off" placeholder="请输入再次输入密码" type="password"
                    clearable
                    show-password
                    :style="{width: '80%'}"></el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
      <el-button @click="closeModifyPasswordHandle">取消</el-button>
      <el-button type="primary" @click="modifyPassword()">确定</el-button>
    </span>

      </el-dialog>
      <!--修改密码End-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="dataForm.id" @click="beforeModifyPassword">修改密码</el-button>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import rsa from '@/utils/rsa'

export default {
  data () {
    let validatePass1 = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入密码'))
      } else {
        if (this.dataForm.password1 !== '') {
          this.$refs.dataForm.validateField('password2')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.password1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      innerVisible: false,
      dialogWidth: '40%',
      visible: false,
      backupPass: '',
      isModifyPass: false,
      dataForm: {
        id: 0,
        isDeleted: '',
        nickname: '',
        username: '',
        password1: '',
        password2: '',
        userCode: '',
        sex: '',
        email: '',
        phoneNumber: '',
        originalPassword: ''
      },
      dataRule: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password1: [{ validator: validatePass1, trigger: 'blur' }],
        password2: [{ validator: validatePass2, trigger: 'blur' }],
        userCode: [{ required: true, message: '请输入员工编号', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        email: [{ required: true, message: '请输入电子邮件', trigger: 'blur' }],
        phoneNumber: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        originalPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
      },
      sexOptions: [{
        'label': '男',
        'value': 1
      }, {
        'label': '女',
        'value': 2
      }],
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.dataForm.password1 = ''
      this.dataForm.password2 = ''
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.isUpdate = true
          this.$axios.post('/user/get-by-id', { id: this.dataForm.id }).then(({ data }) => {
            if (data) {
              this.dataForm.isDeleted = data.user.isDeleted
              this.dataForm.nickname = data.user.nickname
              this.dataForm.username = data.user.username
              this.dataForm.password1 = data.user.password
              this.dataForm.password2 = data.user.password
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
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            this.dataForm.password2 = rsa.encrypt(this.dataForm.password2)
          }
          this.$axios.post(`/user/${!this.dataForm.id ? 'add' : 'update'}`, {
            'id': this.dataForm.id || undefined,
            'isDeleted': this.dataForm.isDeleted,
            'nickname': this.dataForm.nickname,
            'username': this.dataForm.username,
            'password': this.dataForm.password2,
            'sex': this.dataForm.sex,
            'email': this.dataForm.email,
            'phoneNumber': this.dataForm.phoneNumber,
            'userCode': this.dataForm.userCode

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
    },
    beforeModifyPassword () {
      this.innerVisible = true
      this.backupPass = this.dataForm.password1
      this.dataForm.password1 = ''
      this.dataForm.password2 = ''

    },
    modifyPassword () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.originalPassword = rsa.encrypt(this.originalPassword)
          this.$axios.post('/user/modify-password', {
            originalPassword: this.dataForm.originalPassword,
            id: this.dataForm.id
          }).then(res => {
            if (res.data) {
              this.isModifyPass = true
              this.dataForm.password1 = rsa.encrypt(this.dataForm.password1)
              this.dataForm.password2 = this.dataForm.password1
              this.$message.success({
                message: '操作成功',
                duration: 500,
                onClose: () => {
                  this.$confirm('是否提交修改修改信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.dataFormSubmit()
                  }).catch(() => {
                    this.$message.info({
                      message: '已取消自动提交修改操作'
                    })
                  })
                }
              })
            } else {
              this.$message.error({
                message: '修改密码失败,请检查原密码是否正确!',
              })
            }
          })
          this.closeModifyPasswordHandle()
          this.dataForm.originalPassword = ''

        }
      })
    },
    closeModifyPasswordHandle () {
      this.innerVisible = false
      if (!this.isModifyPass) {
        this.dataForm.password1 = this.backupPass
        this.dataForm.password2 = this.backupPass
      }
    }
  }
}
</script>
