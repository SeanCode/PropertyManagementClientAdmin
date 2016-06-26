<template>
  <div class="row">
    <div class="col-md-3">
      <div class="box box-info" id="box-groups">
        <div class="box-header with-border">
          <h3 class="box-title">部门与用户</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" @click="refresh()">
              <i class="fa fa-refresh"></i>
            </button>
            <button class="btn btn-box-tool">
              <i class="fa fa-plus"></i>
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
    </div>
    <div class="col-md-9" id="panel">
      <div class="box box-solid box-info">
        <div class="box-header with-border">

          <h3 class="box-title">用户信息</h3>
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
                <th>操作</th>
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
                <td><a class="label label-danger"
                       href="javascript:void(0);" @click="showUpdUser($index)">修改</a></td>
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
</template>
<style>
  .user-tree-box {
    max-height: 600px;
    overflow: scroll;
  }
</style>
<script>
  import Core from '../../../core/core'

  export default {
    data () {
      return {
        checkMeterList: [],
        normalMeterList: [],
        users: [],
        node: {},
        setting: {
          async: {
            enable: true,
            url: 'http://localhost:8080/api/private/v1/user/list-by-department',
            autoParam: ['id=department_id'],
            dataType: 'json',
            dataFilter: ajaxDataFilter
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

  function ajaxDataFilter (treeId, parentNode, responseData) {
    if (!responseData || responseData.code !== 0 || responseData.data.user_list.length <= 0) {
      return null
    }
    return responseData.data.user_list
  }

  function initUserTree () {
    Core.Api.DEPARTMENT.getTreeList(1).then(function (data) {
      context.departmentList = data.department_list
      window.$.fn.zTree.init(window.$('#userTree'), context.setting, context.departmentList)
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
    } else {
      context.users = []
    }
  }
  //
  //  function getMeterListByNodeId (node) {
  //  }
</script>
