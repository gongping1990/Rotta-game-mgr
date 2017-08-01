<template>
  <div class="propertycenter">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>财务中心 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">线路商报表</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="allBar">
    	<div class="allBar-top">
    		<h2 class="allBar-title">总览</h2>
    		<p class="allBar-time">当前时间:{{formatTime(nowDate)}} </p>
    	</div>
    	<div class="allBar-info">
    		<div>
    			<i class="el-icon-date"></i>
    			<p class="title font-color">线路商数量</p>
    			<p class="count">323/400</p>
    		</div>
    		<div>
    			<i class="el-icon-menu"></i>
    			<p class="title font-color">售出点数</p>
    			<p class="count">12,333,333</p>
    		</div>
    		<div>
    			<i class="el-icon-star-on"></i>
    			<p class="title font-color">成交量</p>
    			<p class="count">12,333,333</p>
    		</div>
    		<div>
    			<i class="el-icon-document"></i>
    			<p class="title font-color">累计收益</p>
    			<p class="count">12,333,333</p>
    		</div>
    	</div>
    </div>

    <div style="margin: 2rem 0.5rem;border:1px solid #C0CCDA;border-radius: 4px;">
      <el-row class="row-inner">
        <el-col :span="3">
          <span class="large" style="font-weight: bold">最新财务统计</span>
        </el-col>
        <el-col :span="21">
          <el-button-group>
            <el-button size="small">点数</el-button>
            <el-button size="small">收益</el-button>
            <el-button size="small">成交量</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row class="row-inner" style="padding: 0;border-bottom: none">
          <el-col :span="4" style="padding: 2rem;border-right: 1px solid #C0CCDA">
            <div style="margin-bottom: 2rem">
              <div class="font-color">本月出售点数</div>
              <div class="number-weight">4230</div>
              <div class="font-color"><span style="color: #00a854"><i class="el-icon-caret-top"></i>10%</span> 同比上月</div>
            </div>
            <div>
              <div class="font-color">本月出售点数</div>
              <div class="number-weight">4230</div>
              <div class="font-color"><span style="color: #FF1A1F"><i class="el-icon-caret-bottom"></i>10%</span> 同比上月</div>
            </div>
          </el-col>
          <el-col :span="20" style="padding: 2rem">
            <el-row>
              <el-col :span="10" style="font-weight: bold">近一周点数出售情况</el-col>
              <el-col :span="14" style="text-align: right">
                <el-row>
                  <el-col :span="10">
                    <el-button type="text">今日</el-button>
                    <el-button type="text">本周</el-button>
                    <el-button type="text">本月</el-button>
                  </el-col>
                  <el-col :span="14 ">
                    <el-date-picker
                      type="daterange"
                      placeholder="选择日期范围">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
      </el-row>
    </div>
    <div style="margin: 0 0.5rem">
      <el-button size="small" @click="addTab(editableTabsValue2)">
        add tab
      </el-button>
      <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          v-for="(item, index) in editableTabs2"
          :key="item.name"
          :label="item.title"
          :name="item.name">
          <div style="margin-bottom: 15px;margin-left: 10px;">
            <span class="table-border-right">2017-07-12</span>
            <span class="table-border-right">总计：<span class="font-color-success">250.00点</span></span>
            <span class="table-border-right">总交易笔数：<span class="font-color-success">250.00笔</span></span>
            <span>每笔平均点数：<span class="font-color-success">250.00点</span></span>
          </div>
          <el-table border :data="payInfo">
            <el-table-column prop="date" label="线路商ID" align="center"></el-table-column>
            <el-table-column prop="nowPoints" label="线路商昵称" align="center"></el-table-column>
            <el-table-column prop="payPoints" label="线路商标示" align="center"></el-table-column>
            <el-table-column prop="payTime" label="线路上抽成比" align="center"></el-table-column>
            <el-table-column prop="payType" label="线路商购点数" align="center"></el-table-column>
            <el-table-column prop="prevPoint" label="交易金额（元）" align="center"></el-table-column>
            <el-table-column prop="doPerson" label="状态" align="center"></el-table-column>
            <el-table-column prop="doPerson" label="生效时间" align="center"></el-table-column>
            <el-table-column prop="doPerson" label="交易时间" align="center"></el-table-column>
            <el-table-column prop="doPerson" label="操作人" align="center"></el-table-column>
            <el-table-column prop="remark" label="操作" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Page></Page>
  </div>
</template>

<script type="text/ecmascript-6">
import dateformat from 'dateformat'
import Page from '@/components/generalcomponent/page'
export default {
  components: {
    Page
  },
  beforeCreate () {
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'propertycenter'
    })
    console.log(localStorage)
    this.$store.commit({
      type: 'returnToken',
      data: localStorage.token
    })
  },
  data () {
    return {
      nowDate: new Date(),
      editableTabsValue2: '2',
      editableTabs2: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    }
  },
  computed: {
  },
  methods: {
    formatTime (time) {
      return dateformat(time, 'isoDate')
    },
    addTab (targetName) {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs2.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      })
      this.editableTabsValue2 = newTabName
    },
    removeTab (targetName) {
      let tabs = this.editableTabs2
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue2 = activeName
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/**/
.allBar{background-color: #f7f7f7;padding: 2rem 2rem 3rem}
.allBar-top:after{content: '';display: block;height: 0;clear: both;visibility: hidden;}
.allBar-title{float: left;}
.allBar-time{float: right;}
/**/
.allBar-info div{display: inline-block;width: 24%;margin-top: 1rem}
.allBar-info i{font-size: 4rem;float: left;margin-top: 0.5rem;margin-right: 0.4rem}
.allBar-info p{}
.allBar-info .title{font-size: 1rem;margin-top: -1.2rem}
.allBar-info .count{font-size: 1.8rem;margin-top: -1.6rem}
.el-icon-date{color: #0D5DDF}
.el-icon-menu{color: #FF1A1F}
.el-icon-star-on{color: #ffbf00}
.el-icon-document{color: #00a854}
/*面包屑组件*/
.title{padding: 2rem}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem}
.text-center{text-align: center}
.row-inner{border-bottom: 1px solid #C0CCDA;padding: 1rem 2rem}
.number-weight{font-size: 2rem;font-weight: bold}
.font-color{color:#bbbbbb }
.font-color-success{color: #00a854;font-weight: bold;font-size:1.2rem}
.table-border-right{border-right: 1px solid #eaeaea;padding-right:1rem;margin-right: 1rem}
.el-tabs__header{width: 100px!important;}
</style>
