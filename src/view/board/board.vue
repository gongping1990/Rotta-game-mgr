<template>
  <div>
    看板页面
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

</style>
