<template>
  <!-- Content Header (Page header) -->
  <content-header parent="水电气管理" child="高级管理"></content-header>
  <!-- Main content -->
  <section class="content">
    <department></department>
    <institution></institution>
    <node></node>
  </section>
  <!-- /.content -->
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Department from './advanced/department.vue'
  import Institution from './advanced/institution.vue'
  import Node from './advanced/node.vue'

  export default {
    components: {
      'content-header': ContentHeader,
      'department': Department,
      'institution': Institution,
      'node': Node
    }
  }

</script>
