<template>
  <!-- Content Header (Page header) -->
  <content-header parent="统计" child="本月"></content-header>
  <!-- Main content -->
  <section class="content">
    <div>this is template body</div>
  </section>
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'

  export default {
    components: {
      'content-header': ContentHeader
    }
  }
</script>
