import Vue from 'vue'
import Vuex from 'vuex'
import { invoke } from '@/libs/fetchLib'
import { api } from '@/libs/fetchConfig'
import dateformat from 'dateformat'
Vue.use(Vuex) // 全局注册
const ISAPI = 'isapi' // 所有API
const LOADING = 'loading' // loading画面
const ISLOGIN = 'islogin' // 登录状态
const LOGININFO = 'loginInfo' // 登录信息
const BACKLOGINFO = 'backloginfo' // 登陆成功后返回的信息
const TOKEN = 'token' // 登陆token
const FORMPARENT = 'formparent' // 所属代理商
const OUTLISTDATA = 'outListData' // 游戏商数据列表
const COMLISTDATA = 'comListData' // 一般代理商原始据
const NOWINDEX = 'nowindex' // 路由跳转
const NOWOUTACTIVE = 'nowoutactive' // 创建出口代理商步骤条
const NOWCOMACTIVE = 'nowcomactive' // 创建出口代理商步骤条
const SEARCHID = 'searchID' // 搜索详细数据的用户ID
const OUTDETAIL = 'outdetail' // 出口代理商详细数据
const COMDETAIL = 'comdetail' // 一般商户详细数据
const ISEDIT = 'isEdit' // 是否启用编辑
const GAMELIST = 'gamelist' // 游戏列表数据
/* 筛选分页数据 */
const NOWSEARCHINDEX = 'nowsearchindex' // 当前所在页面
const NOWARRAY = 'nowarray' // 当前打开数组
const SEARCHCONDITION = 'searchcondition' // 搜索条件
const OUTLISTSEARCH = 'outlistSearch' // 处理代理商列表
const COMLISTSEARCH = 'gamelistSearch' // 处理游戏列表
/* 管理员信息 */
const ADMININFO = 'adminInfo' // 管理员信息
const ADMINLIST = 'adminList' // 管理员列表
/**/
const MANAGERLOGINLIST = 'managerloginList' // 线路商登陆日志
const MERCHANTLOGINLIST = 'merchantloginList' // 一般商户登陆日志
const GAME_DETAIL_INFO = 'gameDetailInfo' // 游戏运营商详细数据
const GAME_READY_DETAIL_INFO = 'gameReadyDetailInfo' // 游戏详细数据
const OPERATOR_SUCCESS_INFO = 'getSuccessOperator' // 游戏运营成功后商详细数据
const GAME_SUCCESS_INFO = 'getSuccessGame' // 游戏成功后详细数据
const GET_SEARCH_OPERATOR = 'getSearchOperator' // 获取游戏商搜索条件
const GET_SEARCH_GAME = 'getSearchGame' // 获取游戏的搜索条件
const OPERATOR_LIST = 'operatorList' // 游戏商列表数据
const PLAYER_DETAIL = 'playDetail'// 玩家详细数据
const SEARCH_OLD = 'searchOld'// 存储搜索信息
const state = {
  [ISAPI]: {
    randomCaptcha: {
      url: 'https://eygelvmhnh.execute-api.ap-southeast-1.amazonaws.com/dev/captcha',
      method: 'post'
    }, // 生成验证码 captcha
    login: {
      url: 'https://eygelvmhnh.execute-api.ap-southeast-1.amazonaws.com/dev/users/auth',
      method: 'post'
    }, // 管理员/商户/线路商登陆 users/auth
    managers: {
      url: 'https://eygelvmhnh.execute-api.ap-southeast-1.amazonaws.com/dev/managers',
      method: 'get'
    }, // 线路商查询与修改 managers / managers/userID
    merchants: {
      url: 'https://eygelvmhnh.execute-api.ap-southeast-1.amazonaws.com/dev/merchants',
      method: 'get'
    }, // 一般商户查询与修改 merchants / merchants/userID
    addGame: {
      url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/games',
      method: 'post'
    }, // 新增游戏 games
    gameList: {
      url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/gameList',
      method: 'post'
    }, // 获取游戏列表 games/{type}
    addCompanyNew: {
      url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/companyNew',
      method: 'post'
    }
  }, // API
  [LOADING]: false,
  [ISLOGIN]: false,
  [TOKEN]: '',
  [BACKLOGINFO]: [],
  [LOGININFO]: {
    role: '1', // 角色类别
    username: '', // 用户名
    password: '', // 密码
    captcha: '' // 验证码
  }, // 用户登录信息
  [FORMPARENT]: [],
  [GAMELIST]: [],
  [ADMININFO]: [],
  [ADMINLIST]: [],
  /* 所在页面 */
  [NOWSEARCHINDEX]: '',
  [NOWARRAY]: [1, 2],
  [MANAGERLOGINLIST]: [],
  [MERCHANTLOGINLIST]: [],
  /* 原始数据 */
  [OUTLISTDATA]: [],
  [COMLISTDATA]: [],
  /* 详细数据 */
  [OUTDETAIL]: {},
  [COMDETAIL]: {},
  [ISEDIT]: false,
  /* 搜索条件 */
  [SEARCHCONDITION]: {
    companyContactWay: '', // 联系方式
    companyName: '', // 运营商名称
    companyEmail: '', // 按邮箱搜索
    createAt: [] // 按创建时间搜索
  },
  /* 处理后数据 */
  [OUTLISTSEARCH]: [],
  [COMLISTSEARCH]: [],
  /**/
  [SEARCHID]: '', // 用户ID
  /**/
  [NOWOUTACTIVE]: 0,
  [NOWCOMACTIVE]: 0,
  [NOWINDEX]: 'board',
  [GAME_DETAIL_INFO]: [], // 游戏商运营数据
  [GAME_READY_DETAIL_INFO]: [], // 游戏运营数据
  [OPERATOR_SUCCESS_INFO]: [], // 游戏运营商创建成功后返回数据
  [GAME_SUCCESS_INFO]: [], // 游戏创建成功后返回数据
  [GET_SEARCH_OPERATOR]: [], // 获取游戏商搜索
  [GET_SEARCH_GAME]: [], // 获取游戏搜索
  [OPERATOR_LIST]: [], // 获取游戏搜索
  [PLAYER_DETAIL]: [], // 玩家详细
  [SEARCH_OLD]: [] // 搜索存储
} // 定义所有初始状态
const actions = {
  getOperatorList (context) {
    invoke({
      url: api.managers.url,
      method: api.managers.method,
      data: {}
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          context.commit('closeLoading')
        } else {
          context.commit({
            type: 'searchOld',
            data: ret.data.payload.Items
          })
          context.commit({
            type: 'getOperatorData',
            data: ret.data.payload.Items
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 获取游戏商列表
  getchangeoutActive (context) {
    context.commit({
      type: 'changenowoutActive',
      data: 'nowoutactive'
    })
  }, // 游戏运营商
  getchangecomActive (context) {
    context.commit({
      type: 'changenowcomActive',
      data: 'nowcomactive'
    })
  }, // 游戏列表
  getCreateAllData (context) {
    context.commit({
      type: 'recordCreateout',
      data: 'createManager'
    })
  },
  getGamelist (context) {
    invoke({
      url: api.gameList.url,
      method: api.gameList.method,
      data: {
        gameType: null
      }
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
          context.commit('closeLoading')
        } else {
          var gameList = ret.data.payload
          console.log('游戏列表数据是:', gameList)
          context.commit({
            type: 'getallGamelist',
            data: gameList
          })
          context.commit({
            type: 'searchOld',
            data: gameList
          })
          context.commit('closeLoading')
        }
      }
    )
  },
  managerLoginList (context) {
    var checklogin = {
      role: '10',
      pageSize: '20',
      startKey: null
    }
    invoke({
      url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/logList',
      method: api.loginList.method,
      data: checklogin
    }).then(
      result => {
        const [res, ret] = result
        if (res) {
        } else {
          var list = ret.data.payload.Items
          console.log('线路商登陆日志是', list)
          context.commit({
            type: 'setManagerlogin',
            data: list
          })
        }
        context.commit('closeLoading')
      }
    )
  },
  merchantLoginList (context) {
    var checklogin = {
      role: '100',
      pageSize: '20',
      startKey: null
    }
    invoke({
      url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/logList',
      method: api.loginList.method,
      data: checklogin
    }).then(
      result => {
        const [res, ret] = result
        if (res) {
        } else {
          var list = ret.data.payload.Items
          console.log('线路商登陆日志是', list)
          context.commit({
            type: 'setMerchantlogin',
            data: list
          })
        }
        context.commit('closeLoading')
      }
    )
  }
} // 异步调用,commit分发事件
const mutations = {
  startLoading (state, payload) {
    state[[LOADING]] = true
  }, // 启动Loading
  closeLoading (state, payload) {
    state[[LOADING]] = false
  }, // 关闭Loading
  startEdit (state, payload) {
    state[[ISEDIT]] = true
  }, // 启用编辑
  closeEdit (state, payload) {
    state[[ISEDIT]] = false
  }, // 禁用编辑
  returnToken (state, payload) {
    state[[COMDETAIL]].username = localStorage.comdetailUsername
    state[[COMDETAIL]].role = localStorage.comdetailRole
    state[[OUTDETAIL]].username = localStorage.outdetailUsername
    state[[OUTDETAIL]].role = localStorage.outdetailRole
    state[[BACKLOGINFO]].username = localStorage.username
    state[[NOWSEARCHINDEX]] = localStorage.nowindex
    state[[TOKEN]] = payload.data
    // console.log('token:', state[[TOKEN]])
  }, // 刷新页面保存token
  getLogin (state, payload) {
    state[[LOGININFO]] = {
      ...state[[LOGININFO]],
      ...payload.data
    }
  }, // 获取登陆信息
  getBacklogin (state, payload) {
    state[[BACKLOGINFO]] = payload.data
    state[[TOKEN]] = state[[BACKLOGINFO]].token
    localStorage.setItem('token', state[[TOKEN]])
    localStorage.setItem('loginId', payload.data.userId)
    localStorage.setItem('loginRole', payload.data.role)
    localStorage.setItem('username', state[[BACKLOGINFO]].username)
    // console.log('未刷新页面时:', state[[TOKEN]])
    // console.log(localStorage)
  }, // 获取登陆成功后的返回信息
  changeIslogin (state, payload) {
    if (!localStorage.token) {
      state[[ISLOGIN]] = false
    } else {
      state[[ISLOGIN]] = true
    }
  }, // 改变登录状态
  getNowSearchIndex (state, payload) {
    state[[NOWSEARCHINDEX]] = payload.data
    localStorage.setItem('nowindex', state[[NOWSEARCHINDEX]])
    console.log('当前所在页面为', state[[NOWSEARCHINDEX]])
  }, // 获取当前所在页面
  getnowindex (state, payload) {
    if (state[[NOWSEARCHINDEX]] === '') {
      state[[NOWSEARCHINDEX]] = localStorage.nowindex
    }
  },  // 刷新页面默认打开菜单
  changeindex (state, payload) {
    state[[NOWINDEX]] = payload.data
  }, // 调试路由与导航
  changenowoutActive (state, payload) {
    state[[NOWOUTACTIVE]] = 2
  }, // 游戏运营商步骤条
  changenowcomActive (state, payload) {
    state[[NOWCOMACTIVE]] = 2
  }, // 游戏列表步骤条
  getSearchID (state, payload) {
    console.log(payload, 'payload')
    state[[SEARCHID]] = payload.data
    localStorage.setItem('companyId', state[[SEARCHID]])
    console.log('获取到的搜索用户的ID为:', state[[SEARCHID]])
  }, // 获取ID
  resetSearchID (state, payload) {
    state[[SEARCHID]] = ''
  }, // 初始化搜索用户
  getOutdetail (state, payload) {
    state[[OUTDETAIL]] = payload.data
    localStorage.setItem('outdetailRole', state[[OUTDETAIL]].role)
    localStorage.setItem('outdetailUsername', state[[OUTDETAIL]].username)
    // state[[OUTDETAIL]].contractPeriod = state[[OUTDETAIL]].contractPeriod[0].slice(0, 10) + ' 至 ' + state[[OUTDETAIL]].contractPeriod[1].slice(0, 10)
    // state[[OUTDETAIL]].gameList = state[[OUTDETAIL]].gameList.join(' ')
    // console.log('返回的代理商详细数据是:', state[[OUTDETAIL]])
  }, // 获取代理商详细数据
  getComdetail (state, payload) {
    state[[COMDETAIL]] = payload.data
    localStorage.setItem('comdetailRole', state[[OUTDETAIL]].role)
    localStorage.setItem('comdetailUsername', state[[OUTDETAIL]].username)
    // state[[COMDETAIL]].contractPeriod = state[[COMDETAIL]].contractPeriod[0].slice(0, 10) + ' 至 ' + state[[COMDETAIL]].contractPeriod[1].slice(0, 10)
    // state[[COMDETAIL]].gameList = state[[COMDETAIL]].gameList.join(' ')
    // console.log('返回的一般商户详细数据是:', state[[COMDETAIL]])
  }, // 获取一般商户详细数据
  clearActive (state, payload) {
    if (payload.data === 'fromOut') {
      state[NOWOUTACTIVE] = 0
    } else if (payload.data === 'fromCom') {
      state[NOWCOMACTIVE] = 0
    }
  }, // 初始化创建步骤条步数
  /* 出口代理商搜索,排序,分页 */
  getOperatorData (state, payload) {
    state[[OPERATOR_LIST]] = payload.data
    console.log(state[[OPERATOR_LIST]], '游戏商的数据')
  }, // 初始化游戏商数据
  getallGamelist (state, payload) {
    state[[GAMELIST]] = payload.data
    // console.log('游戏列表的数据是:', state[[GAMELIST]])
  },
  gerSearchcondition (state, payload) {
    state[[GET_SEARCH_GAME]] = payload.data
    // console.log('当前搜索条件是', state[[GET_SEARCH_GAME]])
  }, // 获取游戏搜索条件
  gerSearchOperator (state, payload) {
    state[[GET_SEARCH_OPERATOR]] = payload.data
    // console.log('当前游戏商搜索条件是', state[[GET_SEARCH_OPERATOR]])
  }, // 获取游戏商搜索条件
  clearCondition (state, payload) {
    state[SEARCHCONDITION] = {
      companyContactWay: '', // 联系方式
      companyName: '', // 运营商名称
      companyEmail: '', // 按邮箱搜索
      createAt: [] // 按创建时间搜索
    }
  }, // 清空搜索条件
  outlistSearch (state) {
    state[[OPERATOR_LIST]] = state[[SEARCH_OLD]]
    if (state[[GET_SEARCH_OPERATOR]].companyContactWay !== '') {
      state[[OPERATOR_LIST]] = state[[OPERATOR_LIST]].filter(item => {
        return item.companyContactWay === state[[GET_SEARCH_OPERATOR]].companyContactWay
      })
    } else if (state[[GET_SEARCH_OPERATOR]].companyName !== '') {
      state[[OPERATOR_LIST]] = state[[OPERATOR_LIST]].filter(item => {
        return item.companyName === state[[GET_SEARCH_OPERATOR]].companyName
      })
    } else if (state[[GET_SEARCH_OPERATOR]].companyEmail !== '') {
      state[[OPERATOR_LIST]] = state[[OPERATOR_LIST]].filter(item => {
        return item.companyEmail === state[[GET_SEARCH_OPERATOR]].companyEmail
      })
    } else if (state[[GET_SEARCH_OPERATOR]].createAt) {
      state[[OPERATOR_LIST]] = state[[OPERATOR_LIST]].filter(item => {
        var now = dateformat(new Date(parseFloat(item.createdAt)), 'isoDate')
        return now === dateformat(new Date(parseFloat(state[[GET_SEARCH_OPERATOR]].createAt)), 'isoDate')
      })
    }
    // console.log('返回符合搜索条件的数据:', state[[OUTLISTSEARCH]])
  }, // 搜索游戏商数据
  gamelistSearch (state, payload) {
    state[[GAMELIST]] = state[[SEARCH_OLD]]
    if (state[[GET_SEARCH_GAME]].gameName !== '') {
      state[[GAMELIST]] = state[[GAMELIST]].filter(item => {
        return item.gameName === state[[GET_SEARCH_GAME]].gameName
      })
    } else if (state[[GET_SEARCH_GAME]].company !== '') {
      state[[GAMELIST]] = state[[GAMELIST]].filter(item => {
        return item.company.companyName === state[[GET_SEARCH_GAME]].company
      })
    } else if (state[[GET_SEARCH_GAME]].Email !== '') {
      state[[GAMELIST]] = state[[GAMELIST]].filter(item => {
        return item.merchantEmail === state[[GET_SEARCH_GAME]].Email
      })
    } else if (state[[GET_SEARCH_GAME]].createAt) {
      state[[GAMELIST]] = state[[GAMELIST]].filter(item => {
        var formatprev = dateformat(new Date(parseFloat(item.createdAt)), 'isoDate')
        return formatprev === dateformat(new Date(parseFloat(state[[GET_SEARCH_GAME]].createAt)), 'isoDate')
      })
    }
  }, // 搜索游戏数据
  gameDetailInfo (state, payload) {
    state[GAME_DETAIL_INFO] = payload.data
    // console.log(state, payload, '详细数据 游戏商')
  },
  gameReadyDetailInfo (state, payload) {
    state[GAME_READY_DETAIL_INFO] = payload.data
    // console.log(state, payload, '详细数据 游戏')
  },
  getSuccessOperator (state, payload) {
    state[OPERATOR_SUCCESS_INFO] = payload.data
    // console.log(state, payload, '成功注册后的数据')
  },
  getSuccessGame (state, payload) {
    state[GAME_SUCCESS_INFO] = payload.data
    console.log(state, payload, '游戏成功注册后的数据')
  },
  playerDetail (state, payload) {
    state[PLAYER_DETAIL] = payload.data
    console.log(state[PLAYER_DETAIL], '玩家详细')
  },
  searchOld (state, payload) {
    state[SEARCH_OLD] = payload.data
    console.log(state[SEARCH_OLD], '玩家详细')
  }
} // 同步调用,更改state
const getters = {
  backNowActive: state => {
    return state[[NOWOUTACTIVE]]
  }
} // 过滤器
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
// 用store容器中添加状态
// 用mutations更改状态
// 用actions来异步更改状态
// 用getters来获得部分状态
// 用modules来分块管理状态

// 在组件中通过dispatch容器中的actions
// 在actions中通过commit mutations来改变状态或者进行其他操作
