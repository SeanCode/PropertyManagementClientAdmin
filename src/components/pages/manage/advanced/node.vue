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
                  <h3 class="box-title">机构信息</h3>
                  <div class="box-tools pull-right">
                    <button v-show="institution.id" class="btn btn-box-tool">
                      <i class="fa fa-sing-out" title="搬出"></i>
                    </button>
                    <button v-show="!institution.id" class="btn btn-box-tool">
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
                          <a class="label label-primary" href="javascript:void(0);">编辑</a>
                        </td>
                      </tr>
                    </table>
                  </div>

                </div>
                <!--  boxbody -->
              </div>
              <div class="box box-solid box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">个人信息</h3>
                  <div class="box-tools pull-right">
                    <button v-show="users.length>0" class="btn btn-box-tool">
                      <i class="fa fa-sing-out" title="搬出"></i>
                    </button>
                    <button v-show="users.length==0" class="btn btn-box-tool">
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
                        <th>姓名</th>
                        <th>部门</th>
                        <th>电话</th>
                        <th>一卡通</th>
                        <th>身份证</th>
                        <th>备注</th>
                        <th>操作</th>
                      </tr>
                      <tr v-for="user in users">
                        <td>{{user.name}}</td>
                        <td>{{user.department}}</td>
                        <td>{{user.phone}}</td>
                        <td>{{user.school_card}}</td>
                        <td>{{user.id_card}}</td>
                        <td>{{user.remark}}</td>
                        <td>
                          <a class="label label-primary" href="javascript:void(0);">编辑</a>
                        </td>
                      </tr>
                    </table>
                  </div>

                </div>
                <!--  boxbody -->
              </div>
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
                        <td>{{node.remark}}</td>
                        <td>
                          <a class="label label-primary" href="javascript:void(0);"
                             @click="toggleEditNode()">编辑</a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- table-->
                </div>
                <!--  boxbody -->
                <modal title="修改节点信息" :show.sync="showEditNode" effect="fade" width="800">
                  <div slot="modal-body" class="modal-body">
                    <div class="form-horizontal">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">名称</label>
                        <div class="col-sm-10">
                          <input class="form-control" v-model="nodeEditing.name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">编号</label>
                        <div class="col-sm-10">
                          <input class="form-control" v-model="nodeEditing.code">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">完整地址</label>
                        <div class="col-sm-10">
                          <input class="form-control" v-model="nodeEditing.path">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">类型</label>
                        <div class="col-sm-10">
                          <select class="form-control" v-model="nodeEditing.type">
                            <option value="1">一般</option>
                            <option value="2">房间</option>
                            <option value="3">机构</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">面积</label>
                        <div class="col-sm-10">
                          <input class="form-control" type="number" v-model="nodeEditing.area">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">物管单价</label>
                        <div class="col-sm-10">
                          <input class="form-control" type="number" v-model="nodeEditing.price">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">其他费用</label>
                        <div class="col-sm-10">
                          <input class="form-control" type="number" v-model="nodeEditing.fee">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">所有权</label>
                        <div class="col-sm-10">
                          <input class="form-control" v-model="nodeEditing.ownership">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">备注</label>
                        <div class="col-sm-10">
                          <input class="form-control" v-model="nodeEditing.contract">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div slot="modal-footer" class="modal-footer">
                    <button type="button" class="btn btn-default" @click='showEditNode = false'>取消</button>
                    <button type="button" class="btn btn-success" @click='updateNode'>更新</button>
                  </div>
                </modal>
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
                <modal title="修改表信息" :show.sync="showEditMeter" effect="fade" width="800">
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
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">上级表名称</label>
                        <div class="col-sm-10">
                          <input class="form-control" disabled v-model="meterEditing.parent.name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">初始起度</label>
                        <div class="col-sm-10">
                          <input class="form-control" disabled v-model="meterEditing.begin">
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
                          <input class="form-control" disabled v-model="meterEditing.product_time">
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
                          <input class="form-control" disabled v-model="meterEditing.buy_time">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-2 control-label">采购价格</label>
                        <div class="col-sm-10">
                          <input class="form-control" disabled v-model="meterEditing.cost">
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
                          <a class="label label-primary" href="javascript:void(0);">编辑</a>
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
                          无
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
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .node-box {
    overflow: scroll;
    max-height: 100%;
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
        showEditNode: false,
        nodeEditing: {},
        showEditMeter: false,
        meterEditing: {},
        setting: {
          view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false
          },
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
          }
        },
        nodeList: [],
        node: {},
        users: [],
        institution: {},
        meterNormalList: [],
        meterCheckList: [],
        meterChildren: []
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
      toggleEditNode: function () {
        getNodeEditing(this.node.id)
      },
      updateNode: function () {
        updateNodeInfo(this.nodeEditing.id, this.nodeEditing.name, this.nodeEditing.code, this.nodeEditing.path, this.nodeEditing.type, this.nodeEditing.area, this.nodeEditing.price, this.nodeEditing.fee, this.nodeEditing.ownership, this.nodeEditing.remark)
      },
      toggleEditMeter: function (meter) {
        getMeterEditing(meter.id)
      },
      updateMeter: function () {
        updateMeterInfo(this.meterEditing.id, this.meterEditing.name, this.meterEditing.code, this.meterEditing.remark)
      }
    }
  }

  function ajaxDataFilter (treeId, parentNode, responseData) {
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

  function addHoverDom (treeId, treeNode) {
    var sObj = window.$('#' + treeNode.tId + '_span')
    var zTree = window.$.fn.zTree.getZTreeObj('nodeTree')
    if (!zTree.setting.edit.showRemoveBtn || treeNode.editNameFlag || window.$('#addBtn_' + treeNode.tId).length > 0) {
      return
    }
    var addStr = '<span class="button add" id=' + 'addBtn_' + treeNode.tId + ' title="新增" onfocus="this.blur()"></span>'
    sObj.after(addStr)
    var btn = window.$('#addBtn_' + treeNode.tId)
    if (btn) {
      btn.bind('click', function () {
        Core.Log.d('click to new model')
        return false
      })
    }
  }

  function removeHoverDom (treeId, treeNode) {
    window.$('#addBtn_' + treeNode.tId).unbind().remove()
  }

  function onNodeSelected (event, treeId, treeNode, clickFlag) {
    context.node = treeNode
    getNodeDetail(treeNode)
    getOwnerByNode(treeNode.id)
    getMeterNormalList(treeNode)
    getMeterCheckList(treeNode)
    getMeterChildren(treeNode)
  }

  function getNodeDetail (treeNode) {
    Core.Api.NODE.getNodeDetail(treeNode.id).then(function (data) {
      context.node = data.node
    }, function (error) {
      Core.Toast.error(context, '获取节点该最新信息失败: ' + error.message)
    })
  }

  function getOwnerByNode (nodeId) {
    Core.Api.NODE_OWNER.getOwnerByNode(nodeId).then(function (data) {
      var nodeOwner = data.node_owner
      if (nodeOwner.owner_type === Core.Const.TYPE.OWNER_TYPE_USER) {
        var user = nodeOwner.user
        context.users = [user]
        context.institution = {}
      } else if (nodeOwner.owner_type === Core.Const.TYPE.OWNER_TYPE_INSTITUTION) {
        var institution = nodeOwner.institution
        context.institution = institution
        context.users = []
      } else {
        context.users = []
        context.institution = {}
      }
    }, function (error) {
      Core.Log.e(error)
      context.users = []
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

  function getNodeEditing (id) {
    Core.Api.NODE.getNodeDetail(id).then(function (data) {
      context.nodeEditing = data.node
      context.showEditNode = true
    }, function (error) {
      Core.Toast.error(context, '获取节点信息失败: ' + error.message)
    })
  }

  function updateNodeInfo (id, name, code, path, type, area, price, fee, ownership, remark) {
    Core.Api.NODE.updateNodeInfo(id, name, code, path, type, area, price, fee, ownership, remark).then(function (data) {
      context.node = data.node
      context.showEditNode = false
    }, function (error) {
      Core.Toast.error(context, '更新节点信息失败: ' + error.message)
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
      if (data.meter.type < 4) {
        getMeterNormalList(context.node)
      } else {
        getMeterCheckList(context.node)
      }
    }, function (error) {
      Core.Toast.error(context, '更新表信息失败: ' + error.message)
    })
  }

</script>
