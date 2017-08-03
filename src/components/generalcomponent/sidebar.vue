<template>
  <div>
    <el-row class="sidebar">
        <el-col>
            <el-menu :default-active="nowindex" class="el-menu-vertical-demo" theme="dark" :router="router">
                <el-menu-item index="0">NA LOGO</el-menu-item>
                <el-menu-item index="board">看板</el-menu-item>
                <!--<el-submenu index="1">-->
                    <!--<template slot="title">游戏运营商列表</template>-->
                    <!--<el-submenu index="1-1">-->
                        <!--<template slot="title">出口代理商</template>-->
                        <!--<el-menu-item index="outlist">代理商列表</el-menu-item>-->
                        <!--<el-menu-item index="createout">创建代理商</el-menu-item>-->
                    <!--</el-submenu>-->
                    <!--<el-submenu index="1-2">-->
                        <!--<template slot="title">一般商户</template>-->
                        <!--<el-menu-item index="comlist">一般商户列表</el-menu-item>-->
                        <!--<el-menu-item index="createcom">创建一般商户</el-menu-item>-->
                    <!--</el-submenu>-->
                <!--</el-submenu>-->
                <el-submenu index="1">
                    <template slot="title">游戏运营商</template>
                    <el-menu-item index="operatorList">运营商列表</el-menu-item>
                    <el-menu-item index="addOperator">创建游戏运营商</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">游戏列表</template>
                    <el-menu-item index="gameList">游戏列表</el-menu-item>
                    <el-menu-item index="addGame">创建游戏</el-menu-item>
                </el-submenu>
                <!--<el-menu-item index="outlist">游戏运营商列表</el-menu-item>-->
                <!--<el-menu-item index="operationcenter">游戏列表</el-menu-item>-->
                <!--<el-submenu index="4">-->
                    <!--<template slot="title">财务中心</template>-->
                    <!--<el-menu-item index="propertycenter">线路商报表</el-menu-item>-->
                <!--</el-submenu>-->
                <!-- <el-menu-item index="propertycenter">财务中心</el-menu-item> -->
                <el-menu-item index="propList">道具中心</el-menu-item>
                <!--<el-menu-item index="commandcenter">客服中心</el-menu-item>-->
                <!--<el-submenu index="5">-->
                    <!--<template slot="title">系统设置</template>-->
                    <!--<el-submenu index="5-1">-->
                        <!--<template slot="title">登录日志</template>-->
                        <!--<el-menu-item index="outdate">代理商登录日志</el-menu-item>-->
                        <!--<el-menu-item index="comdate">一般商户登陆日志</el-menu-item>-->
                    <!--</el-submenu>-->
                    <!--<el-submenu index="5-2">-->
                        <!--<template slot="title">操作日志</template>-->
                        <!--<el-menu-item index="managerdate">管理员操作日志</el-menu-item>-->
                    <!--</el-submenu>-->
                    <!--<el-submenu index="4-3">-->
                        <!--<template slot="title">管理员管理</template>-->
                        <!--<el-menu-item index="managerlist">管理员列表</el-menu-item>-->
                        <!--<el-menu-item index="addmanager">添加管理员</el-menu-item>-->
                    <!--</el-submenu>-->
                    <!--<el-menu-item index="msnlist">线路号列表</el-menu-item>-->
                <!--</el-submenu>-->
            </el-menu>
        </el-col>
    </el-row>
</div>

</template>
<script>
export default {
  name: 'sidebar',
  data () {
    return {
      router: true
    }
  },
  computed: {
    nowindex () {
      return this.$store.state.nowsearchindex
    },
    nowarray () {
      return this.$store.state.nowarray
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar{padding-bottom: 10rem}
</style>
