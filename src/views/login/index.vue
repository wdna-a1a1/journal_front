<template>
  <div id="app">
    <el-container>
      <el-col style="display: flex" class="hidden-xs-only" :xs="1" :sm="12" :md="14" :lg="16" :xl="18">
        <div class="left-bg" :style="{ backgroundImage: 'url(' + pic.picPath + ')' }">
          <div class="image-info-box">
            <el-row>
              <el-col class="conutry">
                <span>{{ pic.country }}</span>
              </el-col>
              <el-col class="address">
                <span>{{ pic.address }}</span>
              </el-col>
              <el-col class="pic-info">
                <span>
                  Photo by
                  <el-link>{{ pic.author }}</el-link>
                  on
                  <el-link>{{ pic.link }}</el-link>
                </span>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="login-box">
          <div class="right-info">
            <img width="150px" height="150px" src="../../assets/alllogo.jpg" style="border-radius: 50%;">
            <h2 style="font-size:28px;">欢迎使用</h2>
            <h2 style="font-family: Lexend-B,serif;font-size:32px;">期刊稿件管理系统</h2>
          </div>
          <el-form ref="loginForm" :model="loginForm" status-icon :rules="loginRules" label-width="80px"
                   class="form-style">
            <el-form-item label="用户名:" prop="username">
              <el-input ref="username" v-model="loginForm.username" name="username" type="text" tabindex="1"
                        auto-complete="on"/>
            </el-form-item>

            <el-form-item label="密码:" prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                :show-password="true"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="loginForm.remember" style="float: left;">记住我</el-checkbox>
              <el-button style="float: right;" type="primary" @click="handleLogin('loginForm')">提交</el-button>
            </el-form-item>
            <el-form-item>
              <el-link style="float: left;line-height: 20px!important;" type="primary">忘记密码？</el-link>
              <el-link style="float: right;line-height: 20px!important;" @click="handleRegister">还没有账号？点击注册 👉</el-link>
            </el-form-item>
          </el-form>
          <div style="text-align: center;">
            <el-row>
              <el-col :span="24">
                <foot/>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-container>
  </div>
</template>

<script>
import Foot from '../Foot.vue'
import rsa from '@/utils/rsa'

export default {
  name: 'Login',
  components: {
    Foot
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length<=0) {
        callback(new Error('请输入用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不应该低于6位！'))
      } else {
        callback()
      }
    }
    return {
      copyright: 'Copyright © 2021 wdna',
      thanks: '',
      pic: {
        country: '',
        address: 'Journal Article',
        author: 'xxxx',
        link: 'xxxxx',
        picPath: require('../../assets/login-logo.jpg')
      },
      userToken: '',
      loginForm: {
        username: '',
        password: '',
        remember: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          /*  let pwd = rsa.encrypt(this.loginForm.password)

            temp.password = pwd*/
          let temp = JSON.parse(JSON.stringify(this.loginForm))
          this.$store.dispatch('user/login', temp).then(() => {
            this.$router.push({path: this.redirect || '/'})

          }).catch(() => {

          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped="scoped">
.logo {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/login-logo.jpg');
}

.login-box {
}

.right-info {
  margin-top: 10%;
  margin-left: 10%;
}

.form-style .el-form-item {
  margin-bottom: 36px !important;
}

.form-style {
  margin-top: 100px;
  margin-right: 10%;
}

.left-bg {
  position: relative !important;
  width: 100%;
  height: 100%;
  background-position: 0% 0%;
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-animation-name: backgroundWalk;
  animation-name: backgroundWalk;
  -webkit-animation-duration: 36s;
  animation-duration: 36s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

@keyframes backgroundWalk {
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
}

.conutry {
  font-size: 100px;
  color: #b9b9b9;
  font-family: Lexend-B, serif;
}

.address {
  font-size: 24px;
  color: #d1d1d1;
  position: relative;
  left: 2%;
}

.pic-info {
  margin-top: 40px;
  font-size: 14px;
  color: #d1d1d1;
  position: relative;
  left: 5%;
}

.image-info-box {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 40px;
  z-index: 2 !important;
}

.image-info-box .el-link {
  color: #d1d1d1;
  margin-bottom: 4px;
}


</style>
