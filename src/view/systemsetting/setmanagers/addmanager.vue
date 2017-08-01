<template>
<div>
	<div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统设置 </el-breadcrumb-item>
        <el-breadcrumb-item>管理员管理 </el-breadcrumb-item>
        <el-breadcrumb-item><span  class="large">添加管理员</span> </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addmanager">
  	<h2>基本信息</h2>
    <div class="addmanager-form">
    	<p class="justfy1"><span>管理员用户名: </span><el-input v-model="addmanager.userName" placeholder="请输入" class="input"></el-input></p>
    	<p class="justfy2"><span>管理员密码: </span><el-input v-model="addmanager.password" placeholder="请输入" class="input"></el-input></p>
    	<p class="justfy3"><span>管理员姓名: </span><el-input v-model="addmanager.name" placeholder="请输入" class="input"></el-input></p>
    	<!-- <p class="justfy4">
    		<span>权限: </span>
    		<el-select v-model="addmanager.property" multiple placeholder="请选择" class="input">
        	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    		</el-select>
    	</p> -->
    </div>
    <el-button type="primary" class="subBtn">提交</el-button>
  </div>
</div>
  
</template>

<script>
export default {
  data () {
    return {
      addmanager: {
        userName: '', // 管理员账号
        password: '', // 管理员密码
        name: '', // 管理员真实姓名
        property: [] // 管理员权限
      }, // 添加管理员
      options: [{
        label: '权限1',
        value: '真人视讯'
      }, {
        label: '权限2',
        value: '电子游戏'
      }, {
        label: '权限3',
        value: '棋牌游戏'
      }
      ] // 添加权限数据结构
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{font-size: 1.8rem;font-weight: normal;padding: 1rem 0 0 0;color: #5a5a5a;margin-left: -35rem}
.addmanager{text-align: center;margin-top: 8rem}
.input{width: 28rem;}
p{padding-top: 2rem;}
span{padding-right: 0.5rem}
.subBtn{margin-top: 3rem;margin-left: 3rem}
/**/
.justfy1{margin-left: -2rem}
.justfy2{margin-left: -1rem}
.justfy3{margin-left: -1rem}
.justfy4{margin-left: 2rem}
/*面包屑组件*/
.title{padding: 2rem;}
.large{font-size: 1.5rem;color: #000;position: relative;top: -0.3rem;}
</style>
