<template>
  <!-- Content Header (Page header) -->
  <content-header parent="打印" child="报表"></content-header>
  <!-- Main content -->
  <section class="content">
  </section>
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'

  export default {
    components: {
      'content-header': ContentHeader
    },
    ready () {
      Core.Toast.info(this, '暂无数据,无法生成报表')
    }
  }
</script>
