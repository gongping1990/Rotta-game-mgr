<template>
<div class="playerlist">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>玩家中心 </el-breadcrumb-item>
        <el-breadcrumb-item><span class="large">玩家列表</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <searchbox></searchbox>
    <div class="rebackinfo">
        <p>共搜索到 0 条数据</p>
    </div>
    <playerform></playerform>
</div>
</template>
<script>
import Searchbox from '@/components/generalcomponent/searchbox'
import Playerform from '@/components/playercenter/playerlist/playerform'
export default {
  components: {
    Searchbox,
    Playerform
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rebackinfo{padding: 2rem;}

/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
