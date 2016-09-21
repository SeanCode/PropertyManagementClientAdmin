<template>
  <!-- Content Header (Page header) -->
  <content-header parent="统计" child="个人统计"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-3">
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">部门与个人</h3>
          </div>
          <div class="box-body" style="display: block;">
            <div class="user-tree-box">
              <ul id="userTree" class="ztree"></ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="box box-info">
          <div class="box-header with-border">
            <h4 class="box-title">用水</h4>
          </div>
          <div class="box-body">

          </div>
        </div>
        <div class="box box-danger">
          <div class="box-header with-border">
            <h4 class="box-title">用电</h4>
          </div>
          <div class="box-body">

          </div>
        </div>
        <div class="box box-success">
          <div class="box-header with-border">
            <h4 class="box-title">用气</h4>
          </div>
          <div class="box-body">

          </div>
        </div>
        <div class="box box-warning">
          <div class="box-header with-border">
            <h4 class="box-title">费用比例</h4>
          </div>
          <div class="box-body">

          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'

  export default {
    components: {
      'content-header': ContentHeader
    },
    data () {
      return {
        departmentList: [],
        user_tree_setting: {
          async: {
            enable: true,
            url: 'http://202.202.43.93:8080/api/private/v1/user/list-by-department',
            autoParam: ['id=department_id'],
            dataType: 'json',
            dataFilter: ajaxUserDataFilter
          },
          data: {
            keep: {
              parent: true
            },
            simpleData: {
              enable: true,
              idKey: 'id',
              pIdKey: 'parent_id',
              rootPId: 1
            }
          },
          callback: {
            onClick: onUserNodeSelected
          }
        }
      }
    },
    ready () {
      initContext(this)
      initUserTree()
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function ajaxUserDataFilter (treeId, parentNode, responseData) {
    if (!responseData || responseData.code !== 0 || responseData.data.user_list === undefined || responseData.data.user_list.length <= 0) {
      return null
    }
    return responseData.data.user_list
  }

  function initUserTree () {
    Core.Api.DEPARTMENT.getTreeList(1).then(function (data) {
      context.departmentList = data.department_list
      window.$.fn.zTree.init(window.$('#userTree'), context.user_tree_setting, context.departmentList)
      var treeObj = window.$.fn.zTree.getZTreeObj('userTree')
      var nodes = treeObj.getNodes()
      if (data.department_list.length > 0) {
        treeObj.expandNode(nodes[0], true, false, true)
      }
    })
  }

  function onUserNodeSelected (event, treeId, node, clickFlag) {
    Core.Toast.error(context, '暂无统计数据')
  }
</script>
