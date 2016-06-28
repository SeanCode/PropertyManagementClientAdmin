<template>
  <div class="row">
    <div class="col-md-3">
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">机构</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" @click="refreshTable()">
              <i class="fa fa-refresh"></i>
            </button>
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" style="display: block;">
          <v-client-table :data='institutionList' :columns='columns' :options='options'
                          class='institution-list-table'></v-client-table>
        </div>
        <!--  boxbody -->
      </div>
      <!-- boxinfo -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">机构节点</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" @click="refreshNodeTree()">
              <i class="fa fa-refresh"></i>
            </button>
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" style="display: block;">
          <div class="institution-tree-box">
            <ul id="nodeInstitutionTree" class="ztree"></ul>
          </div>
        </div>
        <!--  boxbody -->
      </div>
      <!-- boxinfo -->
    </div>
    <div class="col-md-9" id="panel">
      <div class="box box-solid box-info">
        <div class="box-header with-border">
          <h3 class="box-title">机构信息</h3>
          <div class="box-tools pull-right">
            <button v-show="institution&&(!node.id)" class="btn btn-box-tool">
              <i class="fa fa-suitcase" title="入住"></i>
            </button>
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" style="display: block;">
          <div class="table-responsive">
            <table class="table no-margin">
              <tr>
                <th>名称</th>
                <th>负责人</th>
                <th>联系方式</th>
                <th>组织机构代码</th>
                <th>描述</th>
                <th>备注</th>
                <th>操作</th>
              </tr>
              <tr v-show="institution.id">
                <td>{{institution.name}}</td>
                <td>{{institution.people}}</td>
                <td>{{institution.contact}}</td>
                <td>{{institution.code}}</td>
                <td>{{institution.description}}</td>
                <td>{{institution.remark}}</td>
                <td>
                  <a class="label label-danger" href="javascript:void(0);">编辑</a>
                </td>
              </tr>
            </table>
          </div>

        </div>
        <!--  boxbody -->
      </div>
      <!-- boxinfo -->
      <div class="box box-solid box-info">
        <div class="box-header with-border">
          <h3 class="box-title">节点信息</h3>
          <div class="box-tools pull-right">
            <button v-show="node.id&&!institution.id" class="btn btn-box-tool">
              <i class="fa fa-user" title="入住"></i>
            </button>
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
              <tr v-show="node.id">
                <td>{{node.name}}</td>
                <td>{{node.code}}</td>
                <td>{{node.path}}</td>
                <td>{{node.type_name}}</td>
                <td>{{node.area}}</td>
                <td>{{node.price}}</td>
                <td>{{node.fee}}</td>
                <td>{{node.area * node.price + node.fee}}</td>
                <td>{{node.ownership}}</td>
                <td>{{node.contract}}</td>
                <td>{{node.remark}}</td>
                <td>
                  <a class="label label-danger" href="javascript:void(0);">编辑</a>
                </td>
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
                <th>上级表名称</th>
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
              <tr v-for="meter in meterNormalList">
                <td>{{meter.name}}</td>
                <td>{{meter.code}}</td>
                <td>{{meter.type_name}}</td>
                <td>{{meter.parent ? meter.parent.name : ''}}</td>
                <td>{{meter.begin}}</td>
                <td>{{meter.nameplate}}</td>
                <td>{{meter.manufacturers}}</td>
                <td>{{new Date(meter.product_time * 1000).toLocaleDateString()}}</td>
                <td>{{meter.purchaser}}</td>
                <td>{{new Date(meter.buy_time * 1000).toLocaleDateString()}}</td>
                <td>{{meter.cost}}</td>
                <td>{{meter.remark}}</td>
                <td>
                  <a class="label label-danger" href="javascript:void(0);">编辑</a>
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
                <th>主表名称</th>
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
              <tr v-for="meter in meterCheckList">
                <td>{{meter.name}}</td>
                <td>{{meter.code}}</td>
                <td>{{meter.type_name}}</td>
                <td>{{meter.parent ? meter.parent.name : ''}}</td>
                <td>{{meter.begin}}</td>
                <td>{{meter.nameplate}}</td>
                <td>{{meter.manufacturers}}</td>
                <td>{{new Date(meter.product_time * 1000).toLocaleDateString()}}</td>
                <td>{{meter.purchaser}}</td>
                <td>{{new Date(meter.buy_time * 1000).toLocaleDateString()}}</td>
                <td>{{meter.cost}}</td>
                <td>{{meter.remark}}</td>
                <td>
                  <a class="label label-danger" href="javascript:void(0);">编辑</a>
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
          <h3 class="box-title">分表信息</h3>
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
                <th>上级表名称</th>
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
              <tr v-for="meter in meterChildren">
                <td>{{meter.name}}</td>
                <td>{{meter.code}}</td>
                <td>{{meter.type_name}}</td>
                <td>{{meter.parent ? meter.parent.name : ''}}</td>
                <td>{{meter.begin}}</td>
                <td>{{meter.nameplate}}</td>
                <td>{{meter.manufacturers}}</td>
                <td>{{new Date(meter.product_time * 1000).toLocaleDateString()}}</td>
                <td>{{meter.purchaser}}</td>
                <td>{{new Date(meter.buy_time * 1000).toLocaleDateString()}}</td>
                <td>{{meter.cost}}</td>
                <td>{{meter.remark}}</td>
                <td>
                  <a class="label label-danger" href="javascript:void(0);">编辑</a>
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
    </div>
  </div>
</template>
<style>
</style>
<script>
  import Core from '../../../core/core'

  export default {
    data () {
      return {
        meterNormalList: [],
        meterCheckList: [],
        meterChildren: [],
        node: {},
        institution: {},
        institutionList: [],
        columns: ['id', 'name'],
        options: {
          highlightMatches: true,
          filterByColumn: true,
          filterable: ['name'],
          texts: {
            filter: 'Search:',
            noResults: '暂无匹配',
            count: '共 {count} 条记录'
          },
          onRowClick: function (row) {
            onInstitutionRowClick(row)
          },
          headings: {
            id: '编号',
            name: '名称'
          }
        },
        node_setting: {
          async: {
            enable: true,
            url: 'http://localhost:8080/api/private/v1/node/children',
            autoParam: ['id'],
            otherParam: {'type': '3'},
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
      initContext(this)
      getInstitutionList()
      initNodeTree()
    },
    methods: {
      refreshTable: function () {
        getInstitutionList()
      },
      refreshNodeTree: function () {
        initNodeTree()
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

  function getInstitutionList () {
    Core.Api.INSTITUTION.getInstitutionList().then(function (data) {
      context.institutionList = data.institution_list
    }, function (error) {
      Core.Log.e(error)
    })
  }

  function initNodeTree () {
    Core.Api.NODE.getNodeTreeRoot().then(function (data) {
      context.nodeList = data.tree_root
      window.$.fn.zTree.init(window.$('#nodeInstitutionTree'), context.node_setting, context.nodeList)
      var treeObj = window.$.fn.zTree.getZTreeObj('nodeInstitutionTree')
      var nodes = treeObj.getNodes()
      if (data.tree_root) {
        treeObj.expandNode(nodes[0], true, false, true)
      }
    }, function (error) {
      Core.Log.e(error)
    })
  }

  function onInstitutionRowClick (institution) {
    context.institution = institution
    getNodeByOwner(institution.id, Core.Const.TYPE.OWNER_TYPE_INSTITUTION)
  }

  function getNodeByOwner (ownerId, ownerType) {
    Core.Api.NODE_OWNER.getNodeByOwner(ownerId, ownerType).then(function (data) {
      var node = data.node_owner.node
      context.node = node
      getMeterNormalList(node)
      getMeterCheckList(node)
      getMeterChildren(node)
    }, function (error) {
      Core.Log.e(error)
      context.node = {}
    })
  }

  function onNodeSelected (event, treeId, treeNode, clickFlag) {
    context.node = treeNode
    getOwnerByNode(treeNode.id)
    getMeterNormalList(treeNode)
    getMeterCheckList(treeNode)
    getMeterChildren(treeNode)
  }

  function getOwnerByNode (nodeId) {
    Core.Api.NODE_OWNER.getOwnerByNode(nodeId).then(function (data) {
      context.institution = data.node_owner.institution
    }, function (error) {
      Core.Log.e(error)
      context.institution = {}
    })
  }

  function getMeterNormalList (node) {
    Core.Api.METER.getNormalList(node.id).then(function (data) {
      context.meterNormalList = data.meter_normal_list
    }, function (error) {
      Core.Log.e(error)
    })
  }

  function getMeterCheckList (node) {
    Core.Api.METER.getCheckList(node.id).then(function (data) {
      context.meterCheckList = data.meter_check_list
    }, function (error) {
      Core.Log.e(error)
    })
  }

  function getMeterChildren (node) {
    Core.Api.METER.getChildren(node.id).then(function (data) {
      context.meterChildren = data.meter_children
    }, function (error) {
      Core.Log.e(error)
    })
  }
</script>
