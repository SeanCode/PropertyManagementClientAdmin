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
              <input type="checkbox" id="isEditMode" v-model="isEditMode">
              <span>编辑模式</span>
              <div class='department-box'>
                <ul id='departmentTree' class='ztree'></ul>
              </div>
            </div>
            <div class='col-md-9 no-padding-left'>
              <v-client-table :data='userList' :columns='columns' :options='options'
                              class='user-list-table'></v-client-table>
            </div>
          </div>
        </div>
        <modal title="修改个人信息" :show.sync="showEditModal" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="modelEditing.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="modelEditing.username">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">手机号码</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="modelEditing.phone">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">身份证</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="modelEditing.id_card">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">一卡通</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="modelEditing.school_card">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">备注</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="modelEditing.remark">
                </div>
              </div>
            </div>
          </div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showEditModal = false'>取消</button>
            <button type="button" class="btn btn-success" @click='updateUser'>更新</button>
          </div>
        </modal>
        <modal title="警告" :show.sync="showDeleteModal" effect="fade">
          <div slot="modal-body" class="modal-body">确认删除?</div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showDeleteModal = false'>取消</button>
            <button type="button" class="btn label-danger" @click='delete'>删除</button>
          </div>
        </modal>
      </div>
    </div>
  </div>
</template>
<style>
  .department-box {
    overflow: scroll;
    max-height: 556px;
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
        showEditModal: false,
        modelEditing: {},
        showDeleteModal: false,
        isEditMode: false,
        setting: {
          view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false
          },
          data: {
            simpleData: {
              enable: true,
              idKey: 'id',
              pIdKey: 'parent_id',
              rootPId: 1
            }
          },
          edit: {
            enable: true,
            drag: {
              autoExpandTrigger: false
            }
          },
          callback: {
            beforeRemove: beforeDepartmentNodeRemove,
            beforeRename: beforeDepartmentNodeRename,
            onClick: onDepartmentSelected
          }
        },
        departmentList: [],
        userList: [],
        columns: ['id', 'name', 'username', 'phone', 'id_card', 'school_card'],
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
            edit: '编辑',
            delete: '删除'
          },
          templates: {
            edit: '<a class="label label-primary" href="javascript:void(0);" @click="$parent.toggleEditModal({id})">编辑</a></i></div>',
            delete: '<a class="label label-danger" href="javascript:void(0);" @click="$parent.toggleDeleteModal({id})">删除</a></i></div>'
          }
        }
      }
    },
    ready () {
      initContext(this)
      getDepartmentList(true)
      this.$watch('isEditMode', function (value) {
        setEdit(value)
      })
    },
    methods: {
      refresh: function () {
        getDepartmentList(true)
        refreshUserList()
      },
      'toggleDeleteModal': function (id) {
        this.showDeleteModal = true
        this.modelEditing.id = id
      },
      'toggleEditModal': function (id) {
        getUserEditing(id)
      },
      'delete': function () {
        this.showDeleteModal = false
        deleterUser(this.modelEditing.id)
      },
      'updateUser': function () {
        updateUserInfo(this.modelEditing.id, this.modelEditing.name, this.modelEditing.username, this.modelEditing.phone, this.modelEditing.id_card, this.modelEditing.school_card, this.modelEditing.remark)
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function setEdit (checked) {
    var zTree = window.$.fn.zTree.getZTreeObj('departmentTree')
    zTree.setting.edit.showRemoveBtn = checked
    zTree.setting.edit.showRenameBtn = checked
    zTree.setting.edit.removeTitle = '删除'
    zTree.setting.edit.renameTitle = '重命名'
  }

  function getDepartmentList (expand) {
    Core.Api.DEPARTMENT.getList(1).then(function (data) {
      context.departmentList = data.department_list
      window.$.fn.zTree.init(window.$('#departmentTree'), context.setting, context.departmentList)
      setEdit(context.isEditMode)
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

  function beforeDepartmentNodeRemove (treeId, treeNode) {
    if (treeNode.id === 1) {
      window.alert('不可删除根节点')
      return false
    }
    var zTree = window.$.fn.zTree.getZTreeObj('departmentTree')
    zTree.selectNode(treeNode)
    return window.confirm('确认删除节点 ' + treeNode.name + ' ? 请谨慎操作!')
  }

  function beforeDepartmentNodeRename (treeId, treeNode, newName, isCancel) {
    if (!isCancel && treeNode.name !== newName) {
      Core.Api.DEPARTMENT.updateName(treeNode.id, newName).then(function (data) {
      }, function (error) {
        Core.Log.w(error)
        var zTree = window.$.fn.zTree.getZTreeObj('departmentTree')
        zTree.editName(treeNode)
        getDepartmentList(true)
      })
    } else {
      var zTree = window.$.fn.zTree.getZTreeObj('departmentTree')
      zTree.cancelEditName()
    }
    return true
  }

  function addHoverDom (treeId, treeNode) {
    var sObj = window.$('#' + treeNode.tId + '_span')
    var zTree = window.$.fn.zTree.getZTreeObj('departmentTree')

    if (!zTree.setting.edit.showRemoveBtn || treeNode.editNameFlag || window.$('#addBtn_' + treeNode.tId).length > 0) {
      return
    }
    var addStr = '<span class="button add" id=' + 'addBtn_' + treeNode.tId + ' title="新增" onfocus="this.blur()"></span>'
    sObj.after(addStr)
    var btn = window.$('#addBtn_' + treeNode.tId)
    if (btn) {
      btn.bind('click', function () {
        Core.Toast.success(context, '新增部门成功')
        return false
      })
    }
  }

  function removeHoverDom (treeId, treeNode) {
    window.$('#addBtn_' + treeNode.tId).unbind().remove()
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
      context.modelEditing = data.user
      context.showEditModal = true
    }, function (error) {
      Core.Toast.error(context, '获取个人信息失败: ' + error.message)
    })
  }

  function deleterUser (id) {
    Core.Api.USER.deleteUser(id).then(function (data) {
      getUserList(context.treeNode.id)
    }, function (error) {
      Core.Toast.error(context, '删除失败: ' + error.message)
    })
  }

  function updateUserInfo (id, name, username, phone, idCard, schoolCard, remark) {
    Core.Api.USER.updateUserInfo(id, name, username, phone, idCard, schoolCard, remark).then(function (data) {
      context.showEditModal = false
      getUserList(context.treeNode.id)
    }, function (error) {
      Core.Toast.error(context, '更新失败: ' + error.message)
    })
  }

</script>
