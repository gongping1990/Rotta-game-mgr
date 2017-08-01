<template>
  <div>
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏运营商 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">游戏运营商详细</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="my-title">
      <h2>{{gameDetail.companyName}}</h2>
    </div>
    <outdetailform></outdetailform>
  </div>
</template>

<script>
import Outdetailform from '@/components/agentcenter/outagent/outdetailform'
export default {
  components: {
    Outdetailform
  },
  computed: {
    gameDetail () {
      return this.$store.state.gameDetailInfo
    }
  }
}
</script>

<style scoped>
/**/
.my-title{text-align: center}
h2{font-size: 3rem;color: #5a5a5a;padding-top: 2rem;}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
