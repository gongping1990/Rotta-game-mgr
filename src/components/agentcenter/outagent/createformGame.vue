<template>
<div class="outcreate">
    <h2 class="title">游戏基本信息</h2>
    <el-form :model="managerInfo" :rules="rules" ref="managerInfo" class="createform" label-width="150px" label-position="right">
        <el-form-item label="游戏名称" prop="gameName">
          <el-input v-model="managerInfo.gameName" class="input" placeholder="请输入"></el-input>
        </el-form-item>
          <el-form-item label="游戏简介" prop="gameRecommend">
            <el-input v-model="managerInfo.gameRecommend" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属分类" prop="gameType">
            <el-select v-model="managerInfo.gameType" placeholder="请选择" clearable class="input">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属运营商" prop="company">
            <el-select v-model="managerInfo.company" placeholder="请选择" clearable class="input">
              <el-option v-for="item in companyOptions" :key="item.companyName" :label="item.companyName" :value="item.companyName"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="游戏LOGO" prop="rate">-->
            <!--<el-upload-->
              <!--class="img-upload"-->
              <!--action="https://jsonplaceholder.typicode.com/posts/"-->
              <!--list-type="picture-card"-->
              <!--:on-preview="handlePictureCardPreview"-->
              <!--:on-remove="handleRemove">-->
              <!--<i class="el-icon-plus"></i>-->
            <!--</el-upload>-->
            <!--<el-dialog v-model="dialogVisible" size="tiny">-->
              <!--<img width="100%" :src="dialogImageUrl" alt="">-->
            <!--</el-dialog>-->
          <!--</el-form-item>-->
          <el-form-item label="服务器">
            <el-input v-model="managerInfo.ip" class="input" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="端口">
            <el-input v-model="managerInfo.port" class="input" placeholder="请输入"></el-input>
          </el-form-item>
    </el-form>
  <div class="stepbtn">
    <el-button type="primary" class="nextBtn" @click="postCreateform">下一步</el-button>
    <el-button @click="resetData">重置</el-button>
  </div>
</div>

</template>

<script type="text/ecmascript-6">
import { invoke } from '@/libs/fetchLib'

export default {
  name: 'createform',
  beforeCreate () {
    localStorage.removeItem('userID')
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'addGame'
    }) // 定位到创建代理商页
//    this.$store.commit('resetCreateout')
//    this.$store.dispatch('getParent')
  },
  data () {
    var validateGameName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入游戏名称'))
      } else {
        callback()
        this.isfinish.gameName = true
        console.log(this.isfinish, 1)
      }
    } // 游戏名称
    var validateGameType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择游戏类别'))
      } else {
        callback()
        this.isfinish.gameType = true
        console.log(this.isfinish, 2)
      }
    } // 分类
    var validateCompany = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择所属运营商'))
      } else {
        callback()
        this.isfinish.company = true
        console.log(this.isfinish, 3)
      }
    } // 运营商
    var validateGameRecommend = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入游戏简介'))
      } else {
        callback()
        this.isfinish.gameRecommend = true
        console.log(this.isfinish, 4)
      }
    } // 游戏简介
    var validateIp = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入服务器'))
      } else {
        callback()
        this.isfinish.ip = true
        console.log(this.isfinish, 5)
      }
    } // 服务器
    var validatePort = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入端口'))
      } else {
        callback()
        this.isfinish.port = true
        console.log(this.isfinish, 6)
      }
    } // 端口
    return {
      isfinish: {
        gameName: false,
        gameType: false,
        company: false,
        port: false,
        ip: false,
        gameRecommend: false
      },
      managerInfo: {
        gameName: '', // 名称
        gameType: '', // 类别
        company: '', // 运营商
        port: '', // 端口
        ip: '', // 服务器
        gameRecommend: '', // 简介
        gameImg: ''
      }, // 创建列表
      rules: {
        gameName: [
          {validator: validateGameName, trigger: 'blur'}
        ],
        gameRecommend: [
          {validator: validateGameRecommend, trigger: 'blur'}
        ],
        gameType: [
          {validator: validateGameType, trigger: 'blur'}
        ],
        company: [
          {validator: validateCompany, trigger: 'blur'}
        ],
        port: [
          {validator: validatePort, trigger: 'blur'}
        ],
        ip: [
          {validator: validateIp, trigger: 'blur'}
        ]
      }, // 列表验证规则
      options: [
        {
          label: '棋牌游戏',
          value: '0'
        }, {
          label: '电子游戏',
          value: '1'
        }, {
          label: '真人视讯',
          value: '2'
        }
      ]
    }
  },
  computed: {
    companyOptions () {
      return this.$store.state.operatorList
    }
  },
  methods: {
    postCreateform () {
      if (!this.managerInfo.gameName || !this.managerInfo.gameType || !this.managerInfo.company ||
        !this.managerInfo.port || !this.managerInfo.ip || !this.managerInfo.gameRecommend) {
        !this.$message({
          message: '请完善创建信息',
          type: 'error'
        })
      } else {
        invoke({
          url: this.$store.state.isapi.addGame.url,
          method: this.$store.state.isapi.addGame.method,
          data: this.managerInfo
        }).then((data) => {
          let [err, res] = data
          if (err) {
          } else if (res) {
            this.$store.commit({
              type: 'getSuccessGame',
              data: res.data.payload
            })
            this.$store.dispatch('getchangeoutActive')
          }
        })
      }
    },
    resetData () {
      this.managerInfo = {
        gameName: '', // 名称
        gameType: '', // 类别
        company: '', // 运营商
        port: '', // 端口
        ip: '', // 服务器
        gameRecommend: '', // 简介
        gameImg: '' // 图片上传 （暂不实现）
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*创建代理商列表*/
.outcreate{margin-bottom: 10rem}
.createform{width:45.5rem;margin: 0 auto;}
.input{width: 28rem;}
.title{font-weight: normal;color: #5a5a5a;margin: 1rem 0 2rem 0;text-align: center;margin-left: -30rem}
.stepbtn{text-align: center;margin-left: 7rem}
.nextBtn{margin-right: 13.2rem}
  .img-upload .el-upload-list--picture-card{width: 20px}
</style>
