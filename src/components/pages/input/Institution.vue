<template>
  <div class="row">
    <div class="col-md-3">
      <price></price>
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
    <div class="col-md-9">
      <div class="box box-solid box-info">
        <div class="box-header with-border">
          <h3 class="box-title">机构信息</h3>
          <div class="box-tools pull-right">
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
            <table class="table ">
              <thead>
              <tr>
                <th>表名称</th>
                <th>表编号</th>
                <th>表类型</th>
                <th>本月起度</th>
                <th>本月止度</th>
                <th>单价</th>
                <th>用度</th>
                <th>费用</th>
              </tr>
              </thead>
              <tbody>

              <tr class="bg-red">
                <td>水表1(错误)</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td>
                  <input type="number" id="test"
                         class="popover-show text-black" data-container="body"
                         data-toggle="popover" data-placement="bottom"
                         data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                         data-trigger="focous"> <a href="#"
                                                   class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="bg-yellow">
                <td>水表1(警告)</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="bg-green">
                <td>水表1</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="">
                <td>水表1</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
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
      <!-- 主表信息 -->
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
            <table class="table no-margin">
              <thead>
              <tr>
                <th>表名称</th>
                <th>表编号</th>
                <th>表类型</th>
                <th>本月起度</th>
                <th>本月止度</th>
                <th>单价</th>
                <th>用度</th>
                <th>费用</th>
              </tr>
              </thead>
              <tbody>

              <tr class="bg-red">
                <td>水表1(错误)</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="bg-yellow">
                <td>水表1(警告)</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="bg-green">
                <td>水表1</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
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
  import Price from '../../widgets/price.vue'

  export default {
    components: {
      'price': Price
    },
    data () {
      return {
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
    }, function (error) {
      Core.Log.e(error)
      context.node = {}
    })
  }

  function onNodeSelected (event, treeId, treeNode, clickFlag) {
    context.node = treeNode
    getOwnerByNode(treeNode.id)
  }

  function getOwnerByNode (nodeId) {
    Core.Api.NODE_OWNER.getOwnerByNode(nodeId).then(function (data) {
      context.institution = data.node_owner.institution
    }, function (error) {
      Core.Log.e(error)
      context.institution = {}
    })
  }
</script>
