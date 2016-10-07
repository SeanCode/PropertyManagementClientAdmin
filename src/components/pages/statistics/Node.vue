<template>
  <!-- Content Header (Page header) -->
  <content-header parent="统计" child="节点统计"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-3">
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">节点</h3>
          </div>
          <div class="box-body" style="display: block;">
            <div class="node-tree-box">
              <ul id="nodeTree" class="ztree"></ul>
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
        chart: {
          foo: 'bar'
        },
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
              label: '用电量',
              backgroundColor: '#00a65a',
              data: [40, 39, 20, 40, 39, 70, 40, 50, 80, 40, 40, 30]
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
        setting: {
          view: {
            selectedMulti: false
          },
          async: {
            enable: true,
            url: 'http://202.202.43.93:8080/api/private/v1/node/children',
            autoParam: ['id'],
            dataType: 'json',
            dataFilter: ajaxNodeDataFilter
          },
          data: {
            keep: {
              parent: true
            }
          },
          edit: {
            enable: false
          },
          callback: {
            onClick: onNodeSelected
          }
        }
      }
    },
    ready () {
      initContext(this)
      initNodeTree()
    }
  }

  function ajaxNodeDataFilter (treeId, parentNode, responseData) {
    if (!responseData || responseData.code !== 0 || responseData.data.children === undefined || responseData.data.children.length <= 0) {
      return null
    }
    return responseData.data.children
  }

  var context

  function initContext (c) {
    context = c
  }

  function initNodeTree () {
    Core.Api.NODE.getNodeTreeRoot().then(function (data) {
      context.nodeList = data.tree_root
      window.$.fn.zTree.init(window.$('#nodeTree'), context.setting, context.nodeList)
      var treeObj = window.$.fn.zTree.getZTreeObj('nodeTree')
      var nodes = treeObj.getNodes()
      if (data.tree_root) {
        treeObj.expandNode(nodes[0], true, false, true)
      }
    }, function (error) {
      Core.Log.e(error)
    })
  }

  function onNodeSelected (event, treeId, treeNode, clickFlag) {
    getStatWaterData(treeNode.id)
    getStatEleData(treeNode.id)
    getStatGasData(treeNode.id)
  }

  function getStatWaterData (nodeId) {
    Core.Api.STAT.getStatByNode(nodeId, 1).then(function (data) {
      data.stat_list[0].backgroundColor = '#ecf0f5'
      data.stat_list[1].backgroundColor = '#00c0ef'
      context.waterData.datasets = data.stat_list
    }, function (error) {
      Core.Toast.error(context, '获取统计数据失败: ' + error.message)
    })
  }

  function getStatEleData (nodeId) {
    Core.Api.STAT.getStatByNode(nodeId, 2).then(function (data) {
      data.stat_list[0].backgroundColor = '#ecf0f5'
      data.stat_list[1].backgroundColor = '#dd4b39'
      context.eleData.datasets = data.stat_list
    }, function (error) {
      Core.Toast.error(context, '获取统计数据失败: ' + error.message)
    })
  }

  function getStatGasData (nodeId) {
    Core.Api.STAT.getStatByNode(nodeId, 3).then(function (data) {
      data.stat_list[0].backgroundColor = '#ecf0f5'
      data.stat_list[1].backgroundColor = '#00a65a'
      context.gasData.datasets = data.stat_list
    }, function (error) {
      Core.Toast.error(context, '获取统计数据失败: ' + error.message)
    })
  }
</script>
