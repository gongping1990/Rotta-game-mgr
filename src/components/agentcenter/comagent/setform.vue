<template>
<div>
  <div class="setform">
    <h2 class="title">配置代理信息</h2>
    <el-form :model="setCominfo" :rules="rules" ref="setCominfo" class="setform" label-width="160px" label-position="right">
      <el-form-item label="商户初始点数" prop="points">
        <el-input v-model="setCominfo.points" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商户线路号" prop="msn">
        <el-input v-model="setCominfo.msn" class="input" placeholder="请输入" @change="formatMSN"></el-input>
        <el-button type="text" @click="randomMSN">随机分配</el-button>
      </el-form-item>
      <el-form-item label="商户拥有的游戏">
        <el-select v-model="setCominfo.gameList" multiple placeholder="请选择" clearable class="input">
            <el-option v-for="item in options" :key="item.gameId" :label="item.gameName" :value="item.gameName"></el-option>
        </el-select>
        <el-button type="text" class="">添加</el-button>
      </el-form-item>
      <el-form-item label="商户白名单" prop="loginWhiteList">
          <el-input v-model="setCominfo.loginWhiteList" placeholder="请输入IP地址或IP范围,一行一个规则" type="textarea" :rows="5" class="input"></el-input>
      </el-form-item>
      <el-form-item label="商户前端域名" prop="frontURL">
        <el-input v-model="setCominfo.frontURL" class="input" placeholder="请输入"></el-input>
        <el-button type="text" class="">验证</el-button>
      </el-form-item>
      <h2 class="title">配置商户后台管理员</h2>
      <el-form-item label="代理商管理员用户名" prop="username">
        <el-input v-model="setCominfo.username" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员密码" prop="password">
        <el-input v-model="setCominfo.password" class="input" placeholder="请输入"></el-input>
        <el-button type="text" @click="randomPassword">生成</el-button>
      </el-form-item>
      <el-form-item label="代理商管理员真实姓名" prop="adminName">
        <el-input v-model="setCominfo.adminName" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员邮箱" prop="adminEmail">
        <el-input v-model="setCominfo.adminEmail" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员联系方式" prop="adminContact">
        <el-input v-model="setCominfo.adminContact" class="input" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div class="stepbtn">
    <el-button type="primary" class="nextBtn" @click="postCreateform" :loading="loading">下一步</el-button>
    <el-button @click="resetData">重置</el-button>
  </div>
</div>
  
</template>

<script>
import {invoke} from '@/libs/fetchLib'
export default {
  name: 'setform',
  beforeCreate () {
    this.$store.dispatch('getGamelist') // 获取游戏列表
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    // console.log(localStorage)
  },
  computed: {
    options () {
      return this.$store.state.gamelist
    },
    randomNew () {
      return this.$store.state.randomPassword
    }
  },
  data () {
    var validatePoints = (rule, value, callback) => {
      var num = new RegExp(/^[0-9]*$/)
      if (value === '') {
        callback(new Error('请输入初始代理点数'))
      } else if (!num.test(value)) {
        callback(new Error('请输入正确的初始代理点数'))
      } else if (value < 0 || value > 100000000) {
        callback(new Error('代理点数应为0~100000000之间的数字'))
      } else {
        callback()
        this.isfinish.points = true
        // console.log(this.isfinish)
      }
    } // 检测初始代理点数
    var validateMsn = (rule, value, callback) => {
      var num = new RegExp(/^[0-9]*$/)
      if (value === '') {
        callback(new Error('请输入商户线路号'))
      } else if (!num.test(value)) {
        callback(new Error('请输入正确的商户线路号'))
      } else if (value < 1 || value > 999) {
        callback(new Error('商户线路号应为1~999之间的数字'))
      } else {
        value = Number(value)
        var reback = ''
        invoke({
          url: this.$store.state.checkMSN.url + value,
          method: this.$store.state.checkMSN.method
        }).then(
          result => {
            const [err, ret] = result
            if (err) {
            } else {
              var avalible = ret.data.payload.avalible
              reback = avalible
              console.log('avalible', avalible)
              console.log('reback', reback)
            }
            if (reback === false) {
              callback(new Error('商户线路号已存在'))
            } else {
              callback()
              this.isfinish.msn = true
            }
          }
        )
      }
    } // 检测代理可放商户名额
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代理商管理员用户名'))
      } else if (value.length > 16) {
        callback(new Error('用户名长度不能大于16'))
      } else if (value.length < 6) {
        callback(new Error('用户名长度不能少于6'))
      } else {
        callback()
        this.isfinish.username = true
        // console.log(this.isfinish)
      }
    } // 检测代理商管理员用户名
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代理商管理员密码'))
      } else {
        callback()
        this.isfinish.password = true
        // console.log(this.isfinish)
      }
    } // 检测代理商管理员密码
    var validateAdminName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入代理商管理员姓名'))
      } else {
        callback()
        this.isfinish.adminName = true
        // console.log(this.isfinish)
      }
    } // 检测代理商管理员真实姓名
    var validateEmail = (rule, value, callback) => {
      var email = new RegExp(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/)
      if (value === '') {
        callback(new Error('请输入代理商管理员邮箱'))
      } else if (!email.exec(value)) {
        callback(new Error('请输入正确的代理商管理员邮箱'))
      } else {
        callback()
        this.isfinish.adminEmail = true
        // console.log(this.isfinish)
      }
    } // 检测代理商管理员邮箱
    var validateAdminContact = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入负责人联系方式'))
      } else {
        callback()
        this.isfinish.adminContact = true
        // console.log(this.isfinish)
      }
    } // 检测代理商管理员联系方式
    var validateFrontURL = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商户前端域名'))
      } else {
        callback()
        this.isfinish.frontURL = true
        // console.log(this.isfinish)
      }
    } // 检测商户前端域名
    return {
      loading: false,
      isfinish: {
        points: false,
        msn: false,
        gameList: false,
        loginWhiteList: false,
        frontURL: false,
        username: false,
        password: false,
        adminName: false,
        adminEmail: false,
        adminContact: false
      }, // 检测数据是否填写完毕
      setCominfo: {
        points: '', // 初始代理点数
        msn: '', // 线路号
        gameList: [], // 拥有游戏
        loginWhiteList: '', // 商户白名单
        frontURL: '', // 商户前端域名
        username: '', // 代理商管理员用户名
        password: '', // 代理商管理员密码
        adminName: '', // 代理商管理员姓名
        adminEmail: '', // 代理商管邮箱
        adminContact: '' // 代理商管理员联系方式
      },
      rules: {
        points: [
          {validator: validatePoints, trigger: 'blur'}
        ],
        msn: [
          {validator: validateMsn, trigger: 'change'}
        ],
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'change'}
        ],
        adminEmail: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        adminContact: [
          {validator: validateAdminContact, trigger: 'blur'}
        ],
        adminName: [
          {validator: validateAdminName, trigger: 'blur'}
        ],
        frontURL: [
          {validator: validateFrontURL, trigger: 'blur'}
        ]
      } // 验证规则
    }
  },
  methods: {
    randomMSN () {
      this.$store.dispatch('randomMSN')
      if (this.$store.state.randomMsn < 10) {
        this.setCominfo.msn = '00' + this.$store.state.randomMsn.toString()
      } else if (this.$store.state.randomMsn >= 10 && this.$store.state.randomMsn < 100) {
        this.setCominfo.msn = '0' + this.$store.state.randomMsn
      } else {
        this.setCominfo.msn = this.$store.state.randomMsn
      }
    }, // 随机生成线路号
    randomPassword () {
      this.$store.dispatch('randomPassword')
      this.setCominfo.password = this.$store.state.randomPassword
    }, // 生成密码
    postCreateform () {
      this.loading = true
      if (this.setCominfo.gameList.length !== 0) {
        this.isfinish.gameList = true
      }
      if (this.isfinish.points === false || this.isfinish.msn === false || this.isfinish.gameList === false || this.isfinish.username === false && this.isfinish.password === false || this.isfinish.adminEmail === false || this.isfinish.adminContact === false || this.isfinish.adminName === false || this.isfinish.frontURL === false) {
        this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
        this.loading = false
      } else {
        this.$store.commit({
          type: 'recordCreatecom',
          data: this.setCominfo
        })
        var result = this.$store.state.createMerchant
        if (result.parent === '') {
          delete result.parent
        }
        result.msn = Number(result.msn)
        invoke({
          url: this.$store.state.createUser.url,
          method: this.$store.state.createUser.method,
          data: result
        }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$router.push('createerror') // 异常页面
          } else {
            var ComRegist = ret.data.payload
            console.log('一般线路商', ComRegist)
            this.$store.commit({
              type: 'getComsucRegist',
              data: ComRegist
            })
          }
          this.loading = true
          this.$store.dispatch('getchangecomActive')
        })
      }
    },
    resetData () {
      this.setCominfo = {
        points: '', // 初始代理点数
        msn: '', // 线路号
        gameList: [], // 拥有游戏
        loginWhiteList: '', // 商户白名单
        frontURL: '', // 商户前端域名
        username: '', // 代理商管理员用户名
        password: '', // 代理商管理员密码
        adminName: '', // 代理商管理员姓名
        adminEmail: '', // 代理商管邮箱
        adminContact: '' // 代理商管理员联系方式
      }
    },
    formatMSN () {
      this.setCominfo.msn = ((parseFloat(this.setCominfo.msn) * 0.001).toFixed(3) + '').substring(2)
    } // 格式化MSN
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setform{width:52rem;margin: 0 auto;}
.input{width: 28rem;}
.title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -40rem}
.stepbtn{text-align: center}
.nextBtn{margin-right: 13.2rem}
/* .setform{text-align: center;padding-top: 2rem;margin-left: -6.5rem;}
p{padding-top: 1.5rem;}
span{padding-right: 1rem;}
.setadmin{padding-top: 2rem;}
.setinfo .title{padding-left: 4rem;}
.title{margin-left: -35rem;font-weight: normal;}
.input{width: 28rem;}
.justfy1{margin-left: 1rem;}
.justfy2{margin-left: 2.4rem;}
.justfy3{margin-left: 1rem;}
.justfy4{margin-left: -2.2rem;}
.justfy5{margin-left: 1.3rem;}
.justfy6{margin-left: -4.1rem;}
.justfy7{margin-left: -2rem;}
.justfy8{margin-left: -4rem;}
.justfy9{position: relative;top: -6.5rem;margin-left: 1rem}
.justfy10{margin-left: 3.35rem}

.stepbtn{margin:2rem 0 4rem 0;text-align: center}
.justfy{margin-right: 15rem;} */
</style>
