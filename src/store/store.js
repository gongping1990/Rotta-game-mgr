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
const CREATEMERCHANT = 'createMerchant' // 创建一般商户
const RANDOMPASSWORD = 'randomPassword' // 随机生成密码
const RANDOMMSN = 'randomMsn' // 随机生成线路号
const SUCOUTREGIST = 'sucOutregist' // 出口代理商成功注册返回数据
const SUCCOMREGIST = 'sucComregist' // 一般商户成功注册返回数据
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
/* 财务信息数据 */
const PROPERTY = 'property' // 账户余额
const WATERFALL = 'waterfall' // 账户流水
/* 管理员信息 */
const ADMININFO = 'adminInfo' // 管理员信息
const ADMINLIST = 'adminList' // 管理员列表
/* 商户号列表 */
const MSNLIST = 'msnList' // 线路号列表
const COPYMSNLIST = 'copymsnList' // 线路号列表备份
const SEARCHMSN = 'searchMSN' // 搜索的线路号
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
const state = {
  [ISAPI]: {
    createAdmin: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/admins',
      method: 'post'
    }, // 创建管理员账号 admins
    adminCenter: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/admin_center',
      method: 'get'
    }, // 商户个人中心
    createUser: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/users',
      method: 'post'
    }, // 创建线路商与一般商户 users
    randomPassword: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/random_password',
      method: 'post'
    }, // 随机生成密码 random_password
    randomCaptcha: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/captcha',
      method: 'post'
    }, // 生成验证码 captcha
    login: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/users/auth',
      method: 'post'
    }, // 管理员/商户/线路商登陆 users/auth
    managers: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/managers',
      method: 'get'
    }, // 线路商查询与修改 managers / managers/userID
    merchants: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/merchants',
      method: 'get'
    }, // 一般商户查询与修改 merchants / merchants/userID
    userStatus: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/userChangeStatus',
      method: 'post'
    }, // 变更用户状态 userChangeStatus
    checkMSN: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/check_msn',
      method: 'get'
    }, // 检查线路号是否可用 // check_msn/{msn}
    msnLock: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/lockmsn',
      method: 'get'
    }, // 锁定解锁线路号 lockmsn/{msn}/{status}
    msnList: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/msnList',
      method: 'post'
    }, // 获取线路号列表 msnList
    randomMSN: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/msnRandom',
      method: 'get'
    }, // 获取随机线路号 msnRandom
    parentList: {
      url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/avalible_managers',
      method: 'get'
    }, // 获取可用上级线路商/直属列表 avalible_managers
    addGame: {
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/games',
      method: 'post'
    }, // 新增游戏 games
    gameList: {
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/gameList',
      method: 'post'
    }, // 获取游戏列表 games/{type}
    billTransfer: {
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/billTransfer',
      method: 'post'
    }, // 存点取点
    bills: {
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/bills',
      method: 'get'
    }, // 查询某用户点数余额 bills/{userID}
    waterFall: {
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/waterfall',
      method: 'get'
    }, // 查询某用户账单流水 waterfall/{userID}
    loginList: {
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/logList',
      method: 'post'
    }, // 登录日志
    addCompanyNew: {
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/companyNew',
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
  [RANDOMPASSWORD]: '',
  [RANDOMMSN]: '',
  [GAMELIST]: [],
  [ADMININFO]: [],
  [ADMINLIST]: [],
  [MSNLIST]: [],
  [COPYMSNLIST]: [],
  [SEARCHMSN]: '',
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
  [PROPERTY]: '',
  [WATERFALL]: [],
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
  [CREATEMERCHANT]: {
    role: '100',
    displayName: '', // 商户昵称
    rate: '', // 商户抽成比
    merchantEmail: '', // 商户邮箱
    hostName: '', // 负责人
    hostContact: '', // 负责人联系方式
    parent: '', // 所属代理商
    remark: '', // 备注
    contractPeriod: [], // 生效时间
    isforever: false, // 是否永久有效
    points: '', // 初始代理点数
    msn: '', // 线路号
    gameList: [], // 拥有游戏
    loginWhiteList: '', // 商户白名单
    frontURL: '', // 商户前端域名
    username: '', // 代理商管理员用户名
    password: '', // 代理商管理员密码
    adminName: '', // 代理商管理员姓名
    adminEmail: '', // 代理商管邮箱
    adminContact: '' // 代理商管理员联系方式
  }, // 创建一般商户基本信息
  [SUCOUTREGIST]: [], // 出口代理商成功注册返回数据
  [SUCCOMREGIST]: [], // 一般商户成功注册返回数据
  [GAME_DETAIL_INFO]: [], // 游戏商运营数据
  [GAME_READY_DETAIL_INFO]: [], // 游戏运营数据
  [OPERATOR_SUCCESS_INFO]: [], // 游戏运营商创建成功后返回数据
  [GAME_SUCCESS_INFO]: [], // 游戏创建成功后返回数据
  [GET_SEARCH_OPERATOR]: [], // 获取游戏商搜索
  [GET_SEARCH_GAME]: [], // 获取游戏搜索
  [OPERATOR_LIST]: [] // 获取游戏搜索
} // 定义所有初始状态
const actions = {
  getParent (context) {
    invoke({
      url: api.parentList.url,
      method: api.parentList.method
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var parent = ret.data.payload
          // console.log('上级是:', parent)
          context.commit({
            type: 'getParentData',
            data: parent
          })
        }
      }
    ) // 获取所属代理商
  },
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
        gameType: '0,1,2'
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
          context.commit('closeLoading')
        }
      }
    )
  },
  randomPassword (context) {
    invoke({
      url: api.randomPassword.url,
      method: api.randomPassword.method
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var random = ret.data.payload.generatedPassword
          console.log('随机生成的密码是: ', random)
          context.commit({
            type: 'getRandom',
            data: random
          })
        }
      }
    )
  }, // 随机生成密码
  randomMSN (context) {
    invoke({
      url: api.randomMSN.url,
      method: api.randomMSN.method
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var random = ret.data.payload
          console.log('随机生成的线路号是: ', random)
          context.commit({
            type: 'getRandomMSN',
            data: random
          })
        }
      }
    )
  }, // 随机生成线路号
  getProperty (context) {
    var userID = ''
    if (state[[SEARCHID]] === '') {
      userID = localStorage.userID
    } else {
      userID = state[[SEARCHID]]
    }
    invoke({
      url: api.bills.url + '/' + userID,
      method: api.bills.method
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var myproperty = ret.data.payload.balance
          console.log('该账户余额为:', myproperty)
          context.commit({
            type: 'setProperty',
            data: myproperty
          })
        }
      }
    )
  }, // 获取账户ID
  getWaterfall (context) {
    var userID = ''
    if (state[[SEARCHID]] === '') {
      userID = localStorage.userID
    } else {
      userID = state[[SEARCHID]]
    }
    invoke({
      url: api.waterFall.url + '/' + userID,
      method: api.waterFall.method
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var waterfall = ret.data.payload
          console.log('账户流水为:', waterfall)
          context.commit({
            type: 'setWaterfall',
            data: waterfall
          })
        }
      }
    )
  }, // 获取账户流水
  getAdmincenter (context) {
    invoke({
      url: api.adminCenter.url,
      method: api.adminCenter.method
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var adminInfo = ret.data.payload
          console.log('管理员信息是: ', adminInfo)
          context.commit({
            type: 'getadminInfo',
            data: adminInfo
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 管理员个人信息
  getAdminlist (context) {
    invoke({
      url: api.createAdmin.url,
      method: 'get'
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var list = ret.data.payload
          console.log('管理员信息是: ', list)
          context.commit({
            type: 'getadminList',
            data: list
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 管理员列表
  getMsnList (context) {
    invoke({
      url: api.msnList.url,
      method: api.msnList.method
    }).then(
      result => {
        const [err, ret] = result
        if (err) {
        } else {
          var sortList = ret.data.payload.Items
          sortList = sortList.sort(function compared (msn1, msn2) {
            var value1 = parseInt(msn1.msn)
            var value2 = parseInt(msn2.msn)
            if (value1 < value2) {
              return -1
            } else if (value1 > value2) {
              return 1
            } else {
              return 0
            }
          })
          // var list = ret.data.payload.Items
          console.log('商户号列表数据是: ', sortList)
          context.commit({
            type: 'setMsnlist',
            data: sortList
          })
          context.commit('closeLoading')
        }
      }
    )
  }, // 线路号列表
  managerLoginList (context) {
    var checklogin = {
      role: '10',
      pageSize: '20',
      startKey: null
    }
    invoke({
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/logList',
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
      url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/logList',
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
  getParentData (state, payload) {
    state[[FORMPARENT]] = payload.data
  }, // 获取商户上级
  changeindex (state, payload) {
    state[[NOWINDEX]] = payload.data
  }, // 调试路由与导航
  changenowoutActive (state, payload) {
    state[[NOWOUTACTIVE]] = 2
  }, // 游戏运营商步骤条
  changenowcomActive (state, payload) {
    state[[NOWCOMACTIVE]] = 2
  }, // 游戏列表步骤条
  getadminInfo (state, payload) {
    state[[ADMININFO]] = payload.data
  }, // 获取管理员信息
  getadminList (state, payload) {
    state[[ADMINLIST]] = payload.data
  }, // 获取管理员列表
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
  getOutsucRegist (state, payload) {
    state[[SUCOUTREGIST]] = payload.data
    // console.log('创建代理商成功后的返回数据是: ', state[[SUCOUTREGIST]])
  }, // 获取成功创建代理商后返回信息
  getComsucRegist (state, payload) {
    state[[SUCCOMREGIST]] = payload.data
    // console.log('创建一般商户成功后的返回数据是: ', state[[SUCCOMREGIST]])
  }, // 获取成功创建一般商户后返回信息
  /* 出口代理商搜索,排序,分页 */
  getOperatorData (state, payload) {
    state[[OPERATOR_LIST]] = payload.data
    console.log(state[[OPERATOR_LIST]], '游戏商的数据')
  }, // 初始化游戏商数据
  getComlistData (state, payload) {
    state[[COMLISTDATA]] = payload.data
    // for (var i = 0; i < payload.data.length; i++) {
    //   state[[COMLISTDATA]][i].contractPeriod = state[[COMLISTDATA]][i].contractPeriod[0].slice(0, 10) + ' 至 ' + state[[COMLISTDATA]][i].contractPeriod[1].slice(0, 10)
    // }
    state[[COMLISTSEARCH]] = state[[COMLISTDATA]]
  }, // 初始化一般商户数据
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
    if (state[[GET_SEARCH_OPERATOR]].companyContactWay !== '') {
      state[[OUTLISTSEARCH]].Items = state[[OUTLISTSEARCH]].Items.filter(item => {
        return item.companyContactWay === state[[GET_SEARCH_OPERATOR]].companyContactWay
      })
    } else if (state[[GET_SEARCH_OPERATOR]].companyName !== '') {
      state[[OUTLISTSEARCH]].Items = state[[OUTLISTSEARCH]].Items.filter(item => {
        return item.companyName === state[[GET_SEARCH_OPERATOR]].companyName
      })
    } else if (state[[GET_SEARCH_OPERATOR]].companyEmail !== '') {
      state[[OUTLISTSEARCH]].Items = state[[OUTLISTSEARCH]].Items.filter(item => {
        return item.companyEmail === state[[GET_SEARCH_OPERATOR]].companyEmail
      })
    } else if (state[[GET_SEARCH_OPERATOR]].createAt) {
      state[[OUTLISTSEARCH]].Items = state[[OUTLISTSEARCH]].Items.filter(item => {
        var now = dateformat(new Date(parseFloat(item.createdAt)), 'isoDate')
        return now === dateformat(new Date(parseFloat(state[[GET_SEARCH_OPERATOR]].createAt)), 'isoDate')
      })
    }
    // console.log('返回符合搜索条件的数据:', state[[OUTLISTSEARCH]])
  }, // 搜索游戏商数据
  gamelistSearch (state, payload) {
    if (state[[GET_SEARCH_GAME]].gameName !== '') {
      state[[GAMELIST]] = state[[GAMELIST]].filter(item => {
        return item.gameName === state[[GET_SEARCH_GAME]].gameName
      })
    } else if (state[[GET_SEARCH_GAME]].company !== '') {
      state[[GAMELIST]] = state[[GAMELIST]].filter(item => {
        return item.company === state[[GET_SEARCH_GAME]].company
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
  setMsnlist (state, payload) {
    state[[MSNLIST]] = payload.data
    state[[COPYMSNLIST]] = payload.data
  }, // 获取线路号列表
  getSearchMSN (state, payload) {
    state[[SEARCHMSN]] = payload.data
    // console.log('获取到的搜索线路号为', state[[SEARCHMSN]])
  }, // 获取搜索的MSN
  resetMSNlist (state, payload) {
    state[[MSNLIST]] = state[[COPYMSNLIST]]
  }, // 重置搜索,返回原数据
  msnSearch (state, payload) {
    state[[MSNLIST]] = state[[COPYMSNLIST]]
    if (state[[SEARCHMSN]] !== '' || state[[SEARCHMSN]] !== undefined) {
      state[[MSNLIST]] = state[[MSNLIST]].filter(item => {
        return item.msn.toString() === state[[SEARCHMSN]].toString()
      })
    }
  }, // 返回线路号搜索结果
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
