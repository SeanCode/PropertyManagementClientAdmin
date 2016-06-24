<template>
  <div class="box box-info" id="box-time">
    <div class="box-header with-border">
      <h3 class="box-title">本月单价</h3>
      <div class="box-tools pull-right">
        <button class="btn btn-box-tool" @click="refresh()">
          <i class="fa fa-refresh"></i>
        </button>
        <button class="btn btn-box-tool" data-widget="collapse">
          <i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body" style="display: block;">
      <div class="single">
        <span class="label label-info">水</span>
        <span class="badge bg-red">{{time.water}}</span>
      </div>
      <div class="single">
        <span class="label label-info">电</span>
        <span class="badge bg-red">{{time.electric}}</span>
      </div>
      <div class="single">
        <span class="label label-info">气</span>
        <span class="badge bg-red">{{time.gas}}</span>
      </div>
    </div>
  </div>
</template>
<style>
  .single {
    display: inline-flex;
    flex: 1;
  }
</style>
<script>
  export default {
    data () {
      return {
        time: {
          water: 3.0,
          electric: 1.8,
          gas: 2.1
        }
      }
    }
  }
</script>
