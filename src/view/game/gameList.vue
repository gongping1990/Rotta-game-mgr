<template>
  <div>
  	<div class="title">
	    <el-breadcrumb separator="/">
	      <el-breadcrumb-item>游戏运营商 </el-breadcrumb-item>
	      <el-breadcrumb-item><span  class="large">运营商列表</span> </el-breadcrumb-item>
	    </el-breadcrumb>
	  </div>
    <searchbox></searchbox>
    <p class="searchResult">共搜索到 {{counts.length||0}} 条数据</p>
    <el-button type="primary" class="justfy1" @click="goCreate">创建新游戏</el-button>
    <div class="outresult">
      <el-table stripe :data="gameItems">
        <el-table-column label="游戏名称" prop="gameName" align="center">
        </el-table-column>
        <el-table-column label="分类" prop="gameType" :formatter="getType" align="center">
        </el-table-column>
        <el-table-column label="所属运营商" prop="company.companyName" align="center">
        </el-table-column>
        <!--<el-table-column label="游戏消耗总点数" prop="points" align="center">-->
        <!--</el-table-column>-->
        <el-table-column label="创建时间" prop="createdAt" :formatter="getAtime" min-width="95">
        </el-table-column>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="gameStatus"  width="90">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="65">
          <template scope="scope">
            <el-button type="text" class="myBtn" @click="goDetail(scope.row)">查看</el-button>
            <!--<el-button type="text" class="myBtn" @click="editUser(scope.$index, scope.row)">更多</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.gamelist.length"
                       :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">

        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import dateformat from 'dateformat'
import Searchbox from '@/components/generalcomponent/searchGame'
import { invoke } from '@/libs/fetchLib'
import { api } from '@/libs/fetchConfig'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.commit('startLoading')
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'gameList'
    })
  },
  created () {
    this.$store.dispatch('getGamelist')
  },
  data () {
    return {
      nowSize: 5,
      nowPage: 1,
      gameTypeList: ['棋牌游戏', '电子游戏', '真人视讯']
    }
  },
  computed: {
    counts () {
      return this.$store.state.gamelist
    },
    gameItems () {
      if (this.nowPage === 1) {
        return this.$store.state.gamelist.slice(0, this.nowSize)
      } else {
        return this.$store.state.gamelist.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    goCreate () {
      this.$router.push('addGame')
      this.$store.commit({
        type: 'getNowSearchIndex',
        data: 'addGame'
      })
    },
    getAtime (row, col) {
      var now = new Date(parseFloat(row.createdAt))
      var formatprev = dateformat(now, 'isoDate')
      return formatprev
    }, // 格式化创建时间
    goDetail (row) {
      invoke({
        url: api.gameOne.url + '/' + row.gameType + '/' + row.gameId,
        method: api.gameOne.method
      }).then((data) => {
        let [err, res] = data
        if (err) {

        } else {
          this.$store.commit({
            type: 'gameReadyDetailInfo',
            data: res.data.payload
          })
        }
      })
      this.$router.push('gamedetail')
    },
    getType (row) {
      return this.gameTypeList[row.gameType]
    },
    getNowsize (size) {
      this.nowSize = size
      console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    }
  },
  components: {
    Searchbox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .outresult{padding: 2rem;}
.searchResult{padding: 1rem 2rem}
.justfy1{margin:0 2rem;}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
