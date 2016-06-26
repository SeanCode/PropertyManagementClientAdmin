<template>
  <div class="row">
    <div class='col-md-3'>
      <price></price>
    </div>
    <div class='col-md-9'>
      <div class="box box-info" id="box-groups">
        <div class="overlay" v-if="lay">
          <i class="fa fa-circle-o-notch fa-spin" @click="refresh()"></i>
        </div>
        <div class="box-header with-border">
          <h3 class="box-title">部门</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" @click="refresh()">
              <i class="fa fa-refresh"></i>
            </button>
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" style="display: block;">

        </div>
        <!--  boxbody -->
      </div>
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
