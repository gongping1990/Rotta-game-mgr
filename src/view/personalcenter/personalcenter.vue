<template>
  <div class="personalcenter">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>个人中心 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">个人详细信息</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manangeinfo">
        <h4>管理信息</h4>
        <div class="manangeform">
            <p>
              <span>管理员账号: {{adminInfo.username}}</span>
              <span>管理员姓名: {{adminInfo.adminName}}</span>
              <span>管理员密码: {{adminInfo.password}}</span>
            </p>
            <p>
              <span>管理员Eamil: {{adminInfo.adminEmail}}</span>
              <span>管理员联系方式: {{adminInfo.adminContact}}</span>
            </p>
            <p>
              <span>上次登录时间: {{formatTime(adminInfo.loginAt)}}</span>
              <span>上次登陆IP: {{adminInfo.lastIP}}</span>
            </p>
        </div>
    </div>
    <div class="manager-copertion">
        <h4>平台管理员点数操作记录</h4>
        <div class="copertion-form">
            <div class="form-header">
                <span class="points">当前管理员剩余点数: 123456789</span>
                <div class="right">
                  <el-input placeholder="请输入搜索条件" class="input"></el-input><el-button type="primary" class="myBtn">搜索</el-button>
                </div>
            </div>
            <div class="propertyform-form">
                <el-table style="width: 98%; font-size: 12px;" border max-height='10px'>
                    <el-table-column label="序号" header-align="center" min-width="60"></el-table-column>
                    <el-table-column label="流水号" header-align="center" width=""></el-table-column>
                    <el-table-column label="账户余额" header-align="center" width=""></el-table-column>
                    <el-table-column label="交易点数" header-align="center" width=""></el-table-column>
                    <el-table-column label="交易时间" header-align="center" width=""></el-table-column>
                    <el-table-column label="交易对象" header-align="center" width=""></el-table-column>
                    <el-table-column label="交易类型" header-align="center" width=""></el-table-column>
                    <el-table-column label="交易详情(原账+当前操作额=现在余额)" min-width="200" header-align="center"></el-table-column>
                    <el-table-column label="操作人" header-align="center" width=""></el-table-column>
                    <el-table-column label="备注" min-width="120" header-align="center"></el-table-column>
                </el-table>
            </div>
            <div class="page">
              <el-pagination layout="prev, pager, next, sizes, jumper" :total="50" :page-size="5"></el-pagination>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import dateformat from 'dateformat'
export default {
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'personalcenter'
    })
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.dispatch('getAdmincenter')
  },
  computed: {
    adminInfo () {
      return this.$store.state.adminInfo
    }
  },
  methods: {
    formatTime (time) {
      time = dateformat(time, 'isoDateTime')
      time = time.split('T')
      var a = time[0]
      var b = time[1]
      b = b.slice(0, 8)
      return a + ' ' + b
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manangeinfo,
.manager-copertion{width: 98%;margin: 0 auto;vertical-align: baseline;}
.manangeform{background-color: #f5f5f5;padding-left: 3%;margin-bottom: 10rem}

.copertion-form{background-color: #f5f5f5;padding-left: 1.5%}
.form-header{padding: 1rem 0}

.manangeform span{display: inline-block;width: 25%;padding: 2rem 1.5rem 1.5rem 2rem;}
h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
.right{float: right;margin-bottom: 1rem;padding-right: 2.6rem}
.points{vertical-align: -0.75rem}
.input{width: 20rem;margin-right: 0.4rem;}
.myBtn{}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
/*分页器*/
.page {padding-bottom: 2rem;text-align: right;margin-right: 2%;margin-top: 0.5rem}
</style>
