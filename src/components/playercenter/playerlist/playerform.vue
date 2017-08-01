<template>
<div class="playerform">
    <el-table border tooltip-effect="dark" :data="playerList">
        <el-table-column type="selection" width="60" align="center">
        </el-table-column>
        <el-table-column prop="playerName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="merchantId" label="线路号" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="points" label="点数" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="loginAt" label="最近登陆游戏时间" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="dadfsfddd" label="操作" show-overflow-tooltip align="center">
            <template scope="scope">
                <el-button size="small" @click="godetailed">编辑</el-button>
                <el-button size="small" type="danger">冻结</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="bottomBtn">
        <el-button type="primary">批量冻结</el-button>
        <el-button type="primary">批量解冻</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: 'playerform',
  data () {
    return {
      playerList: [
        {
          playerName: '李君', // 用户名
          merchantId: '000', // 所属商户
          points: '10000', // 拥有点数
          loginAt: '', // 最近登陆时间
          status: '' // 操作状态 编辑/冻结
        }, {
          playerName: '李屹',
          merchantId: '000',
          points: '55698',
          loginAt: '',
          status: '' // 操作状态 编辑/冻结
        }, {
          playerName: '老曾',
          merchantId: '000',
          points: '665489',
          loginAt: '',
          status: '' // 操作状态 编辑/冻结
        }, {
          playerName: '肖军',
          merchantId: '000',
          points: '98685',
          loginAt: '',
          status: '' // 操作状态 编辑/冻结
        }, {
          playerName: '孙滋书',
          merchantId: '000',
          points: '4566',
          loginAt: '',
          status: '' // 操作状态 编辑/冻结
        }, {
          playerName: '陈文',
          merchantId: '000',
          points: '1999',
          loginAt: '',
          status: '' // 操作状态 编辑/冻结
        }
      ]
    }
  },
  methods: {
    godetailed () {
      this.$router.push('playerdetail')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.playerform{width: 97%;margin:0 auto;}
.bottomBtn{text-align: right;margin-top: 2rem;}
</style>
