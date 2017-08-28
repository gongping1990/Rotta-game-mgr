<template>
  <div class="board">
    <div class="contentBox">
      <span class="test">即将上线    <span class="test">  敬请期待</span></span>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    this.$store.commit({
      type: 'getNowSearchIndex',
      data: 'board'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .board{
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .test{font-size: 2rem;font-weight: bolder;font-family: '微软雅黑'}
</style>
