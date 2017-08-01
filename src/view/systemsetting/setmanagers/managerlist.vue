<template>
  <div class="managerlist">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
        <el-breadcrumb-item>管理员管理 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">管理员列表</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <searchbox></searchbox>
    <div class="search">
      <p>共搜索到 0 条数据</p>
    </div>
   <div class="managerlist-form">
    <el-table border tooltip-effect="dark" :data="adminList">
        <el-table-column type="selection" width="60" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="displayName" label="昵称" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="adminName" label="真实姓名" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="property" label="权限" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="do" label="操作" show-overflow-tooltip align="center">
            <template scope="scope">
                <el-button size="small">编辑</el-button>
                <el-button size="small" type="danger">冻结</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import Searchbox from '@/components/generalcomponent/searchbox'
export default {
  components: {
    Searchbox
  },
  beforeCreate () {
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'managerlist'
    })
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.dispatch('getAdminlist')
  },
  computed: {
    adminList () {
      return this.$store.state.adminList
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*search*/
.search{margin-left: 2rem;margin-top: 2rem}
.search p{padding-bottom: 1rem}
/**/
.managerlist-form{width: 97%;margin:0 auto;}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
