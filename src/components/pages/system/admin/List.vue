<template>
  <div class='col-md-4'>
    <div class='box box-info' id='box-groups'>
      <div class='box-header with-border'>
        <h3 class='box-title'>管理员列表</h3>
        <div class='box-tools pull-right'>
          <button class='btn btn-box-tool' @click='refresh'>
            <i class='fa fa-refresh'></i>
          </button>
          <button class='btn btn-box-tool' @click='add'>
            <i class='fa fa-plus'></i>
          </button>
        </div>
        <div class='box-body'>
          <v-client-table :data='adminList' :columns='columns' :options='options'></v-client-table>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import Core from '../../../../core/core'

  export default {
    methods: {
      refresh () {
        getAdminList(this)
        console.log(this.adminList)
      },
      'add': function () {
        Core.Log.d('add')
      }
    },
    data () {
      return {
        adminList: [],
        columns: ['id', 'name', 'username'],
        options: {}
      }
    },
    ready () {
      getAdminList(this)
    }
  }

  function getAdminList (context) {
    Core.Api.ADMIN.getAdminList().then(function (data) {
      context.adminList = data.admin_list
    }, function (error) {
      window.alert(error)
      Core.Log.e(error)
      return error
    }).then(function (data) {
      return data
    })
  }

</script>
