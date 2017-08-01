<template>
<div>
  <div class="setform">
    <h2 class="title">配置代理信息</h2>
    <el-form :model="setOutinfo" :rules="rules" ref="setOutinfo" class="setform" label-width="160px" label-position="right">
      <el-form-item label="初始代理点数" prop="points">
        <el-input v-model="setOutinfo.points" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理可放商户名额" prop="limit">
        <el-input v-model="setOutinfo.limit" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理拥有的游戏">
        <el-select v-model="setOutinfo.gameList" multiple placeholder="请选择" clearable class="input">
            <el-option v-for="item in options" :key="item.gameId" :label="item.gameName" :value="item.gameName"></el-option>
        </el-select>
        <el-button type="text" class="">添加</el-button>
      </el-form-item>
      <h2 class="title">配置代理商后台管理员</h2>
      <el-form-item label="代理商管理员用户名" prop="username">
        <el-input v-model="setOutinfo.username" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员密码" prop="password">
        <el-input v-model="setOutinfo.password" class="input" placeholder="请输入"></el-input>
        <el-button type="text" class="" @click="randomPassword">生成</el-button>
      </el-form-item>
      <el-form-item label="代理商管理员真实姓名" prop="adminName">
        <el-input v-model="setOutinfo.adminName" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员邮箱" prop="adminEmail">
        <el-input v-model="setOutinfo.adminEmail" class="input" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="代理商管理员联系方式" prop="adminContact">
        <el-input v-model="setOutinfo.adminContact" class="input" placeholder="请输入"></el-input>
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
    this.$store.dispatch('getGamelist')
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
        callback(new Error('请输入代理点数'))
      } else if (!num.test(value)) {
        callback(new Error('请输入正确的代理点数'))
      } else if (value < 0 || value > 100000000) {
        callback(new Error('代理点数应为0~100000000之间的数字'))
      } else {
        callback()
        this.isfinish.points = true
        // console.log(this.isfinish)
      }
    } // 检测初始代理点数
    var validateLimit = (rule, value, callback) => {
      var num = new RegExp(/^[0-9]*$/)
      if (value === '') {
        callback(new Error('请输入代理可放商户名额'))
      } else if (!num.test(value)) {
        callback(new Error('请输入正确的代理可放商户名额'))
      } else if (value < 0 || value > 10) {
        callback(new Error('代理可放商户名额应为0~10之间的数字'))
      } else {
        callback()
        this.isfinish.limit = true
        // console.log(this.isfinish)
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
    return {
      loading: false,
      isfinish: {
        points: false,
        limit: false,
        gameList: false,
        username: false,
        password: false,
        adminName: false,
        adminEmail: false,
        adminContact: false
      }, // 检测数据是否填写完毕
      setOutinfo: {
        points: '', // 初始代理点数
        limit: '', // 可放名额
        gameList: [], // 拥有游戏
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
        limit: [
          {validator: validateLimit, trigger: 'blur'}
        ],
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ],
        adminEmail: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        adminContact: [
          {validator: validateAdminContact, trigger: 'blur'}
        ],
        adminName: [
          {validator: validateAdminName, trigger: 'blur'}
        ]
      } // 验证规则
    }
  },
  methods: {
    randomPassword () {
      this.$store.dispatch('randomPassword')
      this.setOutinfo.password = this.randomNew
    }, // 生成密码
    postCreateform () {
      this.loading = true
      if (this.setOutinfo.gameList.length !== 0) {
        this.isfinish.gameList = true
      }
      if (this.isfinish.points === false || this.isfinish.limit === false || this.isfinish.gameList === false || this.isfinish.username === false && this.isfinish.password === false || this.isfinish.adminEmail === false || this.isfinish.adminContact === false || this.isfinish.adminName === false) {
        this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
        this.loading = false
      } else {
        this.$store.commit({
          type: 'recordCreateout',
          data: this.setOutinfo
        })
        var result = this.$store.state.createManager
        if (result.parent === '') {
          delete result.parent
        }
        invoke({
          url: this.$store.state.createUser.url,
          method: this.$store.state.createUser.method,
          data: result
        }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$router.push('createerror')
          } else {
            var OutRegist = ret.data.payload
            console.log('出口代理商', OutRegist)
            this.$store.commit({
              type: 'getOutsucRegist',
              data: OutRegist
            })
          }
          this.loading = true
          this.$store.dispatch('getchangeoutActive')
        })
      }
    },
    resetData () {
      this.setOutinfo = {
        points: '', // 初始代理点数
        limit: '', // 可放名额
        gameList: [], // 拥有游戏
        username: '', // 代理商管理员用户名
        password: '', // 代理商管理员密码
        adminName: '', // 代理商管理员姓名
        adminEmail: '', // 代理商管邮箱
        adminContact: '' // 代理商管理员联系方式
      }
    }
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
.justfy1{margin-left: -2rem;}
.justfy2{margin-left: 2.4rem;}
.justfy3{margin-left: 1rem;}
.justfy4{margin-left: -3rem;}
.justfy5{margin-left: 1.3rem;}
.justfy6{margin-left: -4rem;}
.justfy7{margin-left: -2rem;}
.justfy8{margin-left: -4rem;}

.stepbtn{margin:2rem 0 4rem 0;text-align: center}
.justfy{margin-right: 15rem;} */
</style>
