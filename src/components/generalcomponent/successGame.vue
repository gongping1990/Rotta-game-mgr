<template>
  <div class="success">
    <i class="el-icon-circle-check"></i>
    <h2>创建成功</h2>
    <p>恭喜您，游戏添加成功，您可以点击查看按钮查看游戏的详细信息！</p>
  </div>
</template>

<script>
export default {
  name: 'success'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.success{padding: 2rem 0;margin-left: -2rem;text-align: center;}
h2{padding-top: 2rem;font-size: 1.8rem;}
p{padding-top: 1rem;color: #5a5a5a;font-size: 1rem;}
.el-icon-circle-check{font-size: 5rem;color: #00a854}
</style>
