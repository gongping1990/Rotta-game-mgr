<template>
    <div class="page">
        <el-pagination layout="prev, pager, next, sizes, jumper" :total="50" :page-size="5"></el-pagination>
    </div>
</template>
<script>
export default {
  name: 'page'
}
</script>
<style scoped>
.page {padding-bottom: 2rem;text-align: right;margin-right: 2%;margin-top: 0.5rem}
</style>
