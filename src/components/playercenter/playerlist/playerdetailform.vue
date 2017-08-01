<template>
  <div class="playdetailform">
    <div class="baseinfo">
      <h4>基本信息</h4>
      <div class="baseinfo-form">
        <p><span>所属商户：{{playerDetail.merchant}}</span><span>线路号：{{playerDetail.merchantId}}</span><span>上次登录游戏时间：{{playerDetail.loginAt}}</span></p>
      </div>
    </div>
    <div class="countinfo">
      <h4>消费信息</h4>
      <div class="countinfo-title">
        <span class="justfy2">当前剩余点数：{{playerDetail.currentPoints}}</span>
        <el-button type="text">刷新</el-button>
        <el-button class="tabBtn" size="small">全部</el-button>
        <el-button class="tabBtn" size="small">棋牌游戏</el-button>
        <el-button class="tabBtn" size="small">电子游戏</el-button>
        <el-button class="tabBtn" size="small">真人视讯</el-button>
        <el-button class="tabBtn" size="small">中心钱包</el-button>
        <el-button class="tabBtn" size="small">管理员操作</el-button>
      </div>
      <div class="countinfo-form">
        <el-table border style="width: 97%" :data="payInfo">
          <el-table-column prop="date" label="序号" width="65" align="center" type="index"></el-table-column>
          <el-table-column prop="nowPoints" label="账户余额" align="center"></el-table-column>
          <el-table-column prop="payPoints" label="交易点数" align="center"></el-table-column>
          <el-table-column prop="payTime" label="交易时间" align="center"></el-table-column>
          <el-table-column prop="payType" label="交易类型" align="center"></el-table-column>
          <el-table-column prop="prevPoint" label="交易详情(原账+当前操作额=现在余额)" width="165" align="center"></el-table-column>
          <el-table-column prop="doPerson" label="操作人" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        </el-table>
        <page></page>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/generalcomponent/page'
export default {
  name: 'playdetailform',
  components: {
    Page
  },
  data () {
    return {
      playerDetail: {
        merchant: 'NA泛娱乐', // 所属商户
        merchantId: '456123', // 商户线路号
        loginAt: '', // 最后登录时间
        currentPoints: '1234256' // 当前剩余点数
      },
      payInfo: [
        {
          nowPoints: '6000', // 账户余额(现在余额)
          payPoints: '+1000', // 交易点数(当前操作额) 传'+'或者'-'
          prevPoint: '5000', // 原账(原始余额)
          payTime: '', // 交易时间
          payType: '0', // (交易类型) 其中：中心钱包转入=00 中心钱包转出=01 商户存点=10 商户提点=11 棋牌游戏=200 真人视讯=201 电子游戏=202
          createAt: '',
          doPerson: '0', // 0=玩家 1=商户
          remark: '' // 备注信息
        }, {
          nowPoints: '6000', // 账户余额(现在余额)
          payPoints: '+2000', // 交易点数(当前操作额) 传'+'或者'-'
          prevPoint: '4000', // 原账(原始余额)
          payTime: '', // 交易时间
          payType: '0', // (交易类型) 其中：中心钱包转入=00 中心钱包转出=01 商户存点=10 商户提点=11 棋牌游戏=000 真人视讯=001 电子游戏=002
          createAt: '',
          doPerson: '0', // 0=玩家 1=商户
          remark: '' // 备注信息
        }, {
          nowPoints: '6000', // 账户余额(现在余额)
          payPoints: '+1000', // 交易点数(当前操作额) 传'+'或者'-'
          prevPoint: '5000', // 原账(原始余额)
          payTime: '', // 交易时间
          payType: '0', // (交易类型) 其中：中心钱包转入=00 中心钱包转出=01 商户存点=10 商户提点=11 棋牌游戏=000 真人视讯=001 电子游戏=002
          createAt: '',
          doPerson: '0', // 0=玩家 1=商户
          remark: '' // 备注信息
        }, {
          nowPoints: '6000', // 账户余额(现在余额)
          payPoints: '+1000', // 交易点数(当前操作额) 传'+'或者'-'
          prevPoint: '5000', // 原账(原始余额)
          payTime: '', // 交易时间
          payType: '0', // (交易类型) 其中：中心钱包转入=00 中心钱包转出=01 商户存点=10 商户提点=11 棋牌游戏=000 真人视讯=001 电子游戏=002
          createAt: '',
          doPerson: '0', // 0=玩家 1=商户
          remark: '' // 备注信息
        }, {
          nowPoints: '6000', // 账户余额(现在余额)
          payPoints: '+1000', // 交易点数(当前操作额) 传'+'或者'-'
          prevPoint: '5000', // 原账(原始余额)
          payTime: '', // 交易时间
          payType: '0', // (交易类型) 其中：中心钱包转入=00 中心钱包转出=01 商户存点=10 商户提点=11 棋牌游戏=000 真人视讯=001 电子游戏=002
          createAt: '',
          doPerson: '0', // 0=玩家 1=商户
          remark: '' // 备注信息
        }, {
          nowPoints: '6000', // 账户余额(现在余额)
          payPoints: '+1000', // 交易点数(当前操作额) 传'+'或者'-'
          prevPoint: '5000', // 原账(原始余额)
          payTime: '', // 交易时间
          payType: '0', // (交易类型) 其中：中心钱包转入=00 中心钱包转出=01 商户存点=10 商户提点=11 棋牌游戏=000 真人视讯=001 电子游戏=002
          createAt: '',
          doPerson: '0', // 0=玩家 1=商户
          remark: '' // 备注信息
        }
      ]
    }
  }
}
</script>

<style scoped>
.baseinfo,
.countinfo{width: 98%;margin: 0 auto;vertical-align: baseline;}

.baseinfo-form,
.countinfo-form{background-color: #f5f5f5;padding-left: 3%;font-size: 1.1rem}

.baseinfo-form span{display: inline-block;width: 30%;padding: 3rem 0}
.countinfo-form{padding-top: 1.5rem;padding-bottom: 1.5rem}

.countinfo-title{background-color: #f5f5f5;padding-left: 3%;font-size: 1.1rem;padding-top: 2rem}

.tabBtn{margin-left: 2rem}
h4{font-size: 1.8rem;font-weight: normal;padding: 2rem 0;color: #5a5a5a}
.justfy2{font-size: 1.2rem;padding-right: 1rem;}
</style>
