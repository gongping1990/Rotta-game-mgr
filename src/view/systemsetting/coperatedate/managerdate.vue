<template>
  <div class="managerdate">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
        <el-breadcrumb-item>操作日志 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">管理员操作日志</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <searchbox></searchbox>
    <div class="search">
      <p>共搜索到 0 条数据</p>
      <el-button type="primary">导出excel</el-button>
    </div>
    <div class="managerdate-list">
      <el-table stripe :data="managerdate">
        <el-table-column label="序号" prop="" align="center" width="65" type='index'>
        </el-table-column>
        <el-table-column label="代理标示" prop="suffix" align="center">
        </el-table-column>
        <el-table-column label="代理昵称" prop="displayName" align="center">
        </el-table-column>
        <el-table-column label="代理管理账号" prop="adminName"  align="center">
        </el-table-column>
        <el-table-column label="最后登陆IP" prop="lastIP"  align="center">
        </el-table-column>
        <el-table-column label="最后登录时间" prop="loginAt" min-width="95">
        </el-table-column>
        <el-table-column label="状态" prop="status" align="center">
        </el-table-column>
        <el-table-column label="详情" prop="detail" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="65">
            <template scope="scope">
                <el-button type="text" class="myBtn">锁定</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
  </div>
</template>

<script>
import Searchbox from '@/components/generalcomponent/searchbox'
export default {
  components: {
    Searchbox
  },
  data () {
    return {
      managerdate: [
        {
          suffix: 'NA', // 代理标识
          displayName: '李君', // 代理昵称
          adminName: 'leejun111', // 代理管理账号
          lastIP: '192.168.3.150', // 最后登录IP
          loginAt: '', // 最后登录时间
          status: '', // 状态 0正常 1锁定
          detail: '' // 详情 0登陆成功 00登陆失败 01密码错误 其他错误忽略
        }, {
          suffix: 'NA', // 代理标识
          displayName: '老曾', // 代理昵称
          adminName: 'laozeng111', // 代理管理账号
          lastIP: '192.168.3.152', // 最后登录IP
          loginAt: '', // 最后登录时间
          status: '', // 状态 0正常 1锁定
          detail: '' // 详情 0登陆成功 00登陆失败 01密码错误 其他错误忽略
        }, {
          suffix: 'NA', // 代理标识
          displayName: '李屹', // 代理昵称
          adminName: 'leeyi111', // 代理管理账号
          lastIP: '192.168.3.153', // 最后登录IP
          loginAt: '', // 最后登录时间
          status: '', // 状态 0正常 1锁定
          detail: '' // 详情 0登陆成功 00登陆失败 01密码错误 其他错误忽略
        }, {
          suffix: 'NA', // 代理标识
          displayName: '孙滋书', // 代理昵称
          adminName: 'sungzishu111', // 代理管理账号
          lastIP: '192.168.3.154', // 最后登录IP
          loginAt: '', // 最后登录时间
          status: '', // 状态 0正常 1锁定
          detail: '' // 详情 0登陆成功 00登陆失败 01密码错误 其他错误忽略
        }, {
          suffix: 'NA', // 代理标识
          displayName: '曹文', // 代理昵称
          adminName: 'fuckwen111', // 代理管理账号
          lastIP: '192.168.3.155', // 最后登录IP
          loginAt: '', // 最后登录时间
          status: '', // 状态 0正常 1锁定
          detail: '' // 详情 0登陆成功 00登陆失败 01密码错误 其他错误忽略
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*search*/
.search{margin-left: 2rem;margin-top: 2rem}
.search p{padding-bottom: 1rem}
/**/
.managerdate-list{width: 97%;margin: 0 auto;margin-top: 3rem}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
