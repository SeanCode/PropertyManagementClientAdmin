<template>
  <!-- Content Header (Page header) -->
  <content-header parent="水电气录入" child="机构录入"></content-header>
  <!-- Main content -->
  <section class="content">
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
                </tr>
                <tr v-show="institution.id">
                  <td>{{institution.name}}</td>
                  <td>{{institution.people}}</td>
                  <td>{{institution.contact}}</td>
                  <td>{{institution.code}}</td>
                  <td>{{institution.description}}</td>
                  <td>{{institution.remark}}</td>
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
                  <th>备注</th>
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
                  <td>{{node.remark}}</td>
                </tr>
              </table>
            </div>
            <!-- table-->
          </div>
          <!--  boxbody -->
        </div>
        <!-- boxinfo -->
        <div class="well bg-aqua-gradient text-black">
          <label class="label la text-black">当前抄表时间为：</label>
        </div>
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
                  <th>备注</th>
                  <th>详情</th>
                  <th>更换</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="meter in meterNormalList">
                  <td>{{meter.name}}</td>
                  <td>{{meter.code}}</td>
                  <td>{{meter.type_name}}</td>
                  <td>{{meter.parent ? meter.parent.name : ''}}</td>
                  <td>{{meter.remark}}</td>
                  <td>
                    <a class="label label-primary" href="javascript:void(0);"
                       @click="toggleEditMeter(meter)">编辑</a>
                  </td>
                  <td>
                    <a class="label label-danger" href="javascript:void(0);"
                       @click="toggleReplaceMeter(meter)">更换</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <!-- /.table-responsive -->
          </div>
          <!-- /.box-body -->
          <div class="box-footer clearfix" style="display: block;"></div>
          <modal title="表信息" :show.sync="showEditMeter" effect="fade" width="800">
            <div slot="modal-body" class="modal-body">
              <div class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">名称</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled
                           v-model="meterEditing.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">编号</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled
                           v-model="meterEditing.code">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">类型</label>
                  <div class="col-sm-10">
                    <select class="form-control" disabled v-model="meterEditing.type">
                      <option value="1">水表</option>
                      <option value="2">电表</option>
                      <option value="3">气表</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">上级表名称</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled
                           placeholder="{{meterEditing.parent ? meterEditing.parent.name : ''}}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">初始起度</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" disabled v-model="meterEditing.begin">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">倍率</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" disabled v-model="meterEditing.rate">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">铭牌</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled v-model="meterEditing.nameplate">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">生产厂家</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled v-model="meterEditing.manufacturers">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">生产日期</label>
                  <div class="col-sm-10">
                    <date-picker disabled :time.sync="meterEditing.product_time"></date-picker>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">采购员</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled v-model="meterEditing.purchaser">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">采购日期</label>
                  <div class="col-sm-10">
                    <date-picker disabled :time.sync="meterEditing.buy_time"></date-picker>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">采购价格</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" disabled v-model="meterEditing.cost">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">备注</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.remark">
                  </div>
                </div>
              </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showEditMeter = false'>取消</button>
              <button type="button" class="btn btn-success" @click='updateMeter'>更新</button>
            </div>
          </modal>
          <modal title="换表 (请先录入并通过审核旧表数据)" :show.sync="showReplaceMeter" effect="fade" width="800">
            <div slot="modal-body" class="modal-body">
              <div class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">名称</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">编号</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.code">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">类型</label>
                  <div class="col-sm-10">
                    <select class="form-control" disabled v-model="meterEditing.type">
                      <option value="1">水表</option>
                      <option value="2">电表</option>
                      <option value="3">气表</option>
                      <option value="4">水表检查表</option>
                      <option value="5">电表检查表</option>
                      <option value="6">气表检查表</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">旧表止度 *</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" v-model="meterEditing.end">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">新表起度</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" v-model="meterEditing.begin">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">倍率 *</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" v-model="meterEditing.rate">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">铭牌</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.nameplate">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">生产厂家</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.manufacturers">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">生产日期</label>
                  <div class="col-sm-10">
                    <date-picker :time.sync="meterEditing.product_time"></date-picker>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">采购员</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.purchaser">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">采购日期</label>
                  <div class="col-sm-10">
                    <date-picker :time.sync="meterEditing.buy_time"></date-picker>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">采购价格</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.cost">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">备注</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.remark">
                  </div>
                </div>
              </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showReplaceMeter = false'>取消</button>
              <button type="button" class="btn btn-success" @click='replaceMeter'>确定</button>
            </div>
          </modal>
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
                  <th>上级表名称</th>
                  <th>备注</th>
                  <th>详情</th>
                  <th>更换</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="meter in meterCheckList">
                  <td>{{meter.name}}</td>
                  <td>{{meter.code}}</td>
                  <td>{{meter.type_name}}</td>
                  <td>{{meter.parent ? meter.parent.name : ''}}</td>
                  <td>{{meter.remark}}</td>
                  <td>
                    <a class="label label-primary" href="javascript:void(0);"
                       @click="toggleEditMeter(meter)">编辑</a>
                  </td>
                  <td>
                    <a class="label label-danger" href="javascript:void(0);"
                       @click="toggleReplaceMeter(meter)">更换</a>
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
                  <th>上级表名称</th>
                  <th>表类型</th>
                  <th>表名称</th>
                  <th>表编号</th>
                  <th>备注</th>
                  <th>详情</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="meter in meterChildren">
                  <td>{{meter.parent ? meter.parent.name : ''}}</td>
                  <td>{{meter.type_name}}</td>
                  <td>{{meter.name}}</td>
                  <td>{{meter.code}}</td>
                  <td>{{meter.remark}}</td>
                  <td>
                    <a class="label label-primary" href="javascript:void(0);"
                       @click="toggleEditMeter(meter)">编辑</a>
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
  </section>
</template>
<style>
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'
  import Price from '../../widgets/Price.vue'
  import Modal from '../../widgets/Modal.vue'
  import DatePicker from '../../widgets/DatePicker.vue'

  export default {
    components: {
      'content-header': ContentHeader,
      'price': Price,
      'modal': Modal,
      'date-picker': DatePicker
    },
    data () {
      return {
        node: {},
        nodeList: [],
        institution: {},
        institutionList: [],
        meterEditing: {},
        meterNormalList: [],
        meterCheckList: [],
        meterChildren: [],
        showReplaceMeter: false,
        showEditMeter: false,
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
      },
      toggleReplaceMeter: function (meter) {
        this.meterEditing = meter
        this.showReplaceMeter = true
      },
      replaceMeter: function () {
        if (this.meterEditing.end === undefined) {
          Core.Toast.error(this, '请输入旧表止度')
          return
        }
        replaceMeter(this.meterEditing.id, this.meterEditing.name, this.meterEditing.type, this.meterEditing.code, this.meterEditing.rate, this.meterEditing.begin, this.meterEditing.end, this.meterEditing.nameplate, this.meterEditing.manufacturers, this.meterEditing.purchaser, this.meterEditing.cost, Core.Util.getTimestamp(this.meterEditing.buy_time), Core.Util.getTimestamp(this.meterEditing.product_time), this.meterEditing.remark)
      },
      toggleEditMeter: function (meter) {
        getMeterEditing(meter.id)
      },
      updateMeter: function () {
        updateMeterInfo(this.meterEditing.id, this.meterEditing.name, this.meterEditing.code, this.meterEditing.remark)
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
    getNodeDetail(treeNode)
    getOwnerByNode(treeNode.id)
    getMeterNormalList(treeNode)
    getMeterCheckList(treeNode)
    getMeterChildren(treeNode)
  }

  function replaceMeter (id, name, type, code, rate, begin, end, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark) {
    Core.Api.METER.replace(id, name, code, rate, begin, end, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark).then(function (data) {
      context.showReplaceMeter = false
      context.meterEditing = {}
      if (type > 3) {
        getMeterCheckList(context.node)
      } else {
        getMeterNormalList(context.node)
      }
      Core.Toast.success(context, '换表成功')
    }, function (error) {
      Core.Toast.error(context, '换表失败: ' + error.message)
    })
  }

  function getNodeDetail (treeNode) {
    Core.Api.NODE.getNodeDetail(treeNode.id).then(function (data) {
      context.node = data.node
    }, function (error) {
      Core.Toast.error(context, '获取节点该最新信息失败: ' + error.message)
    })
  }

  function getMeterNormalList (node) {
    Core.Api.METER.getNormalList(node.id).then(function (data) {
      context.meterNormalList = data.meter_normal_list
    }, function (error) {
      Core.Toast.error(context, '获取该节点主表失败: ' + error.message)
    })
  }

  function getMeterCheckList (node) {
    Core.Api.METER.getCheckList(node.id).then(function (data) {
      context.meterCheckList = data.meter_check_list
    }, function (error) {
      Core.Toast.error(context, '获取该节点检查表失败: ' + error.message)
    })
  }

  function getMeterChildren (node) {
    Core.Api.METER.getChildren(node.id).then(function (data) {
      context.meterChildren = data.meter_children
    }, function (error) {
      Core.Toast.error(context, '获取该节点分表失败: ' + error.message)
    })
  }

  function getMeterEditing (id) {
    Core.Api.METER.getMeterDetail(id).then(function (data) {
      context.meterEditing = data.meter
      context.showEditMeter = true
    }, function (error) {
      Core.Toast.error(context, '获取表信息失败: ' + error.message)
    })
  }

  function updateMeterInfo (id, name, code, remark) {
    Core.Api.METER.updateMeterInfo(id, name, code, remark).then(function (data) {
      context.showEditMeter = false
      context.meterEditing = {}
      getMeterNormalList(context.node)
      getMeterCheckList(context.node)
    }, function (error) {
      Core.Toast.error(context, '更新表信息失败: ' + error.message)
    })
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
