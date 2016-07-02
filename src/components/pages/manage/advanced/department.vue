<template>
  <div class='row'>
    <div class='col-md-12'>
      <div class='box box-info' id='box-groups'>
        <div class='box-header with-border'>
          <h3 class='box-title'>部门与用户管理</h3>
          <div class='box-tools pull-right'>
            <button class='btn btn-box-tool' @click='refresh'>
              <i class='fa fa-refresh'></i>
            </button>
            <button class='btn btn-box-tool' data-widget='collapse'>
              <i class='fa fa-minus'></i>
            </button>
          </div>
        </div>
        <div class='box-body' style='display: block'>
          <div class='row'>
            <div class='col-md-3 no-padding-right'>
              <div class='department-box'>
                <ul id='departmentTree' class='ztree'></ul>
              </div>
            </div>
            <div class='col-md-9 no-padding-left'>
              <div class="department-head" v-show="treeNode.id">
                <h4 class="department-title">{{treeNode.name}}</h4>
                <li class="dropdown pull-right department-dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" aria-expanded="false">
                    <i class='fa fa-cog'></i>
                  </a>
                  <ul class="dropdown-menu">
                    <li role="presentation"><a role="menuitem" href="javascript:void(0);"
                                               @click="toggleEditDepartment()">重命名</a>
                    </li>
                    <li role="presentation"><a role="menuitem" href="javascript:void(0);"
                                               @click="toggleAddDepartment()">新增子部门</a>
                    </li>
                    <li role="presentation"><a role="menuitem" href="javascript:void(0);"
                                               @click="toggleDeleteDepartment()">删除</a>
                    </li>
                    <li role="presentation" class="divider"></li>
                    <li role="presentation"><a role="menuitem" href="javascript:void(0);"
                                               @click="toggleAddUser()">添加用户</a>
                    </li>
                  </ul>
                </li>

                <div class="clearfix" style="display: block;"></div>
              </div>
              <v-client-table :data='userList' :columns='columns' :options='options'
                              class='user-list-table'></v-client-table>
            </div>
          </div>
        </div>
        <modal title="修改个人信息" :show.sync="showEditUser" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.username">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">手机号码</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.phone">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">身份证</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.id_card">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">一卡通</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.school_card">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">备注</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.remark">
                </div>
              </div>
            </div>
          </div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showEditUser = false'>取消</button>
            <button type="button" class="btn btn-success" @click='updateUser'>更新</button>
          </div>
        </modal>
        <modal title="警告" :show.sync="showDeleteUser" effect="fade">
          <div slot="modal-body" class="modal-body">确认删除该用户?</div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showDeleteUser = false'>取消</button>
            <button type="button" class="btn label-danger" @click='deleteDepartmentUser'>删除</button>
          </div>
        </modal>
        <modal title="修改部门" :show.sync="showEditDepartment" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">名称</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="departmentEditing.name">
                </div>
              </div>
            </div>
          </div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showEditDepartment = false'>取消</button>
            <button type="button" class="btn btn-success" @click='updateDepartment'>更新</button>
          </div>
        </modal>
        <modal title="新增部门" :show.sync="showAddDepartment" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">上级部门</label>
                <div class="col-sm-10">
                  <input class="form-control" disabled v-model="treeNode.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">名称</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="departmentEditing.name">
                </div>
              </div>
            </div>
          </div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showAddDepartment = false'>取消</button>
            <button type="button" class="btn btn-success" @click='addDepartment'>确定</button>
          </div>
        </modal>
        <modal title="警告" :show.sync="showDeleteDepartment" effect="fade">
          <div slot="modal-body" class="modal-body">确认删除该部门? <br>请先确定已经删除了该部门所有用户!</div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showDeleteDepartment = false'>取消</button>
            <button type="button" class="btn label-danger" @click="deleteDepartment()">删除</button>
          </div>
        </modal>
        <modal title="新增用户" :show.sync="showAddUser" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">部门</label>
                <div class="col-sm-10">
                  <input class="form-control" disabled v-model="treeNode.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">姓名(必填)</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.username">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">手机号码</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.phone">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">身份证(必填)</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.id_card">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">一卡通</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.school_card">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">备注</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.remark">
                </div>
              </div>
            </div>
          </div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showAddUser = false'>取消</button>
            <button type="button" class="btn btn-success" @click='addUser'>确定</button>
          </div>
        </modal>
      </div>
    </div>
  </div>
</template>
<style>
  .department-box {
    overflow: auto;
    max-height: 576px;
  }

  .department-head {
    height: auto;
    width: auto;
  }

  .department-title {
    display: inline-block;
  }

  .department-dropdown {
    margin: 10px 0;
    list-style-type: none
  }

  .no-padding-left {
    padding-left: 0;
  }

  .no-padding-right {
    padding-right: 0;
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
        // modal data
        showEditUser: false,
        showAddUser: false,
        userEditing: {},
        showDeleteUser: false,
        showEditDepartment: false,
        showDeleteDepartment: false,
        showAddDepartment: false,
        departmentEditing: {},
        // tree setting
        setting: {
          data: {
            simpleData: {
              enable: true,
              idKey: 'id',
              pIdKey: 'parent_id',
              rootPId: 1
            }
          },
          callback: {
            onClick: onDepartmentSelected
          }
        },
        departmentList: [],
        treeNode: {},
        // table setting
        userList: [],
        columns: ['id', 'name', 'username', 'phone', 'id_card', 'school_card', 'remark'],
        options: {
          compileTemplates: true,
          highlightMatches: true,
          filterByColumn: true,
          filterable: ['name', 'username', 'phone', 'id_card', 'school_card'],
          texts: {
            filter: 'Search:',
            noResults: '暂无匹配',
            count: '共 {count} 条记录'
          },
          headings: {
            id: '编号',
            name: '姓名',
            username: '用户名',
            phone: '手机号码',
            id_card: '身份证',
            school_card: '一卡通',
            remark: '备注',
            edit: '编辑',
            delete: '删除'
          },
          templates: {
            edit: '<a class="label label-primary" href="javascript:void(0);" @click="$parent.toggleEditUser({id})">编辑</a></i></div>',
            delete: '<a class="label label-danger" href="javascript:void(0);" @click="$parent.toggleDeleteUser({id})">删除</a></i></div>'
          }
        }
      }
    },
    ready () {
      initContext(this)
      getDepartmentList(true)
    },
    methods: {
      refresh: function () {
        getDepartmentList(true)
        refreshUserList()
      },
      'toggleDeleteUser': function (id) {
        this.showDeleteUser = true
        this.userEditing.id = id
      },
      'toggleEditUser': function (id) {
        getUserEditing(id)
      },
      'deleteDepartmentUser': function () {
        this.showDeleteUser = false
        deleterUser(this.userEditing.id)
      },
      'updateUser': function () {
        updateUserInfo(this.userEditing.id, this.userEditing.name, this.userEditing.username, this.userEditing.phone, this.userEditing.id_card, this.userEditing.school_card, this.userEditing.remark)
      },
      'toggleDeleteDepartment': function () {
        this.showDeleteDepartment = true
      },
      'deleteDepartment': function () {
        deleteDepartment(this.treeNode.id)
      },
      'toggleEditDepartment': function () {
        this.showEditDepartment = true
        this.departmentEditing = this.treeNode
      },
      'updateDepartment': function () {
        updateDepartmentName(this.treeNode.id, this.departmentEditing.name)
      },
      'toggleAddDepartment': function () {
        this.departmentEditing = {}
        this.showAddDepartment = true
      },
      'addDepartment': function () {
        addDepartment(this.treeNode.id, this.departmentEditing.name)
      },
      'toggleAddUser': function () {
        this.showAddUser = true
        this.userEditing = {}
      },
      'addUser': function () {
        addUser(this.treeNode.id, this.userEditing.name, this.userEditing.username, this.userEditing.phone, this.userEditing.id_card, this.userEditing.school_card, this.userEditing.remark)
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getDepartmentList (expand) {
    Core.Api.DEPARTMENT.getList(1).then(function (data) {
      context.departmentList = data.department_list
      window.$.fn.zTree.init(window.$('#departmentTree'), context.setting, context.departmentList)
      if (expand) {
        var treeObj = window.$.fn.zTree.getZTreeObj('departmentTree')
        var nodes = treeObj.getNodes()
        if (data.department_list.length > 0) {
          treeObj.expandNode(nodes[0], true, false, true)
        }
      }
    }, function () {
      Core.Toast.error(context, '获取部门失败')
    })
  }

  function onDepartmentSelected (event, treeId, treeNode, clickFlag) {
    context.treeNode = treeNode
    getUserList(treeNode.id)
  }

  function getUserList (departmentId) {
    Core.Api.USER.getUserListByDepartment(departmentId).then(function (data) {
      context.userList = data.user_list
    })
  }

  function refreshUserList () {
    if (context.treeNode) {
      getUserList(context.treeNode.id)
    }
  }

  function getUserEditing (id) {
    Core.Api.USER.getUserDetail(id).then(function (data) {
      context.userEditing = data.user
      context.showEditUser = true
    }, function (error) {
      Core.Toast.error(context, '获取个人信息失败: ' + error.message)
    })
  }

  function deleterUser (id) {
    Core.Api.USER.deleteUser(id).then(function (data) {
      Core.Toast.success(context, '删除成功')
      getUserList(context.treeNode.id)
    }, function (error) {
      Core.Toast.error(context, '删除失败: ' + error.message)
    })
  }

  function updateUserInfo (id, name, username, phone, idCard, schoolCard, remark) {
    Core.Api.USER.updateUserInfo(id, name, username, phone, idCard, schoolCard, remark).then(function (data) {
      Core.Toast.success(context, '更新成功')
      context.showEditUser = false
      getUserList(context.treeNode.id)
    }, function (error) {
      Core.Toast.error(context, '更新失败: ' + error.message)
    })
  }

  function updateDepartmentName (id, name) {
    Core.Api.DEPARTMENT.updateName(id, name).then(function (data) {
      context.showEditDepartment = false
      Core.Toast.success(context, '部门重命名成功')
      getDepartmentList(true)
    }, function (error) {
      Core.Toast.error(context, '部门重命名失败: ' + error.message)
    })
  }

  function deleteDepartment (id) {
    if (id === 1) {
      context.showDeleteDepartment = false
      Core.Toast.error(context, '禁止删除根节点')
      return
    }
    Core.Api.DEPARTMENT.remove(id).then(function (data) {
      context.showDeleteDepartment = false
      Core.Toast.success(context, '删除成功')
      getDepartmentList(true)
    }, function (error) {
      Core.Toast.error(context, '删除失败: ' + error.message)
    })
  }

  function addDepartment (parentId, name) {
    Core.Api.DEPARTMENT.add(parentId, name).then(function (data) {
      context.showAddDepartment = false
      Core.Toast.success(context, '新增部门成功')
      getDepartmentList(true)
    }, function (error) {
      Core.Toast.error(context, '新增部门失败: ' + error.message)
    })
  }

  function addUser (departmentId, name, username, phone, idCard, schoolCard, remark) {
    Core.Api.USER.addUser(departmentId, name, username, phone, idCard, schoolCard, remark).then(function (data) {
      context.showAddUser = false
      Core.Toast.success(context, '新增用户成功')
      refreshUserList()
    }, function (error) {
      Core.Toast.error(context, '新增用户失败: ' + error.message)
    })
  }
</script>
