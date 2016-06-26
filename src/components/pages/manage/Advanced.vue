<template>
  <department></department>
  <institution></institution>
  <node></node>
</template>
<style>
</style>
<script>
  import Department from './advanced/department.vue'
  import Institution from './advanced/institution.vue'
  import Node from './advanced/node.vue'

  export default {
    components: {
      'department': Department,
      'institution': Institution,
      'node': Node
    }
  }

</script>
