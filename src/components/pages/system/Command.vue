<template>
  <!-- Content Header (Page header) -->
  <content-header parent="系统" child="使用说明"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class='col-md-12'>
      </div>
    </div>
  </section>
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'

  export default {
    components: {
      'content-header': ContentHeader
    },
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
