<template>
  <div id="app">
    <login v-if="islogin == false"></login>
    <div class="rottatec" v-if="islogin == true">
      <div class="left">
        <sidebar class="Noprint"></sidebar>
      </div>
      <div class="right">
        <loginbar class="Noprint"></loginbar>
        <router-view v-loading="loading" element-loading-text="正在为您加载"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Loginbar from '@/components/generalcomponent/loginbar'
  import Login from '@/components/generalcomponent/login'
  import Sidebar from '@/components/generalcomponent/sidebar'
  export default {
    name: 'app',
    beforeCreate () {
      // console.log(localStorage)
      this.$store.commit('changeIslogin')
    },
    data () {
      return {
      }
    },
    computed: {
      islogin () {
        return this.$store.state.islogin
      },
      loading () {
        return this.$store.state.loading
      }
    },
    methods: {
      forgetPassword () {
      },
      getStoken () {
      }
    },
    components: {
      Login,
      Sidebar,
      Loginbar
    }
  }
</script>
<!-- route: {
  data (transition) {
    this.$http.get('/api/test/test', {
      params: {
        keyword: this.keyWord,
        page: this.currentPage,
        pageSize: this.numberPerPage
      }
    }).then((response) => {
        transition.next({
          items: response.json().data.item.items,
          listNumber: response.json().data.item.totalNum
        })
    }, (response) => {
        // error
    })
  }
}, -->
<style>
*{margin: 0;padding: 0;}
body,html{font-size: 12px;font-family: "微软雅黑";}
.rottatec{display: flex;}
.left{flex: 0.15;background-color: #324157;}
.right{flex: 0.85;}
@media print {
  .Noprint { display: none }
  .PageNext{ page-break-after: always }
}
</style>
