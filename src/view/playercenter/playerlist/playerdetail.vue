<template>
	<div class="playerdetail">
		<div class="title">
      		<el-breadcrumb separator="/">
        		<el-breadcrumb-item>玩家中心 </el-breadcrumb-item>
        		<el-breadcrumb-item>玩家列表 </el-breadcrumb-item>
        		<el-breadcrumb-item><span  class="large">玩家详细信息</span> </el-breadcrumb-item>
      		</el-breadcrumb>
    	</div>
    	<div class="my-title">
      		<h2>JamesLi</h2>
    	</div>
    	<playerdetailform></playerdetailform>
	</div>
</template>
<script>
import Playerdetailform from '@/components/playercenter/playerlist/playerdetailform'
export default {
  components: {
    Playerdetailform
  }
}
</script>
<style scoped>
/*副标题*/
.my-title{text-align: center}
h2{font-size: 3rem;color: #5a5a5a;padding-top: 2rem;}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
