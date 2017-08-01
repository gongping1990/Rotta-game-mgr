<template>
  <div class="login">
    <div class="login-left">
      <p class="title-big">NA 游戏后台管理系统</p>
      <p class="title-small">--成都罗塔科技</p>
    </div>
    <div class="login-right">
      <el-form :model="userinfo" :rules="rules" :ref="userinfo">
        <el-form-item label="用户名" prop="username">
          <el-input class="input" placeholder="请输入" v-model="userinfo.username" :maxlength='16'></el-input>
        </el-form-item>
        <el-form-item label="密码" class="justfy2" prop="password">
          <el-input type="password" class="input" placeholder="请输入" v-model="userinfo.password" :maxlength='16'></el-input>
          <div class="el-form-item__error" v-if="pwdSmall">密码强度弱</div>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input class="input codeInput" placeholder="请输入" v-model="userinfo.captcha"></el-input>
          <!--<a href="#" class="getBtn" v-if="isgetCode === false" @click="changGetcode($event,true)">获取验证码</a>-->
          <div class="codeImgBox" @click="changGetcode">
            <canvas id="canvasCode" width="120" height="36" ></canvas>
          </div>
        </el-form-item>
        <el-form-item class="justfy3">
          <el-button @click="onSubmit" class="justfy1 botton" :loading="loading">登陆</el-button>
          <el-button @click="forgetPassword" class="botton">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="opacity: 0">2017-7-25 18:12:51</div>
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
      var pwd = /(?=.*[a-zA-Z])(?=.*[\d])[\w\W]{6,16}/
      var reg = new RegExp(pwd)
      if (value === '') {
        this.pwdSmall = false
        callback(new Error('密码不能为空'))
      } else if (value.length < 5) {
        this.pwdSmall = false
        callback(new Error('密码不能少于5位'))
      } else if (value.length >= 15) {
        this.pwdSmall = false
        callback(new Error('密码不能多于16位'))
      } else if (!reg.exec(value)) {
        this.pwdSmall = false
        callback(new Error('密码必须由字母、数字、符号组成,密码长度为6-16位'))
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
      }
    }
  },
  mounted: function () {
    this.canvasChangGetcode()
  },
  methods: {
    canvasChangGetcode (e) {
      let str = this.userinfo.copyCode || '获取验证码'
      // 绘制验证码
      var drawPic = () => {
        var canvas = document.getElementById('canvasCode')
        console.log(canvas)
        var width = canvas.width
        var height = canvas.height
        var ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        // 绘制背景色
        ctx.fillStyle = randomColor(180, 240) // 颜色若太深可能导致看不清
        ctx.fillRect(0, 0, width, height)

        if (str === '获取验证码') {
          // 绘制文字
          for (var o = 0; o < 5; o++) {
            var txt1 = Array.from(str.toString())[o]
            ctx.fillStyle = randomColor(50, 160) // 随机生成字体颜色
            ctx.font = 20 + 'px SimHei' // 随机生成字体大小
            var x1 = 10 + o * 25
            var y1 = randomNum(25, 45)
            var deg1 = randomNum(-45, 45)
            // 修改坐标原点和旋转角度
            ctx.translate(x1, y1)
            ctx.rotate(deg1 * Math.PI / 180)
            ctx.fillText(txt1, 0, 0)
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg1 * Math.PI / 180)
            ctx.translate(-x1, -y1)
          }
        } else {
          // 绘制文字
          for (var i = 0; i < 4; i++) {
            var txt = Array.from(str.toString())[i]
            ctx.fillStyle = randomColor(50, 160) // 随机生成字体颜色
            ctx.font = randomNum(15, 40) + 'px SimHei' // 随机生成字体大小
            var x = 10 + i * 25
            var y = randomNum(25, 45)
            var deg = randomNum(-45, 45)
            // 修改坐标原点和旋转角度
            ctx.translate(x, y)
            ctx.rotate(deg * Math.PI / 180)
            ctx.fillText(txt, 0, 0)
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-x, -y)
          }

          // 绘制干扰线
          for (var k = 0; k < 4; k++) {
            ctx.strokeStyle = randomColor(40, 180)
            ctx.beginPath()
            ctx.moveTo(randomNum(0, width), randomNum(0, height))
            ctx.lineTo(randomNum(0, width), randomNum(0, height))
            ctx.stroke()
          }
          // 绘制干扰点
          for (var j = 0; j < 50; j++) {
            ctx.fillStyle = randomColor(0, 255)
            ctx.beginPath()
            ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
            ctx.fill()
          }
        }
      }

      function randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      }

      /** 生成一个随机色 **/
      function randomColor (min, max) {
        var r = randomNum(min, max)
        var g = randomNum(min, max)
        var b = randomNum(min, max)
        return 'rgb(' + r + ' , ' + g + ' , ' + b + ')'
      }

      drawPic()
    },
    changGetcode () {
      var forCode = {}
      forCode.usage = 'login'
      forCode.relKey = 'Platform_' + this.userinfo.username
      // console.log('获取验证码的传递数据是: ', forCode)
      invoke({
        url: this.$store.state.isapi.randomCaptcha.url,
        method: this.$store.state.isapi.randomCaptcha.method,
        data: forCode
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var code = ret.data.payload.code
            // console.log('验证码是:', code)
            this.userinfo.copyCode = code
          }
          this.canvasChangGetcode()
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
      } else if (this.userinfo.captcha.toString() !== this.userinfo.copyCode.toString()) {
        this.$message({
          message: '验证码错误!',
          type: 'error'
        })
        this.loading = false
      } else {
        var result = this.userinfo
        delete result.copyCode
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
            } else {
              this.loading = false
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
.title-small{font-size: 1.2rem;padding-left: 23rem;padding-top: 0.5rem;}

.input{width: 20rem;}
.codeInput{width:120px;overflow: auto}
/* .input1{width: 11rem;position: relative;top: -2rem;} */
.verifyimg{display: inline-block;height: 4rem;width: 8.2rem;margin-left: 0.75rem;position: relative;top: -1rem;}
.botton{background-color: #919191;color: #fff;}
.botton:hover{color: #49a9ee;border-color: #fff;}
.justfy1{margin-right: 11rem;}
.justfy2{margin-left: 1.2rem;}
.justfy3{}
.justfy4{margin-left: -2.3rem}
/**/
.getBtn{text-decoration: none;cursor: pointer;text-align: center; overflow:auto;color: #108ee9;width: 120px;height: 36px;
display: inline-block;line-height: 36px;background-color: #e8e8e8}
.codeImgBox{display: inline-block;cursor: pointer;background-color: #eee; height:36px}
</style>
