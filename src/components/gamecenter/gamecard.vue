<template>
  <div class="cardlist">
    <el-row>
      <el-col v-for="(o, index) in gameInfo" :key="o" class="card">
          <div class="card-top">
            <img :src="o.gameImg" alt="游戏缩略图">
            <p class="p1">游戏名称: {{o.gameName}}</p>
            <p class="p2">游戏简介: {{o.gameRecommend}}</p>
          </div>
          <div class="card-bottom">
            <span>
                <span class="statu1" v-if="o.gameStatus === '0'">&bull;</span>
                <span class="statu2" v-if="o.gameStatus === '01'">&bull;</span>
                <span class="statu3" v-if="o.gameStatus === '000'">&bull;</span>
                <span class="statu4" v-if="o.gameStatus === '0000'">&bull;</span>
                <span class="subscribe1" v-if="o.gameStatus === '0'">{{getStatus(o.gameStatus)}}</span>
                <span class="subscribe2" v-if="o.gameStatus === '01'">{{getStatus(o.gameStatus)}}</span> 
                <span class="subscribe3" v-if="o.gameStatus === '000'">{{getStatus(o.gameStatus)}}</span> 
                <span class="subscribe4" v-if="o.gameStatus === '0000'">{{getStatus(o.gameStatus)}}</span> 
                <span class="time">{{o.createAt}}</span>
            </span>
            <el-dropdown trigger="click" class="moreIcon">
              <span class="el-dropdown-link"><i class="el-icon-more"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>下线</el-dropdown-item>
                  <el-dropdown-item>维护</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="click" class="editIcon">
              <span class="el-dropdown-link"><i class="el-icon-edit"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>编辑</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default{
  name: 'gamecard',
  beforeCreate () {
    this.$store.commit('startLoading') // 开启loading
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'gamelist'
    })
    // console.log(this.$store.state.token)
  },
  created () {
    this.$store.dispatch('getGamelist')
  },
  computed: {
    gameInfo () {
      return this.$store.state.gamelist
    }
  },
  data () {
    return {
      // gameInfo: [
      //   {
      //     gameName: '推筒子',
      //     gameRecommend: '这是游戏简介balabalbalbalbalbalbalbala~',
      //     gameImg: '',
      //     gameStatus: '0', // 在线0 离线01 维护000 故障0000
      //     createAt: '',
      //     gameType: '1' // 游戏类型 0电子游戏 1棋牌游戏 2真人视讯
      //   }, {
      //     gameName: '推锅',
      //     gameRecommend: '这是游戏简介balabalbalbalbalbalbalbala~',
      //     gameImg: '',
      //     gameStatus: '01', // 在线0 离线01 维护000 故障0000
      //     createAt: '',
      //     gameType: '1' // 游戏类型 0电子游戏 1棋牌游戏 2真人视讯
      //   }, {
      //     gameName: '国际象棋',
      //     gameRecommend: '这是游戏简介balabalbalbalbalbalbalbala~',
      //     gameImg: '',
      //     gameStatus: '0000', // 在线0 离线01 维护000 故障0000
      //     createAt: '',
      //     gameType: '1' // 游戏类型 0电子游戏 1棋牌游戏 2真人视讯
      //   }, {
      //     gameName: '百家乐',
      //     gameRecommend: '这是游戏简介balabalbalbalbalbalbalbala~',
      //     gameImg: '',
      //     gameStatus: '000', // 在线0 离线01 维护000 故障0000
      //     createAt: '',
      //     gameType: '2' // 游戏类型 0电子游戏 1棋牌游戏 2真人视讯
      //   }, {
      //     gameName: '真人梭哈',
      //     gameRecommend: '这是游戏简介balabalbalbalbalbalbalbala~',
      //     gameImg: '',
      //     gameStatus: '000', // 在线0 离线01 维护000 故障0000
      //     createAt: '',
      //     gameType: '2' // 游戏类型 0电子游戏 1棋牌游戏 2真人视讯
      //   }, {
      //     gameName: '四川麻将',
      //     gameRecommend: '这是游戏简介balabalbalbalbalbalbalbala~',
      //     gameImg: '',
      //     gameStatus: '0', // 在线0 离线01 维护000 故障0000
      //     createAt: '',
      //     gameType: '0' // 游戏类型 0电子游戏 1棋牌游戏 2真人视讯
      //   }, {
      //     gameName: '斗地主',
      //     gameRecommend: '这是游戏简介balabalbalbalbalbalbalbala~',
      //     gameImg: '',
      //     gameStatus: '0000', // 在线0 离线01 维护000 故障0000
      //     createAt: '',
      //     gameType: '0' // 游戏类型 0电子游戏 1棋牌游戏 2真人视讯
      //   }
      // ]
    }
  },
  methods: {
    getStatus (row) {
      var backStatus = ''
      if (row === '0') {
        backStatus = '在线'
      } else if (row === '01') {
        backStatus = '离线'
      } else if (row === '000') {
        backStatus = '维护'
      } else if (row === '0000') {
        backStatus = '故障'
      }
      return backStatus
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{display: inline-block;width: 31%;margin-left: 1rem;margin-top: 1rem;padding: 0;border:1px solid #919191;border-radius: 0.4rem;padding:1rem}
.card-top{border-bottom: 1px solid #bfbfbf;}
.card-top:after{clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.card-top img{display: inline-block;width: 30%;height: 8rem;float: left;margin-bottom: 1rem}
.card-top p{float: left;width: 50%;margin-left: 1.5rem}
.card-top .p1{font-size: 1.4rem}
.card-top .p2{font-size: 1.1rem;margin-top: 0.5rem;color: #919191}

.card-bottom{padding-top: 1rem;padding-bottom: 0.5rem}

.moreIcon{float: right;}
.editIcon{float: right;margin-right: 1rem}
i{color: gray;float: right;font-size: 1.2rem;margin-top: 0.75rem}

.statu1{color: #0ECA5B;font-size: 1.8rem;vertical-align: -0.1rem;} /*在线状态*/
.statu2{color: #919191;font-size: 1.8rem;vertical-align: -0.1rem;} /*离线状态*/
.statu3{color: #ffbf00;font-size: 1.8rem;vertical-align: -0.1rem;} /*维护状态*/
.statu4{color: red;font-size: 1.8rem;vertical-align: -0.1rem;} /*故障状态*/

.subscribe1{color: #0ECA5B;font-size: 1.25rem}
.subscribe2{color: #919191;font-size: 1.25rem}
.subscribe3{color: #ffbf00;font-size: 1.25rem}
.subscribe4{color: red;font-size: 1.25rem}

.time{font-size: 1.1rem;color: #919191;vertical-align: -0.1rem}
</style>
