<template>
  <div class="login">
    <div class="login-left">
      <p class="title-big">NA 游戏后台管理系统</p>
    </div>
    <div class="login-right">
      <el-form :model="userinfo" :rules="rules" :ref="userinfo">
        <el-form-item label="用户名" prop="username">
          <el-input class="input" placeholder="请输入" v-model="userinfo.username" :maxlength='16'></el-input>
        </el-form-item>
        <el-form-item label="密码" class="justfy2" prop="password">
          <el-input type="password" class="input" placeholder="请输入" v-model="userinfo.password" :maxlength='16'></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input class="input codeInput" placeholder="请输入" v-model="userinfo.captcha"></el-input>
          <!--<a href="#" class="getBtn" v-if="isgetCode === false" @click="changGetcode($event,true)">获取验证码</a>-->
          <div class="code-imgbox" @click="changGetcode" v-loading="codeFetching">
            <el-button class="code-btn" type="text" v-if="!userinfo.copyCode">获取验证码</el-button>
            <img v-else class="code-img" :src="userinfo.copyCode">
          </div>
        </el-form-item>
        <el-form-item class="justfy3">
          <el-button @click="onSubmit" class="justfy1" :loading="loading">登录</el-button>
          <!--<el-button @click="forgetPassword" >忘记密码</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { invoke } from '@/libs/fetchLib'
  export default {
    data () {
      var checkUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'))
        } else if (value.length < 5) {
          callback(new Error('用户名不能少于5位'))
        } else if (value.length >= 15) {
          callback(new Error('用户名不能多于16位'))
        } else {
          callback()
        }
      } // 验证用户名
      var checkPasswords = (rule, value, callback) => {
        if (value === '') {
          this.pwdSmall = false
          callback(new Error('密码不能为空'))
        } else if (value.length < 5) {
          this.pwdSmall = false
          callback(new Error('密码不能少于5位'))
        } else if (value.length >= 15) {
          this.pwdSmall = false
          callback(new Error('密码不能多于16位'))
        } else {
          this.pwdSmall = value.length < 10
          callback()
        }
        callback()
      } // 验证密码
      var checkCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
          this.isgetCode = false
        } else {
          callback()
        }
      } // 验证验证码
      return {
        loading: false,
        isgetCode: false, // 点击获取验证码
        pwdSmall: false,
        rules: {
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          password: [
            {validator: checkPasswords, trigger: 'blur'}
          ],
          captcha: [
            {validator: checkCaptcha, trigger: 'change'}
          ]
        },
        userinfo: {
          username: '',
          password: '',
          captcha: '',
          copyCode: ''
        },
        codeFetching: false
      }
    },
    mounted: function () {
    },
    methods: {
      changGetcode () {
        if (this.codeFetching) return
        var forCode = {}
        forCode.usage = 'login'
        forCode.relKey = 'Platform_' + this.userinfo.username
        // console.log('获取验证码的传递数据是: ', forCode)
        this.codeFetching = true
        invoke({
          url: this.$store.state.isapi.randomCaptcha.url,
          method: this.$store.state.isapi.randomCaptcha.method,
          data: forCode
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
              this.codeFetching = false
            } else {
              var code = ret.data.payload
              // console.log('验证码是:', code)
              this.codeFetching = false
              this.userinfo.copyCode = `data:image/png;base64,${code}`
            }
          }
        )
        this.isgetCode = true
      },
      onSubmit () {
        this.loading = true
        if (this.userinfo.username === '' || this.userinfo.password === '' || this.userinfo.captcha === '') {
          this.$message({
            message: '请输入完整用户信息!',
            type: 'error'
          })
          this.loading = false
        } else {
          var result = this.userinfo
          this.$store.commit({
            type: 'getLogin',
            data: result
          }) // 储存登录信息
          const cfg = {
            url: this.$store.state.isapi.login.url,
            method: this.$store.state.isapi.login.method,
            data: this.$store.state.loginInfo
          }
          invoke(cfg).then(
            result => {
              const [err, ret] = result
              if (err) {
                this.$message({
                  message: err.response.data.err.msg,
                  type: 'error'
                })
                this.changGetcode()
              } else {
                this.$message({
                  message: '登陆成功!',
                  type: 'success'
                })
                var reback = ret.data.payload
                this.$store.commit({
                  type: 'getBacklogin',
                  data: reback
                })
                this.$store.commit('changeIslogin')
                console.log(reback)
              }
              this.loading = false
            }
          )
        }
      },
      forgetPassword () {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{display: flex;}
.login-left{flex: 0.6;text-align: center;padding-top: 20%;}
.login-right{flex: 0.4;padding-top: 17%;}
.title-big{font-size: 4rem;}

.input{width: 20rem;}
.codeInput{width:120px;overflow: auto;float: left}
.code-img{width:100%; height: 34px;border: 1px solid #eee; border-radius: 2px}
.code-btn{text-align: center;width: 100%}
.justfy1{width: 20rem;margin-left: 4.5rem;}
.justfy2{margin-left: 1.2rem;}
.justfy3{}
/**/

.code-imgbox{width: 120px; height: 34px;margin-left: 0.15rem;float: left;}
</style>
