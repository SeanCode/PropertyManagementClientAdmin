<template>
  <div class="row">
    <div class="col-md-3">
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">部门与个人</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" @click="refreshUserTree()">
              <i class="fa fa-refresh"></i>
            </button>
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" style="display: block;">
          <div class="user-tree-box">
            <ul id="userTree" class="ztree"></ul>
          </div>
        </div>
        <!--  boxbody -->
      </div>
      <!-- boxinfo -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">个人节点</h3>
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
          <div class="user-tree-box">
            <ul id="nodeUserTree" class="ztree"></ul>
          </div>
        </div>
        <!--  boxbody -->
      </div>
      <!-- boxinfo -->
    </div>
    <div class="col-md-9" id="panel">
      <div class="box box-solid box-info">
        <div class="box-header with-border">
          <h3 class="box-title">个人信息</h3>
          <div class="box-tools pull-right">
            <button v-show="users.length>0&&(!node.id)" class="btn btn-box-tool">
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
                  <a class="label label-primary" href="javascript:void(0);" @click="toggleEditUser(user.id)">编辑</a>
                </td>
              </tr>
            </table>
          </div>

        </div>
        <!--  boxbody -->
        <modal title="修改个人信息" :show.sync="showEditUser" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.username">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">手机号码</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.phone">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">身份证</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.id_card">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">一卡通</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.school_card">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">备注</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="userEditing.remark">
                </div>
              </div>
            </div>
          </div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showEditUser = false'>取消</button>
            <button type="button" class="btn btn-success" @click='updateUser'>更新</button>
          </div>
        </modal>
      </div>
      <!-- boxinfo -->

      <div class="box box-solid box-info">
        <div class="box-header with-border">
          <h3 class="box-title">节点信息</h3>
          <div class="box-tools pull-right">
            <button v-show="node.id&&users.length==0" class="btn btn-box-tool">
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
                  <a class="label label-primary" href="javascript:void(0);" @click="toggleEditNode">编辑</a>
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
  .user-tree-box {
    max-height: 600px;
    overflow: scroll;
  }
</style>
<script>
  import Core from '../../../core/core'
  import Modal from '../../widgets/Modal.vue'

  export default {
    components: {
      'modal': Modal
    },
    data () {
      return {
        showEditUser: false,
        userEditing: {},
        showEditNode: false,
        nodeEditing: {},
        meterNormalList: [],
        meterCheckList: [],
        meterChildren: [],
        users: [],
        node: {},
        user_tree_setting: {
          async: {
            enable: true,
            url: 'http://localhost:8080/api/private/v1/user/list-by-department',
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
        },
        node_setting: {
          async: {
            enable: true,
            url: 'http://localhost:8080/api/private/v1/node/children',
            autoParam: ['id'],
            otherParam: {'type': '2'},
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
      initUserTree()
      initNodeTree()
    },
    methods: {
      refreshNodeTree: function () {
        initNodeTree()
      },
      refreshUserTree: function () {
        initUserTree()
      },
      toggleEditUser: function (id) {
        getUserEditing(id)
      },
      updateUser: function () {
        updateUserInfo(this.userEditing.id, this.userEditing.name, this.userEditing.username, this.userEditing.phone, this.userEditing.id_card, this.userEditing.school_card, this.userEditing.remark)
      },
      toggleEditNode: function () {
        getNodeEditing(this.node.id)
      },
      updateNode: function () {
        updateNodeInfo(this.nodeEditing.id, this.nodeEditing.name, this.nodeEditing.code, this.nodeEditing.path, this.nodeEditing.type, this.nodeEditing.area, this.nodeEditing.price, this.nodeEditing.fee, this.nodeEditing.ownership, this.nodeEditing.remark)
      }
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

  function ajaxNodeDataFilter (treeId, parentNode, responseData) {
    if (!responseData || responseData.code !== 0 || responseData.data.children === undefined || responseData.data.children.length <= 0) {
      return null
    }
    return responseData.data.children
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
    if (node.hasOwnProperty('department_id')) {
      context.users = [node]
      getUserDetail(node.id)
      getNodeByOwner(node.id, Core.Const.TYPE.OWNER_TYPE_USER)
    } else {
      context.users = []
    }
  }

  function initNodeTree () {
    Core.Api.NODE.getNodeTreeRoot().then(function (data) {
      context.nodeList = data.tree_root
      window.$.fn.zTree.init(window.$('#nodeUserTree'), context.node_setting, context.nodeList)
      var treeObj = window.$.fn.zTree.getZTreeObj('nodeUserTree')
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
    getOwnerByNode(treeNode.id)
    getMeterNormalList(treeNode)
    getMeterCheckList(treeNode)
    getMeterChildren(treeNode)
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

  function getOwnerByNode (nodeId, ownerType) {
    Core.Api.NODE_OWNER.getOwnerByNode(nodeId, ownerType).then(function (data) {
      var owner = data.node_owner.user
      context.users = [owner]
    }, function (error) {
      Core.Log.e(error)
      context.users = []
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

  function getUserEditing (id) {
    Core.Api.USER.getUserDetail(id).then(function (data) {
      context.userEditing = data.user
      context.showEditUser = true
    }, function (error) {
      Core.Toast.error(context, '获取个人信息失败: ' + error.message)
    })
  }

  function getUserDetail (id) {
    Core.Api.USER.getUserDetail(id).then(function (data) {
      context.users = [data.user]
    }, function (error) {
      Core.Toast.error(context, '获取个人最新信息失败: ' + error.message)
    })
  }

  function updateUserInfo (id, name, username, phone, idCard, schoolCard, remark) {
    Core.Api.USER.updateUserInfo(id, name, username, phone, idCard, schoolCard, remark).then(function (data) {
      context.showEditUser = false
      context.users = [data.user]
    }, function (error) {
      Core.Toast.error(context, '更新失败: ' + error.message)
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
</script>
