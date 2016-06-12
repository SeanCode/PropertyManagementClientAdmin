<template>
  <div class="col-md-4">
    <div class="box box-info" id="box-groups">
      <div class="box-header with-border">
        <h3 class="box-title">管理员列表</h3>
        <div class="box-tools pull-right">
          <button class="btn btn-box-tool" @click='refresh'>
            <i class="fa fa-refresh"></i>
          </button>
          <button class="btn btn-box-tool">
            <i class="fa fa-plus"></i>
          </button>
        </div>
        <div class="box-body" style="display: block;">
          <div>{{adminList}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import adminService from '../../../../services/admin'

  export default {
    methods: {
      'refresh': function () {
        console.log('refresh')
        this.adminList = adminService.getAdminList()
      },
      'add': function () {

      }
    },
    data () {
      return {
        adminList: []
      }
    },
    ready () {
      this.adminList = adminService.getAdminList()
    }
  }
</script>
