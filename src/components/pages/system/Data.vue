<template>
  <!-- Content Header (Page header) -->
  <content-header parent="系统" child="数据管理"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class='col-md-3'>
        <price></price>
      </div>
      <div class='col-md-9'>
      </div>
    </div>
  </section>
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Price from './data/PriceConfig.vue'

  export default {
    components: {
      'price': Price,
      'content-header': ContentHeader
    }
  }
</script>
