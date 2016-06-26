<template>
  <div class="row">
    <div class='col-md-12'>
      <div class='box box-info' id='box-groups'>
        <div class='box-header with-border'>
          <h3 class='box-title'>节点管理</h3>
          <div class='box-tools pull-right'>
            <button class='btn btn-box-tool' @click='refresh'>
              <i class='fa fa-refresh'></i>
            </button>
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="box-body" style="display: block;">
          <div class="row">
            <div class='col-md-3 no-padding-right'>
              <div class='node-box'>
                <ul id='nodeTree' class='ztree'></ul>
              </div>
            </div>
            <div class='col-md-9 no-padding-left'>
              <div class="box box-solid box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">节点信息</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse">
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body" style="display: block;">
                  <div class="table-responsive">
                    <table class="table no-margin table200">
                      <tr>
                        <th>节点名</th>
                        <th>地址编号</th>
                        <th>完整地址</th>
                        <th>类型</th>
                        <th>房间面积(平方米)</th>
                        <th>物管价(元/每平方米)</th>
                        <th>其他费用</th>
                        <th>物管费(元)</th>
                        <th>所有权</th>
                        <th>租房合同</th>
                        <th>备注</th>
                        <th>操作</th>
                      </tr>
                      <tr>
                        <td>{{node.name}}</td>
                        <td>{{node.code}}</td>
                        <td>{{node.path}}</td>
                        <td>{{node.type}}</td>
                        <td>{{node.area}}</td>
                        <td>{{node.price}}</td>
                        <td>{{node.fee}}</td>
                        <td>{{node.area * node.price + node.fee}}</td>
                        <td>{{node.ownership}}</td>
                        <td>{{node.contract}}</td>
                        <td>{{node.remark}}</td>
                        <td v-show="node.id"><a class="label label-danger" href="javascript:void(0);"
                                                @click="editNode()">修改</a></td>
                      </tr>
                    </table>
                  </div>
                  <!-- table-->
                </div>
                <!--  boxbody -->
              </div>
              <!-- boxinfo -->
              <div class="box box-solid box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">主表信息</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse">
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body" style="display: block;">
                  <div class="table-responsive">
                    <table class="table no-margin table200">
                      <thead>
                      <tr>
                        <th>表名称</th>
                        <th>表编号</th>
                        <th>表类型</th>
                        <th>上级表编号</th>
                        <th>初始表起度</th>
                        <th>铭牌号</th>
                        <th>生产厂家</th>
                        <th>生产日期</th>
                        <th>采购员</th>
                        <th>采购日期</th>
                        <th>采购价格</th>
                        <th>备注</th>
                        <th>操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="meter in normalMeterList">
                        <td>{{meter.name}}</td>
                        <td>{{meter.code}}</td>
                        <td>{{meter.type}}</td>
                        <td>{{meter.parent}}</td>
                        <td>{{meter.zore}}</td>
                        <td>{{meter.mingpai}}</td>
                        <td>{{meter.provider}}</td>
                        <td>{{meter.birthday}}</td>
                        <td>{{meter.who}}</td>
                        <td>{{meter.when}}</td>
                        <td>{{meter.paid}}</td>
                        <td>{{meter.info}}</td>
                        <td>
                          <a class="label label-danger "
                             href="javascript:void(0);" @click="showUpdMeter($index)">修改</a>
                          <a class="label label-danger" href="javascript:void(0);"
                             @click="showChangeMeter($index)">换表</a>
                          <a class="label label-danger" href="javascript:void(0);"
                             @click="showDiv($index)">设置主表</a>
                          <a class="label label-danger" href="javascript:void(0);"
                             @click="showNewCheck($index)">添加检查表</a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- /.table-responsive -->
                </div>
                <!-- /.box-body -->
                <div class="box-footer clearfix" style="display: block;"></div>
                <!-- /.box-footer -->
              </div>
              <div class="box box-solid box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">检查表信息</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse">
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body" style="display: block;">
                  <div class="table-responsive ">
                    <table class="table no-margin table200">
                      <thead>
                      <tr>
                        <th>表名称</th>
                        <th>表编号</th>
                        <th>表类型</th>
                        <th>上级表</th>
                        <th>初始表起度</th>
                        <th>表铭牌号</th>
                        <th>生产厂家</th>
                        <th>生产日期</th>
                        <th>采购员</th>
                        <th>采购日期</th>
                        <th>采购价格</th>
                        <th>备注</th>
                        <th>操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="meter in checkMeterList">
                        <td>{{meter.name}}</td>
                        <td>{{meter.code}}</td>
                        <td>{{meter.type}}</td>
                        <td>{{meter.parent}}</td>
                        <td>{{meter.zore}}</td>
                        <td>{{meter.mingpai}}</td>
                        <td>{{meter.provider}}</td>
                        <td>{{meter.birthday}}</td>
                        <td>{{meter.who}}</td>
                        <td>{{meter.when}}</td>
                        <td>{{meter.paid}}</td>
                        <td>{{meter.info}}</td>
                        <td><a class="label label-danger"
                               href="javascript:void(0);" @click="showUpdCheck($index)">修改</a>
                          <a class="label label-danger" href="javascript:void(0);"
                             @click="showChangeCheck($index)">换表</a></td>

                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- /.table-responsive -->
                </div>
                <!-- /.box-body -->
                <div class="box-footer clearfix" style="display: block;"></div>
                <!-- /.box-footer -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .node-box {
    overflow: scroll;
    max-height: 556px;
  }
</style>
<script>
  import Core from '../../../../core/core'

  export default {
    data () {
      return {
        setting: {
          async: {
            enable: true,
            url: 'http://localhost:8080/api/private/v1/node/children',
            autoParam: ['id'],
            dataType: 'json',
            dataFilter: ajaxDataFilter
          },
          data: {
            keep: {
              parent: true
            }
          },
          callback: {
            onClick: onNodeSelected
          },
          edit: {
            enable: true,
            drag: {
              autoExpandTrigger: false
            },
            removeTitle: '删除',
            renameTitle: '重命名',
            showRemoveBtn: showRemoveBtn
          }
        },
        nodeList: [],
        node: {},
        normalMeterList: [],
        checkMeterList: []
      }
    },
    ready () {
      initContext(this)
      initNodeTree()
    },
    methods: {
      refresh: function () {
        initNodeTree()
      },
      editNode: function () {
        Core.Log.d(this.node.name)
      }
    }
  }

  function ajaxDataFilter (treeId, parentNode, responseData) {
    if (!responseData || responseData.code !== 0 || responseData.data.children.length <= 0) {
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
    context.node = treeNode
    getMeterListByNodeId(treeNode)
  }

  function getMeterListByNodeId (node) {
  }

  function showRemoveBtn (treeId, treeNode) {
    return treeNode.id !== 1
  }

</script>
