<template>
  <!-- Content Header (Page header) -->
  <content-header parent="打印" child="报表"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-3">
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">节点</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse">
                <i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="display: block;">
            <div class="nod-tree-box">
              <ul id="nodeTree" class="ztree"></ul>
            </div>
          </div>
          <!--  boxbody -->
        </div>
        <!-- boxinfo -->
      </div>
      <div class="col-md-9" id="panel">
        <div class="box box-solid">
          <div class="box-header">
            <h2 class="page-header">
              <i class="fa fa-globe"></i> 物业管理中心
              <small class="pull-right">Date: {{today()}}</small>
            </h2>
          </div>
          <div class="box-body" style="display: block;">
          </div>
          <div class="box-footer text-center">
            <button class="btn btn-default">
              <i class="fa fa-print"></i> 打印
            </button>
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
        // 节点树相关
        node: {}, // 当前选中节点
        nodeList: [], // 用于显示节点树
        node_setting: { // 节点树的配置
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
          callback: {
            onClick: onNodeSelected
          }
        }
      }
    },
    ready () {
      Core.Toast.info(this, '暂无数据,无法生成报表')
      initContext(this)
      initNodeTree()
    },
    methods: {
      today: function () {
        return Core.Util.date('Y-m-d', new Date().getTime() / 1000)
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function ajaxNodeDataFilter (treeId, parentNode, responseData) {
    if (!responseData || responseData.code !== 0 || responseData.data.children === undefined || responseData.data.children.length <= 0) {
      return null
    }
    return responseData.data.children
  }

  function initNodeTree () {
    Core.Api.NODE.getNodeTreeRoot().then(function (data) {
      context.nodeList = data.tree_root
      window.$.fn.zTree.init(window.$('#nodeTree'), context.node_setting, context.nodeList)
      var treeObj = window.$.fn.zTree.getZTreeObj('nodeTree')
      var nodes = treeObj.getNodes()
      if (data.tree_root) {
        treeObj.expandNode(nodes[0], true, false, true)
      }
    }, function (error) {
      Core.Toast.error(context, '获取节点树失败')
      Core.Log.e(error)
    })
  }

  function onNodeSelected (event, treeId, treeNode, clickFlag) {
    context.node = treeNode
  }
</script>
