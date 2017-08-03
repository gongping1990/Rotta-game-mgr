import Vue from 'vue'
import Router from 'vue-router'
import Board from 'view/board/board' // 看板页面
import operatorList from 'view/operator/operatorList' // 游戏运营商列表
import addOperator from 'view/operator/addOperator' // 创建游戏运营商
import operatorDetail from 'view/operator/operatorDetail' // 游戏运营商详细
import gameList from 'view/game/gameList' // 游戏列表
import addGame from 'view/game/addGame' // 创建游戏
import gameDetail from 'view/game/gameDetailed' // 游戏详细
import propList from 'view/prop/propList' // 道具中心
// 异常页面
import Createerror from 'view/error/createerror' // 创建异常页面
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/board'
    },
    {
      path: '/board',
      component: Board
    },
    {
      path: '/createerror',
      component: Createerror
    },
    {
      path: '/operatorList',
      component: operatorList
    },
    {
      path: '/addOperator',
      component: addOperator
    },
    {
      path: '/operatordetail',
      component: operatorDetail
    },
    {
      path: '/addGame',
      component: addGame
    },
    {
      path: '/gameList',
      component: gameList
    },
    {
      path: '/gamedetail',
      component: gameDetail
    },
    {
      path: '/propList',
      component: propList
    }
  ]
})
