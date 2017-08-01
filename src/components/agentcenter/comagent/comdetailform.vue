<template>
<div class="comdetailform">
    <div v-if="isedit === false">
        <div class="simpleinfo">
            <h4>基本信息  
                <span class="justfy3">所属代理商: <span class="justfy4">{{comdetail.parentName}}</span></span>
            </h4>
            <div class="simpleform">
                <p class="adjust1">
                    <span>商户号: {{comdetail.displayId}}</span>
                    <span>线路号: {{comdetail.msn}}</span>
                    <span>商户标示: {{comdetail.suffix}}</span>
                    <span>负责人: {{comdetail.hostName}}</span>
                    <span>负责人联系方式: {{comdetail.hostContact}}</span>
                </p>
                <p class="adjust2">
                    <span class="more1">商户抽成比: {{comdetail.rate}}</span>
                    <span class="more2">商户密匙: {{comdetail.apiKey}}</span>
                    <span class="more3">代理游戏: {{comdetail.gameList}}</span>
                    <span class="more4">代理商Email: {{comdetail.merchantEmail}}</span>
                </p>
                <p>商户白名单: {{comdetail.loginWhiteList}}</p>
                <p>商户前端域名: {{comdetail.frontURL}}</p>
                <p class="adjust3">
                    <span>代理创建时间: {{formatTime(comdetail.createdAt)}}</span>
                    <span>商户最后登陆时间: {{formatTime(comdetail.loginAt)}}</span>
                </p>
                <p>商户备注: {{comdetail.remark}}</p>
            </div>
        </div>
        <div class="manangeinfo">
            <h4>管理信息</h4>
            <div class="manangeform">
                <p>
                    <span>管理员账号: {{comdetail.username}}</span>
                    <span>管理员姓名: {{comdetail.adminName}}</span>
                    <span>管理员密码: {{comdetail.password}}<el-button type="text" class="createbtn">生成</el-button></span>
                </p>
                <p>
                    <span>管理员Eamil: {{comdetail.adminEmail}}</span>
                    <span>管理员联系方式: {{comdetail.adminContact}}</span>
                </p>
                <p>
                    <span>生效时间: {{comdetail.contractPeriod}}</span>
                    <span>上次登录时间: {{formatTime(comdetail.loginAt)}}</span>
                    <span>上次登陆IP: {{comdetail.lastIP}}</span>
                </p>
            </div>
        </div>
    </div>
    <div v-if="isedit === true">
        <div class="simpleinfo">
            <h4>基本信息  
                <span class="justfy3">所属代理商: <span class="justfy4">{{comdetail.parentName}}</span></span>
            </h4>
            <div class="simpleform">
                <p class="adjust1">
                    <span>商户号: {{comdetail.displayId}}</span>
                    <span>线路号: {{comdetail.msn}}</span>
                    <span>商户标示: {{comdetail.suffix}}</span>
                    <span>负责人: <el-input v-model="comdetail.hostName" :disabled="disabled" class="input1" icon="edit" :on-icon-click="edit"></el-input></span>
                    <span>负责人联系方式: <el-input v-model="comdetail.hostContact" :disabled="disabled" class="input2" icon="edit" :on-icon-click="edit"></el-input></span>
                </p>
                <p class="adjust2">
                    <span class="more1">商户抽成比: <el-input v-model="comdetail.rate" :disabled="disabled" class="input3" icon="edit" :on-icon-click="edit"></el-input></span>
                    <span class="more2">商户密匙: {{comdetail.apiKey}}</span>
                    <span class="more3">代理游戏: 
                        <el-select v-model="comdetail.gameList" placeholder="请选择" clearable multiple :disabled="disabled" class="input4">
                            <el-option v-for="item in options" :key="item.gameId" :label="item.gameName" :value="item.gameName"></el-option>
                        </el-select><i class="el-icon-edit" @click="edit"></i>
                    </span>
                    <span class="more4">代理商Email: <el-input v-model="comdetail.merchantEmail" :disabled="disabled" class="input5" icon="edit" :on-icon-click="edit"></el-input></span>
                </p>
                <p>商户白名单: <el-input v-model="comdetail.loginWhiteList" :disabled="disabled" class="input6" icon="edit" :on-icon-click="edit"></el-input></p>
                <p>商户前端域名: <el-input v-model="comdetail.frontURL" :disabled="disabled" class="input7" icon="edit" :on-icon-click="edit"></el-input></p>
                <p class="adjust3">
                    <span>代理创建时间: {{formatTime(comdetail.createdAt)}}</span>
                    <span>商户最后登陆时间: {{formatTime(comdetail.loginAt)}}</span>
                </p>
                <p>商户备注: <el-input v-model="comdetail.remark" :disabled="disabled" class="input8" icon="edit" :on-icon-click="edit"></el-input></p>
            </div>
        </div>
        <div class="manangeinfo">
            <h4>管理信息</h4>
            <div class="manangeform">
                <p>
                    <span>管理员账号: {{comdetail.username}}</span>
                    <span>管理员姓名: <el-input v-model="comdetail.adminName" :disabled="disabled" class="input9" icon="edit" :on-icon-click="edit"></el-input></span>
                    <span>管理员密码: {{comdetail.password}}<el-button type="text" class="createbtn">生成</el-button></span>
                </p>
                <p>
                    <span>管理员Eamil: <el-input v-model="comdetail.adminEmail" :disabled="disabled" class="input10" icon="edit" :on-icon-click="edit"></el-input></span>
                    <span>管理员联系方式: <el-input v-model="comdetail.adminContact" :disabled="disabled" class="input11" icon="edit" :on-icon-click="edit"></el-input></span>
                </p>
                <p>
                    <span>生效时间: 
                        <el-date-picker v-model="comdetail.contractPeriod" :disabled="disabled" type="daterange" :editable='false' placeholder="选择生效时间" class="input" label="生效时间"></el-date-picker>
                        <el-checkbox v-model="comdetail.contractPeriod" :disabled="disabled" class="isforever">永久</el-checkbox>
                        <i class="el-icon-edit" @click="edit"></i>
                    </span>
                    <span>上次登录时间: {{formatTime(comdetail.loginAt)}}</span>
                    <span>上次登陆IP: {{comdetail.lastIP}}</span>
                </p>
                <div class="suc">
                    <el-button type="primary" @click="disableInput" v-if="showBtn === true" :loading="loading">提交修改</el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="propertyinfo">
        <h4>财务信息</h4>
        <div class="propertyform">
            <div class="propertyform-header">
                <span class="justfy1">当前剩余点数: {{propertyinfo}}</span>
                <el-button type="text" class="propertybtn justfy2">刷新</el-button>
                <el-button type="text" class="propertybtn" @click="storePoints">存点</el-button>
                <el-button type="text" class="propertybtn" @click="putOutPoints">提取</el-button>
            </div>
            <div class="propertyform-form">
                <el-table style="width: 98%; font-size: 12px;" :data="waterFall" border max-height='10px'>
                    <el-table-column label="序号" prop="" type="index" align="center" width="80"></el-table-column>
                    <el-table-column label="账户余额" prop="balance" align="center" width=""></el-table-column>
                    <el-table-column label="交易点数" prop="amount" align="center" width=""></el-table-column>
                    <el-table-column label="交易时间" prop="updatedAt" align="center" width="" :formatter="Time"></el-table-column>
                    <el-table-column label="交易类型" prop="action" align="center" width="" :formatter="billType"></el-table-column>
                    <el-table-column label="交易详情(原账+当前操作额=现在余额)" min-width="200" align="center" prop="balance" :formatter="billinfo"></el-table-column>
                    <el-table-column label="操作人" prop="operator" align="center" width=""></el-table-column>
                    <el-table-column label="备注" prop="remark" min-width="120" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="page">
              <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.waterfall.length" :page-sizes="[5, 10]" :page-size="waterfallSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
            </div>
        </div>
    </div>
    <!-- 存点对话框 -->
    <el-dialog title="存点操作" :visible.sync="storePointsForm" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div v-if="isfinish === false">
            <el-form>
                <p class="dialogTitle" v-if="deposit.fromUserId === undefined || deposit.fromUserId === null || deposit.fromUserId === ''">
                  <i class="el-icon-warning"></i>
                  <span>管理员<span v-text="this.$store.state.backloginfo.username"></span>为代理商{{outdetail.displayName}}</span>
                  <span class="green">添加</span>
                </p>
                <p class="dialogTitle" v-else>
                  <i class="el-icon-warning"></i>
                  <span>线路商{{outdetail.parentName}}为代理商{{outdetail.displayName}}</span>
                  <span class="green">添加</span>
                </p>
                <el-form-item label="存入点数" :label-width="formLabelWidth" prop="points">
                    <el-input placeholder="请输入点数" class="dialogInput" v-model="deposit.amount"></el-input>
                </el-form-item>
                <el-form-item label="选择起始账户" :label-width="formLabelWidth" prop="">
                    <el-select v-model="deposit.fromUserId" placeholder="请选择">
                      <el-option value="" :label="this.$store.state.backloginfo.username"></el-option>
                      <el-option :value="outdetail.parent" :label="outdetail.parentName" v-if="outdetail.parent !== '01'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input placeholder="注明存点备注,如没有可不填" type="textarea" :rows="6" class="dialogInput" v-model="deposit.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel" class="distance">取 消</el-button>
                <el-button type="primary" @click="postStorePoints">继 续</el-button>
            </div>
        </div>
        <div v-if="isfinish === true" class="suc">
            <p><i class="el-icon-circle-check"></i><span class="suctext">添加成功</span></p>
            <p>{{outdetail.displayName}} <span class="sucnumber"> {{parseInt(propertyinfo) - parseInt(deposit.amount)}} </span>=><span class="sucnumber"> {{propertyinfo}} </span></p>
            <div>
                <el-button type="primary" @click="cancel" class="sucBtn">确 定</el-button>
            </div>
        </div>
    </el-dialog>
    <!-- 提点对话框 -->
    <el-dialog title="提点操作" :visible.sync="putOutPointsForm" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <div v-if="isfinish === false">
            <el-form>
                <p class="dialogTitle" v-if="withdraw.fromUserId === undefined || withdraw.fromUserId === null || withdraw.fromUserId === ''">
                  <i class="el-icon-warning"></i>
                  <span>管理员<span v-text="this.$store.state.backloginfo.username"></span>为代理商{{outdetail.displayName}}</span>
                  <span class="green">提取</span>
                </p>
                <p class="dialogTitle" v-else>
                  <i class="el-icon-warning"></i>
                  <span>线路商{{outdetail.parentName}}为代理商{{outdetail.displayName}}</span>
                  <span class="green">提取</span>
                </p>
                <el-form-item label="提出点数" :label-width="formLabelWidth" prop="points">
                    <el-input placeholder="请输入点数" class="dialogInput" v-model="withdraw.amount"></el-input>
                </el-form-item>
                <el-form-item label="选择起始账户" :label-width="formLabelWidth" prop="">
                    <el-select v-model="withdraw.fromUserId" placeholder="请选择">
                      <el-option value="" :label="this.$store.state.backloginfo.username"></el-option>
                      <el-option :value="outdetail.parent" :label="outdetail.parentName" v-if="outdetail.parent !== '01'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input placeholder="注明存点备注,如没有可不填" type="textarea" :rows="6" class="dialogInput" v-model="withdraw.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel" class="distance">取 消</el-button>
                <el-button type="primary" @click="postPutOutPoints">继 续</el-button>
            </div>
        </div>
        <div v-if="isfinish === true" class="suc">
            <p><i class="el-icon-circle-check"></i><span class="suctext">提取成功</span></p>
            <p>{{outdetail.displayName}} <span class="sucnumber"> {{parseInt(propertyinfo) + parseInt(withdraw.amount)}} </span>=><span class="sucnumber"> {{propertyinfo}} </span></p>
            <div>
                <el-button type="primary" @click="cancel" class="sucBtn">确 定</el-button>
            </div>
        </div>
    </el-dialog>
</div>

</template>

<script>
import { invoke } from '@/libs/fetchLib'
import dateformat from 'dateformat'
export default {
  name: 'comdetailform',
  beforeCreate () {
    // console.log(localStorage)
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.commit('resetSearchID')
    this.$store.commit('startLoading')
  },
  created () {
    this.$store.dispatch('getGamelist')
    this.$store.dispatch('getDetailcom')
    this.$store.dispatch('getProperty')
    this.$store.dispatch('getWaterfall')
  },
  data () {
    // var validatePoints = (rule, value, callback) => {
    //   var num = new RegExp(/^[0-9]*$/)
    //   if (value === '') {
    //     callback(new Error('请输入点数'))
    //   } else if (!num.test(value)) {
    //     callback(new Error('请输入正确的点数'))
    //   } else {
    //     callback()
    //   }
    // } // 验证操作点数
    return {
      waterfallSize: 5, // 财务详情流水分页
      waterfallPage: 1, // 财务详情流水页面
      deposit: {
        fromUserId: '', // 存点操作起始账户ID
        toRole: '', // 存点操作的商户角色类别
        toUser: '', // 存点操作的商户ID
        amount: '', // 存点操作的点数
        remark: '' // 存点操作备注
      }, // 存点操作
      withdraw: {
        fromUserId: '', // 提点操作起始账户ID
        toRole: '', // 提点操作的商户角色类别
        toUser: '', // 提点操作的商户ID
        amount: '', // 提点操作的点数
        remark: '' // 提点操作备注
      }, // 提点操作
      isfinish: false, // 是否完成操作
      disabled: true,
      formLabelWidth: '100px', // 对话框大小
      storePointsForm: false, // 存点对话框
      putOutPointsForm: false, // 提点对话框
      showBtn: false,
      loading: false
    }
  },
  computed: {
    comdetail () {
      return this.$store.state.comdetail
    },
    isedit () {
      return this.$store.state.isEdit
    },
    options () {
      return this.$store.state.gamelist
    },
    propertyinfo () {
      return this.$store.state.property
    },
    waterFall () {
      // var arr = []
      // for (var i = 0; i < this.$store.state.waterfall.length; i++) {
      //   arr = this.$store.state.waterfall[i].updatedAt
      //   // arr.sort(function (a, b) {
      //   //   return a - b
      //   // })
      //   console.log(arr)
      // }
      var waterfall = this.$store.state.waterfall
      if (this.waterfallPage === 1) {
        return waterfall.slice(0, this.waterfallSize)
      } else {
        return waterfall.slice(((this.waterfallPage - 1) * this.waterfallSize), this.waterfallSize * this.waterfallPage)
      }
    }
  },
  methods: {
    billinfo (row, col) {
      var x = row.oldBalance
      var y = row.amount
      var z = row.balance
      var billinfo = ''
      if (y > 0) {
        billinfo = x + ' ' + '+' + y + '=' + ' ' + z
      } else {
        billinfo = x + ' ' + y + ' ' + '=' + ' ' + z
      }
      return billinfo
    }, // 格式化交易详情
    billType (row, col) {
      var x = row.action
      var y = row.operator
      if (x === 1) {
        x = '存点'
      } else {
        x = '提点'
      }
      var billType = y + x
      return billType
    }, // 格式化交易类型
    Time (row, col) {
      var time = row.updatedAt
      time = dateformat(time, 'isoDateTime')
      time = time.split('T')
      var a = time[0]
      var b = time[1]
      b = b.slice(0, 8)
      return a + ' ' + b
    },
    formatTime (time) {
      return dateformat(time, 'isoDate')
    }, // 格式化创建时间 //最后登录时间
    edit () {
      this.showBtn = true
      this.disabled = false
    }, // 启用搜索框
    disableInput () {
      var afterEdit = this.comdetail
      console.log('修改后的数据是', afterEdit)
      this.loading = true
      this.disabled = true
      console.log('token', this.$store.state.token)
      var userID = localStorage.userID
      console.log('修改的用户ID是', userID)
      invoke({
        url: this.$store.state.isapi.merchants.url + '/' + userID,
        method: this.$store.state.isapi.merchants.method,
        data: afterEdit
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
          } else {
            var x = ret.data.payload
            console.log(x)
            this.loading = false
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
          }
        }
      )
    }, // 禁用搜索框提交修改数据
    storePoints () {
      this.storePointsForm = true
      this.deposit.fromUserId = ''
      this.deposit.toRole = ''
      this.deposit.toUser = ''
      this.deposit.amount = ''
      this.deposit.remark = ''
    }, // 存点
    putOutPoints () {
      this.putOutPointsForm = true
      this.withdraw.fromUserId = ''
      this.withdraw.toRole = ''
      this.withdraw.toUser = ''
      this.withdraw.amount = ''
      this.withdraw.remark = ''
    }, // 提点
    refreshData () {
    }, // 刷新列表
    cancel () {
      this.storePointsForm = false
      this.putOutPointsForm = false
      this.isfinish = false
    },
    postStorePoints () {
      if (this.deposit.fromUserId === '') {
        delete this.deposit.fromUserId
      }
      if (this.$store.state.comdetail.role === '') {
        this.deposit.toRole = localStorage.comdetailRole
      } else {
        this.deposit.toRole = this.$store.state.comdetail.role
      }
      if (this.$store.state.comdetail.username === '') {
        this.deposit.toUser = localStorage.comdetailUsername
      } else {
        this.deposit.toUser = this.$store.state.comdetail.username
      }
      invoke({
        url: this.$store.state.deposit.url,
        method: this.$store.state.deposit.method,
        data: this.deposit
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$router.push('createerror')
          } else {
            var depositReback = ret.data.payload
            console.log('存点成功后返回的数据是:', depositReback)
            this.$store.dispatch('getProperty')
            this.$store.dispatch('getWaterfall')
            this.isfinish = true
          }
        }
      )
    }, // 发送存点操作
    postPutOutPoints () {
      if (this.withdraw.fromUserId === '') {
        delete this.withdraw.fromUserId
      }
      if (this.$store.state.comdetail.role === '') {
        this.withdraw.toRole = localStorage.comdetailRole
      } else {
        this.withdraw.toRole = this.$store.state.comdetail.role
      }
      if (this.$store.state.comdetail.username === '') {
        this.withdraw.toUser = localStorage.comdetailUsername
      } else {
        this.withdraw.toUser = this.$store.state.comdetail.username
      }
      invoke({
        url: this.$store.state.withdraw.url,
        method: this.$store.state.withdraw.method,
        data: this.withdraw
      }).then(
        result => {
          const [err, ret] = result
          if (err) {
            this.$router.push('createerror')
          } else {
            var withdraw = ret.data.payload
            console.log('取点成功后返回的数据是:', withdraw)
            this.$store.dispatch('getProperty')
            this.$store.dispatch('getWaterfall')
            this.isfinish = true
          }
        }
      )
    }, // 发送提点操作
    getNowsize (size) {
      this.waterfallSize = size
      console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.waterfallPage = page
      console.log('当前是第:' + page + '页')
    }
  }
}
</script>

<style scoped>
    .manangeform span{display: inline-block;width: 30%;padding: 2rem 1.5rem 1.5rem 2rem;}
    h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
    .simpleform p{padding: 2rem}

    .simpleinfo,
    .manangeinfo,
    .propertyinfo{width: 98%;margin: 0 auto;vertical-align: baseline;}

    .simpleform,
    .manangeform,
    .propertyform{background-color: #f5f5f5;padding-left: 3%;font-size: 1.1rem}

    .createbtn{height: 1rem;margin-left: 1rem}

    .propertyform-header{padding: 1rem 0;}
    .propertyform-form{padding-bottom: 2rem;}
    .justfy1{margin-left: 2rem;}
    .justfy2{margin-left: 1rem}
    .justfy3{margin-left: 0.1rem;font-size: 1.2rem;}
    .justfy4{color: #108ee9}

    .adjust1 span{display: inline-block;width: 18%}
    .adjust2 span{display: inline-block;}
    .more1{width: 18%}
    .more2{width: 36%}
    .more3{width: 18%}
    .more4{width: 18%}
    .adjust3 span{display: inline-block;width: 36%}

    /**/
    .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
     /**/
    .dialogInput{width: 80%}
    .dialogTitle{font-size: 1.4rem;position: relative;bottom: 1rem;left: 2.5rem;letter-spacing:0.15rem}
    .dialog-footer{text-align: center}
    .el-icon-warning{color: #ffce3d;margin-right: 0.2rem;font-size: 1.5rem}
    .green{color: #00a854}
    .red{color: #FF1220}
    .distance{margin-right: 20%}
    /**/
    .el-icon-circle-check{color: #00a854;font-size: 4rem}
    .el-icon-edit{color: gray;cursor: pointer;margin-left: 0.4rem}
    .suc{text-align: center;}
    .suc p{line-height: 5rem;font-size: 1.3rem}
    .suctext{font-size: 1.5rem;margin-left: 0.5rem;vertical-align: 0.75rem}
    .sucBtn{margin-top: 2rem}
    .sucnumber{color: #FF1220}
    
    /**/
    .input1{width: 8rem}
    .input2{width: 8rem}
    .input3{width: 8rem}
    .input4{width: 10rem}
    .input5{width: 8rem}
    .input6{width: 8rem}
    .input7{width: 8rem}
    .input8{width: 8rem}
    .input9{width: 8rem}
    .input10{width: 8rem}
    .input11{width: 8rem}
    .input12{width: 8rem}
    .suc{text-align: center;margin-right: 2%;}
</style>
