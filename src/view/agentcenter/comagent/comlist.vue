<template>
  <div>
    <div class="title">
	    <el-breadcrumb separator="/">
	      <el-breadcrumb-item>商户中心 </el-breadcrumb-item>
	      <el-breadcrumb-item>一般商户 </el-breadcrumb-item>
	      <el-breadcrumb-item><span  class="large">一般商户列表</span> </el-breadcrumb-item>
	    </el-breadcrumb>
	  </div>
	<searchbox></searchbox>
    <p class="searchResult">共搜索到 {{searchinfo}} 条数据</p>
    <el-button type="primary" class="justfy1" @click="goCreate">创建新代理</el-button>
    <comresult></comresult>
  </div>
</template>

<script>
import Searchbox from '@/components/generalcomponent/searchbox'
import Comresult from '@/components/agentcenter/comagent/comresult'
export default {
  computed: {
    searchinfo () {
      return this.$store.state.comlistSearch.length
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goCreate () {
      this.$router.push('createcom')
      this.$store.commit({
        type: 'changeindex',
        data: 'createcom'
      })
    }
  },
  components: {
    Searchbox,
    Comresult
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
