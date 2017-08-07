<template>
  <div class="loginbar">
    <i class="el-icon-share"></i>
    <a href="#" class="help">帮助</a>
    <span class="imgBox">
      <img src="/static/admin.svg" alt="头像" class="user-icon">
    </span>
    <el-dropdown trigger="click" class="moreIcon" @command="userMenu">
      <span class="el-dropdown-link"><span class="userName">{{userInfo}}</span></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personalcenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'loginbar',
  computed: {
    userInfo () {
      var username = ''
      if (this.$store.state.backloginfo.username === undefined) {
        username = localStorage.username
      } else {
        username = this.$store.state.backloginfo.username
      }
      return username.split('_').join(' ')
    }
  },
  methods: {
    userMenu (command) {
      if (command === 'logout') {
        this.logout()
      } else if (command === 'personalcenter') {
        this.goPersonalCenter()
      }
    },
    logout () {
      this.$confirm('请问是否退出登陆?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '您已退出登陆!'
        })
        this.$router.push('board')
        this.$store.commit({
          type: 'getNowSearchIndex',
          data: 'board'
        })
        localStorage.clear()
        this.$store.commit('changeIslogin')
        // console.log(localStorage)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    goPersonalCenter () {
      this.$store.commit({
        type: 'getnowindex',
        data: 'personalcenter'
      })
      this.$router.push('personalcenter')
    }
  }
}
</script>

<style scoped>
.loginbar{float: right;margin-right: 2rem;}
.el-icon-share{color: #797979;font-size: 1.5rem;margin-right: 0.5rem}
.user-icon{width: 100%;height: 100%}
.help{text-decoration: none;font-size: 1.25rem;color: #222222;vertical-align: 0.15rem;margin-right: 1rem}
.userName{font-size: 1.4rem;font-weight: 300;cursor: pointer;}
.imgBox{display: inline-block;width: 3.5rem;height: 3.5rem;border-radius: 100%;position: relative;bottom: -1.5rem;margin-right: 0.5rem;overflow: hidden}
img{display: block;width: 100%;height: 100%;border: none}
</style>
