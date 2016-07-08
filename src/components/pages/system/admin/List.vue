<template>
  <div class='col-md-12'>
    <div class='box box-info' id='box-groups'>
      <div class='box-header with-border'>
        <h3 class='box-title'>管理员列表</h3>
        <div class='box-tools pull-right'>
          <button class='btn btn-box-tool' @click='refresh()'>
            <i class='fa fa-refresh'></i>
          </button>
          <button class='btn btn-box-tool' @click='toggleShowAddAdmin()'>
            <i class='fa fa-plus'></i>
          </button>
        </div>
        <v-client-table :data='adminList' :columns='columns' :options='options'
                        class='admin-list-table'></v-client-table>
      </div>
      <modal title="添加管理员" :show.sync="showAddAdmin" effect="fade">
        <div slot="modal-body" class="modal-body">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">用户名</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="adminEditing.name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">姓名</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="adminEditing.username">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">密码</label>
              <div class="col-sm-10">
                <input class="form-control" disabled placeholder="123456">
              </div>
            </div>
          </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showAddAdmin = false'>取消</button>
          <button type="button" class="btn label-primary" @click="addAdmin()">添加</button>
        </div>
      </modal>
      <modal title="警告" :show.sync="showDeleteAdmin" effect="fade">
        <div slot="modal-body" class="modal-body">确认删除?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showDeleteAdmin = false'>取消</button>
          <button type="button" class="btn label-danger" @click='deleteAdmin()'>删除</button>
        </div>
      </modal>
      <modal title="警告" :show.sync="showUpdateAdminStatus" effect="fade">
        <div slot="modal-body" class="modal-body">确认<strong>{{adminEditing.status==0 ? '锁定' : '解锁'}}</strong>该用户?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showUpdateAdminStatus = false'>取消</button>
          <button type="button" class="btn label-danger" @click='updateAdminStatus()'>确定</button>
        </div>
      </modal>
      <modal title="警告" :show.sync="showResetAdmin" effect="fade">
        <div slot="modal-body" class="modal-body">确认重置该用户密码?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showResetAdmin = false'>取消</button>
          <button type="button" class="btn label-danger" @click='resetAdmin()'>重置</button>
        </div>
      </modal>
      <modal title="警告" :show.sync="showUpdateAdminPrivilege" effect="fade" :backdrop=false>
        <div slot="modal-body" class="modal-body">确认更新该用户权限?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='cancelUpdateAdminPrivilege()'>取消</button>
          <button type="button" class="btn label-danger" @click='updateAdminPrivilege()'>更新</button>
        </div>
      </modal>
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
  import Modal from '../../../widgets/Modal.vue'

  export default {
    components: {
      'modal': Modal
    },
    data () {
      return {
        showAddAdmin: false,
        showEditAdmin: false,
        adminEditing: {},
        showResetAdmin: false,
        showDeleteAdmin: false,
        showUpdateAdminStatus: false,
        showUpdateAdminPrivilege: false,
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
          headings: {
            id: '编号',
            name: '用户名',
            username: '姓名',
            status: '状态',
            input: '录入',
            check: '审核',
            statistics: '统计/打印',
            owner: '个人管理',
            institution: '机构管理',
            advanced: '高级管理',
            admin: '管理员管理',
            article_add: '门户文章发表',
            picture_add: '门户风采发表',
            resource_manage: '门户资源管理',
            banner: '门户轮播图管理',
            delete: '删除',
            ban: '锁定',
            reset: '重置'
          },
          templates: {
            status: function (row) {
              switch (row.status) {
                case 1:
                  return '<span class="label label-info">' + row.status_name + '</span>'
                case -1:
                  return '<span class="label label-warning">' + row.status_name + '</span>'
                default:
                  return '<span class="label label-success">' + row.status_name + '</span>'
              }
            },
            input: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 0 + '"' + (row.auth.input ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 0 + ')"' + '/>'
            },
            check: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 1 + '"' + (row.auth.check ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 1 + ')"' + '/>'
            },
            statistics: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 2 + '"' + (row.auth.statistics ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 2 + ')"' + '/>'
            },
            owner: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 3 + '"' + (row.auth.owner ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 3 + ')"' + '/>'
            },
            institution: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 4 + '"' + (row.auth.institution ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 4 + ')"' + '/>'
            },
            advanced: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 5 + '"' + (row.auth.advanced ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 5 + ')"' + '/>'
            },
            admin: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 6 + '"' + (row.auth.admin ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 6 + ')"' + '/>'
            },
            article_add: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 7 + '"' + (row.auth.article ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 7 + ')"' + '/>'
            },
            picture_add: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 8 + '"' + (row.auth.picture ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 8 + ')"' + '/>'
            },
            resource_manage: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 9 + '"' + (row.auth.resource ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 9 + ')"' + '/>'
            },
            banner: function (row) {
              return '<input type="checkbox" id="checkbox_' + row.id + '_' + 10 + '"' + (row.auth.banner ? ' checked' : '') + ' @click="$parent.toggleUpdateAdminPrivilege(' + row.id + ',' + 10 + ')"' + '/>'
            },
            ban: '<div @click="$parent.toggleUpdateAdminStatus({id})"><i class="fa fa-lock" style="color: red; cursor: pointer;"></i></div>',
            reset: '<div @click="$parent.toggleResetAdmin({id})"><i class="fa fa-wrench" style="color: red; cursor: pointer;"></i></div>',
            delete: '<div @click="$parent.toggleDeleteAdmin({id})"><i class="fa fa-trash" style="color: red; cursor: pointer;"></i></div>'
          }
        }
      }
    },
    ready () {
      initContext(this)
      getAdminList()
    },
    methods: {
      refresh: function () {
        getAdminList(this)
      },
      toggleDeleteAdmin: function (id) {
        this.adminEditing = {}
        this.adminEditing.id = id
        this.showDeleteAdmin = true
      },
      toggleUpdateAdminStatus: function (id) {
        getAdminEditing(id)
      },
      toggleResetAdmin: function (id) {
        this.adminEditing = {}
        this.adminEditing.id = id
        this.showResetAdmin = true
      },
      toggleShowAddAdmin: function () {
        this.adminEditing = {}
        this.showAddAdmin = true
      },
      deleteAdmin: function () {
        deleteAdmin(this.adminEditing.id)
      },
      updateAdminStatus: function () {
        if (this.adminEditing.status === 1) {
          Core.Toast.warning(context, '受保护的管理员')
          return
        }
        var status = this.adminEditing.status === 0 ? -1 : 0
        updateAdminStatus(this.adminEditing.id, status)
      },
      resetAdmin: function () {
        resetAdmin(this.adminEditing.id)
      },
      addAdmin: function () {
        addAdmin(this.adminEditing.name, this.adminEditing.username)
      },
      toggleUpdateAdminPrivilege: function (id, index) {
        this.showUpdateAdminPrivilege = true
        this.adminEditing.id = id
        this.adminEditing.index = index
      },
      updateAdminPrivilege: function () {
        updateAdminPrivilege(this.adminEditing.id, this.adminEditing.index)
      },
      cancelUpdateAdminPrivilege: function () {
        var id = this.adminEditing.id
        var index = this.adminEditing.index
        var value = window.$('#checkbox_' + id + '_' + index).is(':checked')
        if (value) {
          window.$('#checkbox_' + id + '_' + index).removeAttr('checked')
        } else {
          window.$('#checkbox_' + id + '_' + index).prop({checked: true})
        }
        this.showUpdateAdminPrivilege = false
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getAdminList () {
    Core.Api.ADMIN.getAdminList().then(function (data) {
      context.adminList = data.admin_list
    }, function (error) {
      Core.Toast.error(context, '获取管理员列表失败: ' + error.message)
    })
  }

  function addAdmin (name, username) {
    Core.Api.ADMIN.addAdmin(name, username).then(function (data) {
      Core.Toast.success(context, '添加成功')
      context.showAddAdmin = false
      getAdminList()
    }, function (error) {
      Core.Toast.error(context, '添加失败: ' + error.message)
    })
  }

  function getAdminEditing (id) {
    Core.Api.ADMIN.getAdminInfo(id).then(function (data) {
      if (data.admin.status === 1) {
        Core.Toast.warning(context, '受保护的管理员')
      } else {
        context.adminEditing = data.admin
        context.showUpdateAdminStatus = true
      }
    }, function (error) {
      Core.Toast.error(context, '获取管理员详情失败: ' + error.message)
    })
  }

  function updateAdminStatus (id, status) {
    Core.Api.ADMIN.updateAdminStatus(id, status).then(function (data) {
      Core.Toast.success(context, '状态修改成功')
      context.showUpdateAdminStatus = false
      getAdminList()
    }, function (error) {
      Core.Toast.error(context, '状态修改失败: ' + error.message)
    })
  }

  function deleteAdmin (id) {
    Core.Api.ADMIN.deleteAdmin(id).then(function (data) {
      context.showDeleteAdmin = false
      Core.Toast.success(context, '管理员删除成功')
      getAdminList()
    }, function (error) {
      Core.Toast.error(context, '管理员删除失败: ' + error.message)
    })
  }

  function resetAdmin (id) {
    Core.Api.ADMIN.resetAdmin(id).then(function (data) {
      context.showResetAdmin = false
      Core.Toast.success(context, '管理员密码重置成功')
    }, function (error) {
      Core.Toast.error(context, '管理员密码重置失败: ' + error.message)
    })
  }

  function updateAdminPrivilege (id, index) {
    Core.Api.ADMIN.updateAdminPrivilege(id, index).then(function (data) {
      Core.Toast.success(context, '更新权限成功')
      context.showUpdateAdminPrivilege = false
    }, function (error) {
      context.showUpdateAdminPrivilege = false
      var value = window.$('#checkbox_' + id + '_' + index).is(':checked')
      window.$('#checkbox_' + id + '_' + index).attr('checked', !value)
      Core.Toast.error(context, '更新权限失败: ' + error.message)
    })
  }

</script>
