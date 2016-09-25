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
            <line-chart :data="waterData" height=200></line-chart>
          </div>
        </div>
        <div class="box box-danger">
          <div class="box-header with-border">
            <h4 class="box-title">用电</h4>
          </div>
          <div class="box-body">
            <line-chart :data="eleData" height=200></line-chart>
          </div>
        </div>
        <div class="box box-success">
          <div class="box-header with-border">
            <h4 class="box-title">用气</h4>
          </div>
          <div class="box-body">
            <line-chart :data="gasData" height=200></line-chart>
          </div>
        </div>
        <div class="box box-warning">
          <div class="box-header with-border">
            <h4 class="box-title">费用比例</h4>
          </div>
          <div class="box-body">
            <doughnut-chart :data="feeData" height=200></doughnut-chart>
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
  import Line from '../../widgets/chart/Line.vue'
  import Doughnut from '../../widgets/chart/Doughnut.vue'

  export default {
    components: {
      'content-header': ContentHeader,
      'line-chart': Line,
      'doughnut-chart': Doughnut
    },
    data () {
      return {
        waterData: {
          labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          datasets: [
            {
              label: '用水量',
              backgroundColor: '#00c0ef',
              data: [40, 39, 10, 40, 39, 80, 40, 50, 60, 40, 40, 30]
            }
          ]
        },
        eleData: {
          labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          datasets: [
            {
              label: '用电量',
              backgroundColor: '#dd4b39',
              data: [40, 39, 80, 40, 39, 80, 40, 50, 60, 40, 40, 30]
            }
          ]
        },
        gasData: {
          labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          datasets: [
            {
              label: '用气量',
              backgroundColor: '#00a65a',
              data: [40, 39, 60, 40, 49, 80, 40, 50, 30, 40, 40, 30]
            }
          ]
        },
        feeData: {
          labels: ['水费', '电费', '气费'],
          datasets: [
            {
              backgroundColor: [
                '#00c0ef',
                '#dd4b39',
                '#00a65a'
              ],
              data: [40, 20, 80]
            }
          ]
        },
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
