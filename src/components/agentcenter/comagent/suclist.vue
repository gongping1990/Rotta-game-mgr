<template>
  <div class="suclist print">
    <div class="list-title">
      <p class="title">商户 : {{suclist.displayName}}<span class="justfy5">所属代理商 : {{sucInfo.parentName.split("_").join(' ')}}</span></p>
      <p><span>商户号 : {{sucInfo.displayId}}</span><span class="justfy1">商户标识 : {{suclist.suffix}}</span><span class="justfy2">线路号 : {{suclist.msn}}</span><span>代理商Email : {{suclist.merchantEmail}}</span></p>
      <p><span class="justfy2">负责人 : {{suclist.hostName}}</span><span>负责人联系方式 : {{suclist.hostContact}}</span></p>
      <p>代理商备注 : {{suclist.remark}}</p>
    </div>
    <div class="list-form">
      <p>商户密匙 : {{sucInfo.apiKey}}</p>
      <p><span>商户初始点数 : {{suclist.points}}</span><span class="justfy3">代理抽成比 : {{suclist.rate}}%</span></p>
      <p>代理游戏 : {{suclist.gameList.join(' ')}}</p>
      <p>白名单 : {{suclist.loginWhiteList}}</p>
      <p>商户域名 : {{suclist.frontURL}}</p>
    </div>
    <div class="list-form">
      <p>后台地址 : http://123456789.com</p>
      <p><span>管理员账号 : {{suclist.username}}</span><span class="justfy4">管理员密码 : {{suclist.password}}</span></p>
      <p><span>管理员姓名 : {{suclist.adminName}}</span><span class="justfy4">管理员联系方式 : {{suclist.adminContact}}</span></p>
      <p>管理员Email : {{suclist.adminEmail}}</p>
    </div>
    <div class="list-bottom">
      <p>生效时间 : {{formTime(suclist.contractPeriod)}}</p>
    </div>
  </div>
</template>
<script>
import dateformat from 'dateformat'
export default {
  name: 'suclist',
  computed: {
    sucInfo () {
      return this.$store.state.sucComregist
    },
    suclist () {
      return this.$store.state.createMerchant
    }
  },
  methods: {
    formTime () {
      var start = this.suclist.contractPeriod[0]
      var end = this.suclist.contractPeriod[1]
      start = dateformat(start, 'isoDate')
      end = dateformat(end, 'isoDate')
      return start + ' 至 ' + end
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.suclist{background-color: #f5f5f5;width: 60%;margin-left:17%;text-align: left;padding: 2rem;}
.list-title{margin-bottom: 2rem;}
.list-title p{line-height: 3.5rem;font-size: 1.1rem;color: #5a5a5a;}
.list-title .title{font-size: 1.3rem;font-weight: bold;color: #5a5a5a}

.list-form{border: 1px dashed #222222;padding: 1rem 2rem;margin: 2rem 0;}
.list-form p{line-height: 3rem;font-size: 1rem;color: #5a5a5a;}
.list-bottom{text-align: right;}
.list-bottom p{margin: 1rem;padding-top: 1rem;color: #5a5a5a;}

.justfy1{margin: 0 2rem 0 3rem;}
.justfy2{margin-right: 4rem;}
.justfy3{margin: 0 9rem 0 10rem;}
.justfy4{margin-left: 14rem;}
.justfy5{margin-left: 2.8rem}

/**/
@media print {
  .Noprint { display: none }
  .print{margin-left: -1rem;margin-top: 15rem;width: 57%;overflow: hidden;word-break:break-all;}
  .print p{font-size: 1.4rem;line-height: 5rem;}
  .print-justfy1{width: 40%}
  .print-ex span{width: 40%}
  .print-title{font-size: 1.8rem}
  .print-justfy{margin-top: -5.1rem;margin-left: 8rem}
  html,body{font-size: 16px}
  .PageNext{ page-break-after: always }
}
</style>
