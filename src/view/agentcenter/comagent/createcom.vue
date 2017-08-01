<template>
  <div>
    <div class="title">
	    <el-breadcrumb separator="/">
	      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
	      <el-breadcrumb-item>一般商户 </el-breadcrumb-item>
	      <el-breadcrumb-item>创建一般商户 </el-breadcrumb-item>
	      <el-breadcrumb-item><span  class="large">{{backinfo}}</span> </el-breadcrumb-item>
	    </el-breadcrumb>
	  </div>
    <comstep :active="active"></comstep>
    <createform v-if="active == 0"></createform>
    <setform v-if="active == 1"></setform>
    <success v-if="active == 3"></success>
    <suclist v-if="active == 3"></suclist>
    <div class="bottom">
      <successbtn v-if="active==3" hash="comlist" detail="comdetailed"></successbtn>
  	</div>
  </div>
</template>

<script>
import Comstep from '@/components/agentcenter/comagent/comstep'
import Createform from '@/components/agentcenter/comagent/createform'
import Setform from '@/components/agentcenter/comagent/setform'
import Stepbtn from '@/components/generalcomponent/stepbtn'
import Successbtn from '@/components/generalcomponent/successbtn'
import Success from '@/components/generalcomponent/success'
import Suclist from '@/components/agentcenter/comagent/suclist'
export default {
  components: {
    Comstep,
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
      data: 'fromCom'
    })
  },
  data () {
    return {
      backinfo: '填写基本信息'
    }
  },
  computed: {
    active () {
      return this.$store.state.nowcomactive
    }
  },
  mounted () {
    this.$on('active', function () {
      console.log(this.active)
      this.active++
      if (this.active === 1) {
        this.backinfo = '配置代理商'
      }
      if (this.active === 2) {
        this.active = 3
        this.backinfo = '创建成功'
      }
      if (this.active > 3) {
        this.active = 3
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom{text-align: center;}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
