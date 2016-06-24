<template>
  <div class="col-md-3">
    <div class="box box-info" id="box-groups">
      <div class="box-header with-border">
        <h3 class="box-title">机构</h3>
        <div class="box-tools pull-right">
          <button class="btn btn-box-tool" @click="refresh()">
            <i class="fa fa-refresh"></i>
          </button>
          <button class="btn btn-box-tool">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <!-- /.box-header -->
      <div class="box-body" style="display: block;">
        <div>
          <ul id="groupsTree" class="ztree"></ul>
        </div>
      </div>
      <!--  boxbody -->
    </div>
    <!-- boxinfo -->
  </div>
</template>
<style>
  .ztree li span.button {
    min-width: 21px !important;
    min-height: 21px !important;
  }
</style>
<script>
  export default {}
</script>
