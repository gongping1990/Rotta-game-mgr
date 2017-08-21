// export const ZEUS_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const DIANA_GATEWAY = 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const JAVIS_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const HERA_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
export const api = {
  randomCaptcha: {
    url: 'https://eygelvmhnh.execute-api.ap-southeast-1.amazonaws.com/dev/captcha',
    method: 'post'
  }, // 生成验证码 captcha
  login: {
    url: 'https://eygelvmhnh.execute-api.ap-southeast-1.amazonaws.com/dev/users/auth',
    method: 'post'
  }, // 管理员/商户/线路商登陆 users/auth
  managers: {
    url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/companyList',
    method: 'post'
  }, // 线路商查询与修改 managers / managers/userID
  addGame: {
    url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/games',
    method: 'post'
  }, // 新增游戏 games
  gameList: {
    url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/gameList',
    method: 'post'
  }, // 获取游戏列表 games/{type}
  companyOne: {
    url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/companyOne',
    method: 'get'
  }, // 查询单个运营商 {companyName}/{companyId}
  gameOne: {
    url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/gameOne',
    method: 'get'
  }, // 查询单个游戏 {type}/{gameId}
  addCompanyNew: {
    url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/companyNew',
    method: 'post'
  }, // 新增运营商
  propList: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/toolList',
    method: 'post'
  }, // 查看道具列表
  changeState: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/toolChangeStatus',
    method: 'post'
  }, // 修改道具状态
  addProp: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/toolNew',
    method: 'post'
  }, // 新增道具
  delProp: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/toolDelete',
    method: 'post'
  }, // 删除道具
  updateProp: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/toolUpdate',
    method: 'post'
  }, // 修改道具
  getGameType: {
    url: 'https://wzhe3pql3g.execute-api.ap-southeast-1.amazonaws.com/dev/gameType',
    method: 'post'
  }, // 获取游戏类型
  getSign: {
    url: 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev/game/sign',
    method: 'post'
  }, // 获取签名
  getUploadImgToken: {
    url: 'https://kg9d5ac655.execute-api.ap-southeast-1.amazonaws.com/dev/upToken',
    method: 'post'
  }, // 上传图片获取七牛云的
  addPackage: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/packageNew',
    method: 'post'
  }, // 新增礼包
  packageList: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/packageList',
    method: 'post'
  }, // 礼包列表
  changePackageStatus: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/packageChangeStatus',
    method: 'post'
  }, // 变更礼包状态
  packageUpdate: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/packageUpdate',
    method: 'post'
  }, // 修改礼包
  packageDelete: {
    url: 'https://zptn04bpq6.execute-api.ap-southeast-1.amazonaws.com/dev/packageDelete',
    method: 'post'
  } // 删除礼包
}
