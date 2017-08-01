<template>
  <div>
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
        <el-breadcrumb-item>一般商户 </el-breadcrumb-item>
        <el-breadcrumb-item>一般商户列表 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">一般商户详情</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="my-title">
      <h2>{{comdetail.displayName}}</h2>
    </div>
    <comdetailform></comdetailform>
  </div>
</template>

<script>
import Comdetailform from '@/components/agentcenter/comagent/comdetailform'
export default {
  components: {
    Comdetailform
  },
  computed: {
    comdetail () {
      return this.$store.state.comdetail
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
