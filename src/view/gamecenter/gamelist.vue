<template>
  <div class="gamelist">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏中心 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">游戏列表</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <gametab></gametab>
  </div>
</template>

<script>
import Gametab from '@/components/gamecenter/gametab'
export default{
  components: {
    Gametab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
