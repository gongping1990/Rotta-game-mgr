// export const ZEUS_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const DIANA_GATEWAY = 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const JAVIS_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
// export const HERA_GATEWAY = 'https://viwko4gvx0.execute-api.ap-southeast-1.amazonaws.com/dev'
export const api = {
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
    url: 'https://e73xksjd1k.execute-api.ap-southeast-1.amazonaws.com/dev/companyList',
    method: 'post'
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
  }
}
