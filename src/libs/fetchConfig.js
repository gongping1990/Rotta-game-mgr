// export const ZEUS_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const DIANA_GATEWAY = 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const JAVIS_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const HERA_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
export const api = {
  randomCaptcha: {
    url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/captcha',
    method: 'post'
  }, // 生成验证码 captcha
  login: {
    url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/users/auth',
    method: 'post'
  }, // 管理员/商户/线路商登陆 users/auth
  managers: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/companyList',
    method: 'post'
  }, // 线路商查询与修改 managers / managers/userID
  addGame: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/games',
    method: 'post'
  }, // 新增游戏 games
  gameList: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/gameList',
    method: 'post'
  }, // 获取游戏列表 games/{type}
  companyOne: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/companyOne',
    method: 'get'
  }, // 查询单个运营商 {companyName}/{companyId}
  gameOne: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/gameOne',
    method: 'get'
  }, // 查询单个游戏 {type}/{gameId}
  addCompanyNew: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/companyNew',
    method: 'post'
  }, // 新增运营商
  propList: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/toolList',
    method: 'post'
  }, // 查看道具列表
  changeState: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/toolChangeStatus',
    method: 'post'
  }, // 修改道具状态
  addProp: {
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/toolNew',
    method: 'post'
  } // 新增道具
}
