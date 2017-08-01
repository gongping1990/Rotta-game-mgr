<template>
  <div class="gametab">
  	<div class="tabcard">
  	  <div class="tabcard-left">
  	  	<el-button class="myBtn1">全部游戏</el-button>
  	  	<el-button class="myBtn">棋牌游戏</el-button>
  	  	<el-button class="myBtn">电子游戏</el-button>
  	  	<el-button class="myBtn">真人视讯</el-button>
  	  </div>
  	  <div class="tabcard-right">
  	  	<el-input placeholder="请输入关键词" class="input"></el-input>
  	  	<el-button class="gamesearch" type="primary">搜索</el-button>
  	  </div>
  	</div>
  	<p class="backinfocount">共搜索到 {{searchCount}} 条数据</p>
  	<div class="card">
  		<gamecard></gamecard>
  	</div>
  </div>
</template>

<script>
import Gamecard from '@/components/gamecenter/gamecard'
export default{
  name: 'gametab',
  components: {
    Gamecard
  },
  computed: {
    searchCount () {
      return this.$store.state.gamelist.Count
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gametab{background-color: #f5f5f5;padding: 2rem}
/*tab选项卡组件*/
.myBtn1{border-radius: 0}
.myBtn{margin-left: -0.4rem;border-radius: 0}
.input{width: 18rem;}
.tabcard:after{clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}
.tabcard-left{float: left;}
.tabcard-right{float: right;}
/**/
.backinfocount{margin-top: 2rem}
</style>
