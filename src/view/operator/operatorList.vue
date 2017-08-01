<template>
  <div>
  	<div class="title">
	    <el-breadcrumb separator="/">
	      <el-breadcrumb-item>游戏运营商 </el-breadcrumb-item>
	      <el-breadcrumb-item><span  class="large">运营商列表</span> </el-breadcrumb-item>
	    </el-breadcrumb>
	  </div>
    <searchbox></searchbox>
    <p class="searchResult">共搜索到 {{searchinfo||0}} 条数据</p>
    <el-button type="primary" class="justfy1" @click="goCreate">创建新运营商</el-button>
    <outresult></outresult>
  </div>
</template>

<script>
import Searchbox from '@/components/generalcomponent/searchbox'
import Outresult from '@/components/agentcenter/outagent/outresult'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    searchinfo () {
      if (this.$store.state.operatorList) {
        return this.$store.state.operatorList.length
      }
    }
  },
  methods: {
    goCreate () {
      this.$router.push('addOperator')
      this.$store.commit({
        type: 'changeindex',
        data: 'addOperator'
      })
    }
  },
  components: {
    Searchbox,
    Outresult
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchResult{padding: 1rem 2rem}
.justfy1{margin:0 2rem;}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
