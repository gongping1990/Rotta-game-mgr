<template>
  <div>
    <div class="title Noprint">
	    <el-breadcrumb separator="/">
	      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
	      <el-breadcrumb-item>出口代理商 </el-breadcrumb-item>
	      <el-breadcrumb-item>创建游戏运营商 </el-breadcrumb-item>
	      <el-breadcrumb-item><span  class="large">{{backinfo}}</span> </el-breadcrumb-item>
	    </el-breadcrumb>
	  </div>
  	<outstep :active="active" class="Noprint"></outstep>
  	<createform v-if="active==0" class="Noprint"></createform>
    <setform v-if="active==1" class="Noprint"></setform>
    <success v-if="active==3" class="Noprint"></success>
    <suclist v-if="active==3"></suclist>
  	<div class="bottom">
      <successbtn v-if="active==3" hash="outlist" detail="outdetailed" class="Noprint"></successbtn>
  	</div>
  </div>
</template>
<!-- console.log('提交前的结果是', this.$store.getters.backcreateOutData)
        invoke({
          url: '/users',
          method: 'post',
          data: this.$store.getters.backcreateOutData
        }) -->
<script>
import Outstep from '@/components/agentcenter/outagent/outstep'
import Createform from '@/components/agentcenter/outagent/createform'
import Setform from '@/components/agentcenter/outagent/setform'
import Stepbtn from '@/components/generalcomponent/stepbtn'
import Successbtn from '@/components/generalcomponent/successbtn'
import Success from '@/components/generalcomponent/success'
import Suclist from '@/components/agentcenter/outagent/suclist'
export default {
  components: {
    Outstep,
    Createform,
    Setform,
    Stepbtn,
    Successbtn,
    Success,
    Suclist
  },
  beforeCreate () {
    this.$store.commit({
      type: 'clearActive',
      data: 'fromOut'
    })
  },
  data () {
    return {
      backinfo: '填写基本信息'
    }
  },
  computed: {
    active () {
      return this.$store.getters.backNowActive
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom{text-align: center;}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
@media print {
  .Noprint { display: none }
  .PageNext{ page-break-after: always }
}
</style>
