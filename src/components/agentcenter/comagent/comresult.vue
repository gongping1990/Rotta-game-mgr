<template>
<div class="outresult">
    <el-table stripe :data="comlist">
        <el-table-column label="序号" prop="" align="center" width="65" type="index">
        </el-table-column>
        <el-table-column type="expand" width="10">
            <template scope="props">
                <el-form label-position="center" inline>
                    <el-form-item label="线路号" class="moreinfo">
                        <span>{{ props.row.msn }}</span>
                    </el-form-item>
                    <el-form-item label="商户抽成比" class="moreinfo">
                        <span>{{ props.row.rate }}%</span>
                    </el-form-item>
                    <el-form-item label="商户密匙" class="moreinfo">
                        <span>{{ props.row.apiKey }}</span>
                    </el-form-item>
                    <el-form-item label="管理员账号" class="moreinfo">
                        <span>{{ props.row.adminName }}</span>
                    </el-form-item>
                    <el-form-item label="管理员密码" class="moreinfo">
                        <span>{{ props.row.password }}</span>
                    </el-form-item>
                    <el-form-item label="管理员姓名" class="moreinfo">
                        <span>{{ props.row.adminName }}</span>
                    </el-form-item>
                    <el-form-item label="管理员联系方式" class="moreinfo">
                        <span>{{ props.row.adminContact }}</span>
                    </el-form-item>
                    <el-form-item label="管理员邮箱" class="moreinfo">
                        <span>{{ props.row.adminEmail }}</span>
                    </el-form-item>
                    <el-form-item label="代理生效时间" class="moreinfo">
                        <span>{{ contractPeriod(props.row.contractPeriod) }}</span>
                    </el-form-item>
                    <el-form-item label="商户白名单" class="moreinfo1">
                        <span>{{props.row.loginWhiteList}}</span>
                    </el-form-item>
                    <el-form-item label="商户前端域名" class="moreinfo1">
                        <span>{{props.row.frontURL}}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column label="商户号" prop="displayId" align="center">
        </el-table-column>
        <el-table-column label="商户标示" prop="suffix" align="center">
        </el-table-column>
        <el-table-column label="商户昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="所属代理商" prop="parentName" align="center" >
        </el-table-column>
        <el-table-column label="商户点数" prop="points" sortable align="center">
        </el-table-column>
        <el-table-column label="商户游戏" prop="gameList" align="center">
            <template scope="scope">
                <div slot="reference" class="gamelist">
                    <el-tag v-for="item in scope.row.gameList" key={{item}}>{{ item }}</el-tag>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="商户邮箱" prop="merchantEmail" header-align="center" min-width="95">
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" align="center" min-width="120" :formatter='getAtime'>
        </el-table-column>
        <el-table-column label="最后登录时间" prop="loginAt" align="center" min-width="150" :formatter='getBtime'>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status" sortable width="90" :formatter="getStatus">
        </el-table-column>
        <el-table-column label="备注" align="center" width="65">
            <template scope="scope">
              <el-popover trigger="hover" placement="bottom-start" width="250">
              <p>{{ scope.row.remark }}</p>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column> 
        <el-table-column label="操作" align="center" min-width="65">
            <template scope="scope">
                <el-button type="text" class="myBtn" @click="checkUser(scope.$index, scope.row)">查看</el-button>
                <el-button type="text" class="myBtn" @click="editUser(scope.$index, scope.row)">编辑</el-button>
                <el-button type="text" class="myBtn" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="this.$store.state.comlistSearch.length" :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage"></el-pagination>
    </div>
</div>

</template>

<script>
import dateformat from 'dateformat'
export default {
  name: 'comresult',
  beforeCreate () {
    this.$store.commit('resetSearchID')
    localStorage.removeItem('userID')
    this.$store.commit('startLoading') // 开启loading
    this.$store.commit('clearCondition') // 初始化搜索条件
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'comlist'
    })
  },
  created () {
    console.log(localStorage)
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.dispatch('getcomData')
    // console.log('一般代理商数据', this.$store.state.comListData)
  },
  data () {
    return {
      ishidden: true,
      nowSize: 5,
      nowPage: 1
    }
  },
  computed: {
    comlist () {
      if (this.nowPage === 1) {
        return this.$store.state.comlistSearch.slice(0, this.nowSize)
      } else {
        return this.$store.state.comlistSearch.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getStatus (row, col) {
      var backStatus = ''
      if (row.status === 0) {
        backStatus = '未启用'
      } else if (row.status === 1) {
        backStatus = '已启用'
      }
      return backStatus
    }, // 格式化登录状态
    getAtime (row, col) {
      var now = new Date(parseFloat(row.createdAt)) + ''
      var formatprev = dateformat(now, 'isoDate')
      var formatnext = dateformat(now, 'isoTime')
      return formatprev + ' ' + formatnext
    }, // 格式化创建时间
    getBtime (row, col) {
      var now = new Date(parseFloat(row.loginAt)) + ''
      var formatprev = dateformat(now, 'isoDate')
      var formatnext = dateformat(now, 'isoTime')
      return formatprev + ' ' + formatnext
    }, // 格式化最后登录时间
    contractPeriod (time) {
      var a = time[0]
      var b = time[1]
      a = a.slice(0, 10)
      b = b.slice(0, 10)
      return a + ' 至 ' + b
    }, // 格式化有效时间
    checklist () {
      this.$router.push('comdetailed')
      this.$store.commit({
        type: 'changeindex',
        data: 'comlist'
      })
    },
    cancel () {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    checkUser (index, row) {
      this.$store.commit({
        type: 'getSearchID',
        data: row.userId
      })
      this.$store.commit('closeEdit')
      console.log('查看的用户为 ' + row.username + ' / ' + '查看的用户ID为 ' + row.userId)
      this.$router.push('comdetailed')
    }, // 查看用户
    editUser (index, row) {
      this.$store.commit({
        type: 'getSearchID',
        data: row.userId
      })
      this.$store.commit('startEdit')
      console.log('编辑的用户为 ' + row.username + ' / ' + '编辑的用户ID为 ' + row.userId)
      this.$router.push('comdetailed')
    }, // 编辑用户
    deleteUser (index, row) {
      this.$store.commit({
        type: 'getSearchID',
        data: row.userId
      })
      console.log('删除的用户为 ' + row.username + ' / ' + '删除的用户ID为 ' + row.userId)
    }, // 删除用户
    getNowsize (size) {
      this.nowSize = size
      console.log('当前每页:' + size)
    },
    getNowpage (page) {
      this.nowPage = page
      console.log('当前是第:' + page + '页')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outresult{padding: 2rem;}
.gamelist span{width: 100%;text-align: center;margin: 0.25rem 0;background-color: #fff;color: #000}
.justfy2{margin-top: 0.2rem}
.myBtn{width: 100%;margin: 0 auto}
.moreinfo{float: left;width: 30%}
.moreinfo1{float: left;width: 100%}
/**/
.page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 0.5rem;margin-top: 2rem}
</style>
