<template>
  <!-- Content Header (Page header) -->
  <content-header parent="水电气录入" child="个人录入"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-3">
        <price></price>
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
                  <th>标记用户</th>
                  <th>职称</th>
                  <th>备注</th>
                </tr>
                <tr v-for="user in users">
                  <td>{{user.name}}</td>
                  <td>{{user.department}}</td>
                  <td>{{user.phone}}</td>
                  <td>{{user.school_card}}</td>
                  <td>{{user.id_card}}</td>
                  <td>{{user.important}}</td>
                  <td>{{user.title}}</td>
                  <td>{{user.remark}}</td>
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
          <select v-model="date">
            <option v-for="t in inputDate"><span>{{t}}</span></option>
          </select>
          <input type="date" v-show="newDate" id="newDate">
          <label class="btn btn-primary" v-show="!newDate" @click="showNewDate()">新增</label>
          <label class="btn btn-primary" v-show="newDate" @click="showNewDate()">取消</label>
          <label class="btn btn-primary" v-show="newDate" @click="NewDate()">确定</label>
          <div>
            <label class="label la text-black">筛选类型:</label>
            <input type="checkbox" v-model="checkbox.water" value="水表">水表
            <input type="checkbox" v-model="checkbox.ele" value="电表">电表
            <input type="checkbox" v-model="checkbox.gas" data-value="气表">气表
          </div>
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
                  <th>该表费用</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for=" m in temp.meter" v-bind:class="m.sign">
                  <td>{{m.name}}</td>
                  <td>{{m.code}}</td>
                  <td>{{m.type}}</td>
                  <td>{{m.start}}</td>
                  <td>
                    <input v-model="m.input|input m" type="number"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-html="true"
                           data-placement="bottom" min="0"
                           data-content="{{m.content}}" data-trigger="focous">
                    <button @click="uploadMeter($index)" class="btn btn-sm btn-info">提交</button>
                  </td>
                  <td>{{m.price }}</td>
                  <td>{{m.used}}</td>
                  <td>{{m.fee }}</td>
                  <td>
                    <button @click="showChangeMeter($index)" class="btn btn-sm btn-info">换表</button>
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
                  <th>该表费用</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for=" m in temp.check" v-bind:class="m.sign">
                  <td>{{m.name}}</td>
                  <td>{{m.code}}</td>
                  <td>{{m.type}}</td>
                  <td>{{m.start}}</td>
                  <td><input v-model="m.input|input m" type="number"
                             class="popover-show text-black" data-container="body"
                             data-toggle="popover" data-html="true"
                             data-placement="bottom" min="0"
                             data-content="上月用度：100度;<br>    去年同月用度为：150度;去年平均用度：230"
                             data-trigger="focous"> <a @click="upload($index)"
                                                       class="btn btn-sm btn-info">提交</a></td>
                  <td>{{m.price}}</td>
                  <td>{{m.used}}</td>
                  <td>{{m.fee}}</td>
                  <td>
                    <button @click="showChangeCheck($index)"
                            class="btn btn-sm btn-info">换表
                    </button>
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

  export default {
    components: {
      'content-header': ContentHeader,
      'price': Price
    },
    data () {
      return {
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

  function getOwnerByNode (nodeId, ownerType) {
    Core.Api.NODE_OWNER.getOwnerByNode(nodeId, ownerType).then(function (data) {
      var owner = data.node_owner.user
      context.users = [owner]
    }, function (error) {
      Core.Log.e(error)
      context.users = []
    })
  }
</script>
