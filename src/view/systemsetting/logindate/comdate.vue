<template>
  <div class="comdate">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
        <el-breadcrumb-item>登录日志 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">一般商户登陆日志</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <searchbox></searchbox>
    <div class="search">
      <p>共搜索到 0 条数据</p>
      <el-button type="primary">导出excel</el-button>
    </div>
    <div class="comdate-list">
      <el-table stripe :data="comdate">
        <el-table-column label="序号" prop="" align="center" width="65" type="index">
        </el-table-column>
        <el-table-column label="商户标示" prop="suffix" align="center">
        </el-table-column>
        <el-table-column label="商户昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="商户所属线路商标示" prop="parentSuffix" align="center">
        </el-table-column>
        <el-table-column label="商户管理账号" prop="username"  align="center">
        </el-table-column>
        <el-table-column label="最后登陆IP" prop="lastIP"  align="center">
        </el-table-column>
        <el-table-column label="最后登录时间" prop="updatedAt" min-width="95" :formatter="formTime" align="center">
        </el-table-column>
        <el-table-column label="状态" prop="userStatus" align="center">
          <template scope="scope">
            <p v-if="scope.row.userStatus === 0" class="green"><span class="statusIcon1">&middot;</span>锁定</p>
            <p v-if="scope.row.userStatus === 1" class="red"><span class="statusIcon2">&middot;</span>正常</p>
          </template>
        </el-table-column>
        <el-table-column label="详情" prop="detail" align="center">
          <template scope="scope">
            <p v-if="scope.row.userStatus === 0"><span class="statusIcon1">&middot;</span>{{scope.row.detail}}</p>
            <p v-if="scope.row.userStatus === 1"><span class="statusIcon2">&middot;</span>{{scope.row.detail}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="65">
            <template scope="scope">
              <el-button v-if="scope.row.userStatus === 0" type="text" class="myBtn">解锁</el-button>
              <el-button v-if="scope.row.userStatus === 1" type="text" class="myBtn">锁定</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
  </div>
</template>

<script>
import dateformat from 'dateformat'
import Searchbox from '@/components/generalcomponent/searchbox'
export default {
  components: {
    Searchbox
  },
  beforeCreate () {
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'comdate'
    })
    // console.log(localStorage)
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.commit('startLoading')
  },
  created () {
    this.$store.dispatch('merchantLoginList')
  },
  computed: {
    comdate () {
      return this.$store.state.merchantloginList
    }
  },
  data () {
    return {
    }
  },
  methods: {
    formTime (row, col) {
      var time = row.updatedAt
      time = dateformat(time, 'isoDateTime')
      time = time.split('T')
      var a = time[0]
      var b = time[1]
      b = b.slice(0, 8)
      return a + ' ' + b
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
.comdate-list{width: 97%;margin: 0 auto;margin-top: 3rem}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
/**/
.statusIcon1{font-size: 4rem;color:#F04134;display: inline-block;margin-right: 0.2rem;vertical-align: -0.85rem}
.statusIcon2{font-size: 4rem;color:#00A854;display: inline-block;margin-right: 0.2rem;vertical-align: -0.85rem}
.green{color: #F04134;margin-left: -0.8rem}
.red{color: #00A854;margin-left: -0.8rem}
</style>
