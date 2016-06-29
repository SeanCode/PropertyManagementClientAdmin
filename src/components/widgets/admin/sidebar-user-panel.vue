<template>
  <!-- Sidebar user panel -->
  <div class="user-panel">
    <!--<div class="pull-left image">-->
    <!--<img src="/static/img/user2-160x160.jpg" class="img-circle" alt="User Image">-->
    <!--</div>-->
    <div class="pull-left info">
      <p>{{adminName}}</p>
      <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
    </div>
  </div>
</template>
<script>
  import Core from '../../../core/core'

  module.exports = {
    data () {
      return {
        adminName: Core.Data.getAdminName()
      }
    },
    events: {
      'login-msg': function () {
        this.adminName = Core.Data.getAdminName()
      }
    }
  }
</script>
<style>
  .user-panel {
    width: auto;
    height: 65px;;
  }

  .user-panel > .info {
    left: 0;
  }
</style>
