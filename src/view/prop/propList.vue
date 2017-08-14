<template>
  <div>
  	<div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>道具管理 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">道具列表</span> </el-breadcrumb-item>
      </el-breadcrumb>
	  </div>
    <div class="propList -search">
      <el-row class="transition-box">
        <el-col :span="10">
          <span>道具ID: </span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.toolId"></el-input>
        </el-col>
        <el-col :span="10">
          <span>道具名称：</span>
          <el-input placeholder="请输入" class="input" v-model="searchInfo.toolName"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="startSearch">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <p class="searchResult">共搜索到 {{propList.length || 0}} 条数据</p>
    <el-button type="primary" class="justfy1" @click="openModal()">创建新道具</el-button>
    <div class="propList">
      <el-table stripe :data="getItems">
        <!--<el-table-column label="排序" align="center" width="90" prop="order">-->
        <!--</el-table-column>-->
        <el-table-column label="道具id" prop="toolId" align="center">
        </el-table-column>
        <el-table-column label="道具名称" prop="toolName" align="center">
        </el-table-column>
        <el-table-column label="图标" align="center">
          <template scope="scope">
            {{scope.row.icon}}
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="desc" align="center">
          <template scope="scope">
            {{scope.row.desc == 'NULL!' ? '-' : scope.row.desc}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" :formatter="getAtime">
        </el-table-column>
        </el-table-column>
        <el-table-column label="状态" align="center" width="90" class-name="green">
          <template scope="scope">
            <el-tag :type="scope.row.toolStatus ? 'success' : 'gray'">
              {{propStatus[scope.row.toolStatus]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" >
          <template scope="scope">
            <el-popover trigger="hover" placement="bottom-start" width="250">
              <p>{{ scope.row.remark === 'NULL!' ? '' : scope.row.remark}}</p>
              <div slot="reference" class="">
                <el-icon name="search" style="color:#108ee9"></el-icon>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template scope="scope">
            <el-button type="text" @click="changeStatus(scope.row)">{{scope.row.toolStatus ? '冻结' : '解冻'}}</el-button>
            <el-button type="text" @click="openModal(scope.row)">编辑</el-button>
            <el-button type="text" @click="delProp(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="propList.length"
                       :page-sizes="[5, 10]" :page-size="nowSize" @size-change="getNowsize" @current-change="getNowpage">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="添加道具" :visible.sync="isAddProp" style="text-align: center">
      <el-form :model="propInfo">
        <el-form-item label="道具名称" label-width="100px" >
          <el-input v-model="propInfo.toolName" placeholder="请输入道具名称" :maxlength='20' :disabled="editStatus"></el-input>
        </el-form-item>
        <el-form-item label="道具图标" label-width="100px" >
          <el-input v-model="propInfo.icon" placeholder="请输入道具图标" :maxlength='256'></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="100px" >
          <el-input v-model="propInfo.desc" type="textarea" :rows="4" auto-complete="off"  placeholder="请输入描述"
                    :maxlength='200'></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="100px" >
          <el-input v-model="propInfo.remark" type="textarea" :rows="4" auto-complete="off" placeholder="请输入备注"
                    :maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddProp = false">取 消</el-button>
        <el-button type="primary" :load="isSending" @click="submitProp(propInfo.toolId)">{{isSending ? '提交中' : '确 定'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import dateformat from 'dateformat'
import { invoke } from '@/libs/fetchLib'
import { api } from '@/libs/fetchConfig'
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'propList'
    })
    this.$store.commit('startLoading')
  },
  created () {
    this.getPropList()
  },
  data () {
    return {
      nowSize: 5,
      nowPage: 1,
      isAddProp: false,
      isSending: false,
      editStatus: false,
      propStatus: ['冻结', '正常'],
      propList: [],
      propInfo: {
        toolName: '',
        remark: '',
        desc: '',
        icon: ''
      },
      searchInfo: {
        toolName: '',
        toolId: ''
      },
      searchArray: [] // 暂时存储
    }
  },
  computed: {
    getItems () {
      if (this.nowPage === 1) {
        return this.propList.slice(0, this.nowSize)
      } else {
        return this.propList.slice(((this.nowPage - 1) * this.nowSize), this.nowSize * this.nowPage)
      }
    }
  },
  methods: {
    getPropList () {
      invoke({
        url: api.propList.url,
        method: api.propList.method
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.response.data.err.msg,
              type: 'error'
            })
          } else {
            this.propList = res.data.payload
          }
          this.$store.commit('closeLoading')
        }
      )
    },
    submitProp (id) {
      if (!this.propInfo.toolName) {
        return this.$message({
          message: '请输入道具名称',
          type: 'error'
        })
      }
      if (this.isSending) return // 防止重复提交
      this.isSending = true
      invoke({
        url: id ? api.updateProp.url : api.addProp.url,
        method: api.addProp.method,
        data: this.propInfo
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.response.data.err.msg,
              type: 'error'
            })
          } else if (res) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.isAddProp = false
            this.getPropList()
          }
          this.isSending = false
        }
      )
    },
    changeStatus (row) {
      this.$store.commit('startLoading')
      invoke({
        url: api.changeState.url,
        method: api.changeState.method,
        data: {
          toolName: row.toolName,
          toolId: row.toolId,
          status: row.toolStatus ? 0 : 1
        }
      }).then(
        result => {
          const [err, res] = result
          if (err) {
            this.$message({
              message: err.response.data.err.msg,
              type: 'error'
            })
          } else if (res) {
            this.$message({
              message: '状态改变成功',
              type: 'success'
            })
            this.getPropList()
          }
          this.$store.commit('closeLoading')
        }
      )
    }, // 更改道具状态
    delProp (row) {
      this.$confirm('删除后该道具无法恢复，你还要继续吗？', `确定删除道具${row.toolName}吗？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        invoke({
          url: api.delProp.url,
          method: api.delProp.method,
          data: {
            toolId: row.toolId,
            toolName: row.toolName
          }
        }).then(
          result => {
            const [err, res] = result
            if (err) {
              this.$message({
                message: err.response.data.err.msg,
                type: 'error'
              })
            } else if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.isAddProp = false
              this.getPropList()
            }
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }, // 删除
    openModal (row = {}) {
      this.isAddProp = true
      this.propInfo = JSON.parse(JSON.stringify(row))
      if (JSON.stringify(row) !== '{}') {
        this.editStatus = true
        this.propInfo.desc = this.propInfo.desc === 'NULL!' ? '' : this.propInfo.desc
        this.propInfo.remark = this.propInfo.remark === 'NULL!' ? '' : this.propInfo.remark
      } else {
        this.editStatus = false
      }
    },
    startSearch () {
      let {toolId, toolName} = this.searchInfo
      if ((!toolId && !toolName)) {
        this.searchArray = []
        this.getPropList()
      } else if (toolName && toolId) {
        this.propList = this.propList.filter(item => {
          return (item.toolName === this.searchInfo.toolName && item.toolId === this.searchInfo.toolId)
        })
      } else {
        if (toolName) {
          this.propList = this.propList.filter(item => {
            return item.toolName === this.searchInfo.toolName
          })
        } else if (toolId) {
          this.propList = this.propList.filter(item => {
            return item.toolId === this.searchInfo.toolId
          })
        }
      }
    }, // 控制搜索条件
    getAtime (row, col) {
      var now = new Date(parseFloat(row.createdAt))
      var formatprev = dateformat(now, 'isoDate')
      return formatprev
    }, // 格式化创建时间
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
  .propList{padding: 2rem;}
  .-search{margin: 2rem; background-color: #f5f5f5; text-align: center }
  .input{width: 80%}
  .searchResult{padding: 1rem 2rem}
  .justfy1{margin:0 2rem;}
  .page {padding-bottom: 2rem;text-align: right;margin-right: 1%;margin-top: 2rem}
  /*面包屑组件*/
  .title{padding: 2rem;}
  .large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
