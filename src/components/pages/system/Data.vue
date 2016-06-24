<template>
  <div class="row">
    <div class='col-md-3'>
      <price></price>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import Price from './data/PriceConfig.vue'

  export default {
    components: {
      'price': Price
    }
  }
</script>
