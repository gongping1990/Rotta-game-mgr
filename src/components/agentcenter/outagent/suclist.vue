<template>
  <div class="suclist print">
    <div class="list-title">
      <el-row class="list-title">
        <p class="title print-title">运营商 : {{suclist.companyName}}</p>
      </el-row>
      <el-row class="list-title">
        <el-col :span="12">
          <span class="print-justfy1">运营商ID : {{suclist.companyId}}</span>
        </el-col>
        <el-col :span="6">
          <span class="print-justfy1">联系人 : {{suclist.companyContact}}</span>
        </el-col>
        <el-col :span="6">
          <span class="print-justfy1">联系方式 : {{suclist.companyContactWay}}</span><br>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <span class=" print-justfy1">运营商Email : {{suclist.companyEmail}}</span>
        </el-col>
        <el-col :span="12">
          <span class="print-justfy1">运营商描述 : {{suclist.companyDesc == 'NULL!' ? '暂无' : suclist.companyDesc}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="list-form">
      <el-row>
        <p class="print-justfy1">合作区域 : {{regionList[suclist.companyRegion-1]}}</p>
        <p class="print-justfy1"><span>KEY : {{suclist.companyKey}}</span></p>
        <p class="print-justfy1"><span>合同备注 : {{suclist.remark == 'NULL!' ? '暂无' : suclist.remark}}</span></p>
      </el-row>
    </div>

    <div class="list-bottom">
      <p>创建时间 : {{formTime(suclist.contractPeriod)}}</p>
    </div>
  </div>
</template>

<script>
import dateformat from 'dateformat'
export default {
  name: 'suclist',
  data () {
    return {
      regionList: ['亚太', '大陆', '港澳台', '欧洲', '美洲']
    }
  },
  computed: {
    suclist () {
      return this.$store.state.getSuccessOperator
    }
  },
  methods: {
    formTime () {
      var start = this.suclist.createdAt
      start = dateformat(start, 'isoDate')
      return start
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.suclist{background-color: #f5f5f5;width: 60%;margin-left:19%;text-align: left;padding: 2rem;}
.list-title{margin-bottom: 2rem;}
.list-title p{line-height: 3rem;font-size: 1.1rem;color: #5a5a5a;}
.list-title .title{font-size: 1.3rem;font-weight: bold;color: #5a5a5a}

.list-form{border: 1px dashed #222222;padding: 1rem 2rem;}
.list-form p{line-height: 3rem;font-size: 1rem;}
.list-bottom{text-align: right;}
.list-bottom p{margin: 1rem;padding-top: 1rem;color: #5a5a5a;}
.print-justfy1{color: #a5a5a5; word-wrap: break-word}
/**/
@media print {
  .Noprint { display: none }
  .print{margin-left: -1rem;margin-top: 15rem;width: 57%;overflow: hidden;word-break:break-all;}
  .print p{font-size: 1.4rem;line-height: 5rem;}
  .print-ex span{width: 40%}
  .print-title{font-size: 1.8rem}
  .print-justfy{margin-top: -5.1rem;margin-left: 8rem}
  html,body{font-size: 16px}
  .PageNext{ page-break-after: always }
}
</style>
