<template>
  <div class='col-md-12'>
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
        <v-client-table :data='adminList' :columns='columns' :options='options'
                        class='admin-list-table'></v-client-table>
      </div>
    </div>
  </div>
</template>
<style>
  .VueTables__limit {
    display: none;
  }

  .admin-list-table {
    padding-top: 10px;
  }

  .VueTables__highlight {
    background: deeppink;
    font-weight: normal;
  }

  .VueTables__sortable {
    cursor: pointer;
  }

  .glyphicon {
    text-align: center;
    color: #3c8dbc;
  }

  th:nth-child(n+4),
  td:nth-child(n+4) {
    text-align: center;
  }

  .VueTables__dropdown-pagination {
    margin-left: 10px;
  }

  .pagination {
    float: right;
  }

  .VueTables__date-filter {
    border: 1px solid #ccc;
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
  }

  .VueTables__filter-placeholder {
    color: #aaa;
  }

  .VueTables__list-filter {
    width: 120px;
  }
</style>
<script>
  import Core from '../../../../core/core'

  // dirty code!!!
  export default {
    name: 'List',
    methods: {
      refresh () {
        getAdminList(this)
      },
      'add': function () {
        Core.Log.d('add')
      },
      'delete': function (param) {
        console.log('param: ' + param)
        window.alert('删除: ' + param + ' ?')
      }
    },
    components: {},
    data () {
      return {
        adminList: [],
        columns: ['id', 'name', 'username'],
        options: {
          compileTemplates: true,
          highlightMatches: true,
          filterByColumn: true,
          filterable: ['name', 'username'],
          texts: {
            filter: 'Search:',
            noResults: '未找到',
            count: '共 {count} 条记录'
          },
          onRowClick: function (row) {
            console.log('on row click')
          },
          headings: {
            id: '编号',
            name: '用户名',
            username: '姓名',
            input: '水电气录入',
            check: '水电气审核',
            statistics: '水电气统计',
            owner: '个人管理',
            institution: '机构管理',
            advanced: '高级管理',
            admin: '管理员管理',
            article_add: '门户文章发表',
            picture_add: '门户风采发表',
            resource_manage: '门户资源管理',
            banner: '门户轮播图管理',
            delete: '删除',
            ban: '锁定'
          },
          templates: {
            input: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 4 ? 'checked' : '') + '/>'
            },
            check: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 2 ? 'checked' : '') + '/>'
            },
            statistics: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 3 ? 'checked' : '') + '/>'
            },
            owner: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 2 ? 'checked' : '') + '/>'
            },
            institution: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 2 ? 'checked' : '') + '/>'
            },
            advanced: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 1 ? 'checked' : '') + '/>'
            },
            admin: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 2 ? 'checked' : '') + '/>'
            },
            article_add: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 1 ? 'checked' : '') + '/>'
            },
            picture_add: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 1 ? 'checked' : '') + '/>'
            },
            resource_manage: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 1 ? 'checked' : '') + '/>'
            },
            banner: function (row) {
              return '<input type="checkbox" ' + (row.privilege > 1 ? 'checked' : '') + '/>'
            },
            ban: '<div @click="$parent.delete({id})"><i class="fa fa-ban" style="color: red; cursor: pointer;"></i></div>',
            delete: '<div @click="$parent.delete({id})"><i class="fa fa-trash" style="color: red; cursor: pointer;"></i></div>'
          }
        }
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
    })
  }

</script>
