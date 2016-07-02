<template>
  <!-- Content Header (Page header) -->
  <content-header parent="系统" child="管理员管理"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <list></list>
    </div>
  </section>
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import List from './admin/List.vue'

  export default {
    components: {
      'list': List,
      'content-header': ContentHeader
    }
  }
</script>
