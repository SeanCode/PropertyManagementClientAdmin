<template>
  <div class="row">
    <list></list>
    <detail></detail>
  </div>
</template>
<style>
</style>
<script>
  import List from './admin/List.vue'
  import Detail from './admin/Detail.vue'

  export default {
    components: {
      'list': List,
      'detail': Detail
    }
  }
</script>
