<template>
  <!-- Content Header (Page header) -->
  <content-header parent="水电气管理" child="个人管理"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-3">
        <div class="box box-solid">
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
        <div class="box box-solid">
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
        <div class="box box-info">
          <div class="box-header">
            <h3 class="box-title">个人信息</h3>
            <div class="box-tools pull-right">
              <button v-show="users.length > 0 && node.id" class="btn btn-box-tool">
                <i class="fa fa-sign-out" title="搬出" @click="toggleRemoveUserOwner()"></i>
              </button>
              <button v-show="users.length==0" class="btn btn-box-tool" @click="toggleAddUserOwner()">
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
                <thead>
                <tr>
                  <th>姓名</th>
                  <th>部门</th>
                  <th>电话</th>
                  <th>一卡通</th>
                  <th>身份证</th>
                  <th>备注</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
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
                </tbody>
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
          <modal title="个人入住" :show.sync="showAddUserOwner" effect="fade" width="800">
            <div slot="modal-body" class="modal-body modal-user-tree">
              <div class="user-tree-box">
                <ul id="addUserOwnerTree" class="ztree"></ul>
              </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showAddUserOwner = false'>取消</button>
            </div>
          </modal>
          <modal title="警告" :show.sync="showRemoveUserOwner" effect="fade">
            <div slot="modal-body" class="modal-body">确认搬出?</div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showRemoveUserOwner = false'>取消</button>
              <button type="button" class="btn label-danger" @click='removeUserOwner()'>搬出</button>
            </div>
          </modal>
        </div>
        <!-- boxinfo -->

        <div class="box box-info">
          <div class="box-header">
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
                <thead>
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
                </thead>
                <tbody>
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
                </tbody>
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
                    <input class="form-control" v-model="nodeEditing.remark">
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
        <div class="box box-info">
          <div class="box-header">
            <h3 class="box-title">主表信息</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" @click="toggleAddNormalMeter()">
                <i class="fa fa-plus-square"></i>
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
                <thead>
                <tr>
                  <th>表名称</th>
                  <th>表编号</th>
                  <th>表类型</th>
                  <th>上级表名称</th>
                  <th>备注</th>
                  <th>详情</th>
                  <th>移除</th>
                  <th>设置上级表</th>
                  <th>更换</th>
                  <th>添加检查表</th>
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
                       @click="toggleRemoveMeter(meter)">移除</a>
                  </td>
                  <td>
                    <a class="label label-danger" href="javascript:void(0);"
                       @click="toggleShowSetParentMeter(meter)">设置上级表</a>
                  </td>
                  <td>
                    <a class="label label-danger" href="javascript:void(0);"
                       @click="toggleReplaceMeter(meter)">更换</a>
                  </td>
                  <td>
                    <a class="label label-danger" href="javascript:void(0);"
                       @click="toggleAddCheckMeter(meter)">添加检查表</a>
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
        <modal title="设置上级表" :show.sync="showSetParentMeter" effect="fade" large=true>
          <div slot="modal-body" class="modal-body modal-node-tree">
            <div class="row">
              <div class="node-tree-box col-md-4">
                <ul id="setParentMeterTree" class="ztree"></ul>
              </div>
              <div class="col-md-8">
                <div class="table-responsive ">
                  <table class="table no-margin table200">
                    <thead>
                    <tr>
                      <th>表名称</th>
                      <th>表编号</th>
                      <th>表类型</th>
                      <th>上级表名称</th>
                      <th>设置</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="meter in meterParentList">
                      <td>{{meter.name}}</td>
                      <td>{{meter.code}}</td>
                      <td>{{meter.type_name}}</td>
                      <td>{{meter.parent ? meter.parent.name : ''}}</td>
                      <td>
                        <a class="label label-primary" href="javascript:void(0);"
                           @click="setParentMeter(meter)">设置为上级表</a>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showSetParentMeter = false'>取消</button>
          </div>
        </modal>
        <modal title="修改表信息" :show.sync="showEditMeter" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">名称</label>
                <div class="col-sm-10">
                  <input class="form-control" :disabled="meterEditing.node_id!==node.id"
                         v-model="meterEditing.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">编号</label>
                <div class="col-sm-10">
                  <input class="form-control" :disabled="meterEditing.node_id!==node.id"
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
                <label class="col-sm-2 control-label">当前度数</label>
                <div class="col-sm-10">
                  <input class="form-control" type="number" disabled v-model="meterEditing.current">
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
        <modal title="添加主表" :show.sync="showAddNormalMeter" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">名称 *</label>
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
                <label class="col-sm-2 control-label">类型 *</label>
                <div class="col-sm-10">
                  <select class="form-control" v-model="meterEditing.type">
                    <option value="1">水表</option>
                    <option value="2">电表</option>
                    <option value="3">气表</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">初始起度</label>
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
                  <input class="form-control" type="number" v-model="meterEditing.cost">
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
            <button type="button" class="btn btn-default" @click='showAddNormalMeter = false'>取消</button>
            <button type="button" class="btn btn-success" @click='addNormalMeter'>确定</button>
          </div>
        </modal>
        <modal title="添加检查表" :show.sync="showAddCheckMeter" effect="fade" width="800">
          <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">名称 *</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="meterEditing.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">上级表</label>
                <div class="col-sm-10">
                  <input class="form-control" disabled v-model="meterParent.name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">编号</label>
                <div class="col-sm-10">
                  <input class="form-control" v-model="meterEditing.code">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">类型 *</label>
                <div class="col-sm-10">
                  <select class="form-control" disabled v-model="meterEditing.type">
                    <option value="4">水表检查表</option>
                    <option value="5">电表检查表</option>
                    <option value="6">气表检查表</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">初始起度</label>
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
                  <input class="form-control" type="number" v-model="meterEditing.cost">
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
            <button type="button" class="btn btn-default" @click='showAddCheckMeter = false'>取消</button>
            <button type="button" class="btn btn-success" @click='addCheckMeter'>确定</button>
          </div>
        </modal>

        <modal title="警告!!!" :show.sync="showRemoveMeter" effect="fade">
          <div slot="modal-body" class="modal-body">确认移除该表? <br>请先确定已经移除了该表的 检查表 和所有 分表 !</div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showRemoveMeter = false'>取消</button>
            <button type="button" class="btn label-danger" @click="removeMeter()">删除</button>
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
        <div class="box box-info">
          <div class="box-header">
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
                  <th>移除</th>
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
                       @click="toggleRemoveMeter(meter)">移除</a>
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
        <div class="box box-info">
          <div class="box-header">
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
  .user-tree-box {
    max-height: 600px;
    overflow: auto;
  }
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'
  import Modal from '../../widgets/Modal.vue'
  import DatePicker from '../../widgets/DatePicker.vue'

  export default {
    components: {
      'content-header': ContentHeader,
      'modal': Modal,
      'date-picker': DatePicker
    },
    data () {
      return {
        showEditUser: false,
        userEditing: {},
        showAddUserOwner: false,
        showRemoveUserOwner: false,
        showEditNode: false,
        nodeEditing: {},
        meterNormalList: [],
        meterCheckList: [],
        meterChildren: [],
        meterParentList: [],
        showEditMeter: false,
        meterEditing: {},
        meterParent: {},
        showRemoveMeter: false,
        showReplaceMeter: false,
        showSetParentMeter: false,
        showAddNormalMeter: false,
        showAddCheckMeter: false,
        users: [],
        node: {},
        userTreeList: [],
        modal_user_tree_setting: {
          async: {
            enable: true,
//            url: 'http://localhost:8080/api/private/v1/user/list-by-department',
            url: 'http://202.202.43.93:8080/api/private/v1/user/list-by-department',
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
            onClick: onModalUserNodeSelected
          }
        },
        user_tree_setting: {
          async: {
            enable: true,
//            url: 'http://localhost:8080/api/private/v1/user/list-by-department',
            url: 'http://202.202.43.93:8080/api/private/v1/user/list-by-department',
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
            url: 'http://202.202.43.93:8080/api/private/v1/node/children',
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
        },
        node_tree_setting: {
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
            onClick: onMeterParentNodeSelected
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
      },
      toggleAddUserOwner: function () {
        getModalUserTree()
      },
      toggleRemoveUserOwner: function () {
        this.showRemoveUserOwner = true
      },
      removeUserOwner: function () {
        removeNodeUser()
      },
      toggleEditMeter: function (meter) {
        getMeterEditing(meter.id)
      },
      updateMeter: function () {
        updateMeterInfo(this.meterEditing.id, this.meterEditing.name, this.meterEditing.code, this.meterEditing.remark)
      },
      toggleRemoveMeter: function (meter) {
        this.showRemoveMeter = true
        this.meterEditing = meter
      },
      removeMeter: function () {
        removeMeter(this.meterEditing.id, this.meterEditing.node_id, this.meterEditing.type)
      },
      toggleShowSetParentMeter: function (meter) {
        this.meterEditing = meter
        getNodeTreeList()
      },
      setParentMeter: function (meter) {
        if (meter.node_id === this.meterEditing.node_id) {
          Core.Toast.error(this, '不能设置自己节点的表为上级表')
          return
        }
        setParentMeter(this.meterEditing.id, this.meterEditing.node_id, meter.id)
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
      toggleAddCheckMeter: function (meter) {
        if (this.node.id === undefined) {
          Core.Toast.error(this, '请先选择节点')
          return
        }
        if (meter.check_meter_id > 0) {
          Core.Toast.error(this, '一个表只能对应一个检查表')
          return
        }
        this.meterEditing = {}
        this.meterEditing.type = meter.type + 3
        this.meterParent = meter
        this.showAddCheckMeter = true
      },
      addCheckMeter: function () {
        addCheckMeter(this.meterEditing.name, this.meterParent.id, this.meterEditing.type, this.meterEditing.code, this.meterEditing.rate, this.meterEditing.begin, this.meterEditing.nameplate, this.meterEditing.manufacturers, this.meterEditing.purchaser, this.meterEditing.cost, Core.Util.getTimestamp(this.meterEditing.buy_time), Core.Util.getTimestamp(this.meterEditing.product_time), this.meterEditing.remark)
      },
      toggleAddNormalMeter: function () {
        if (this.node.id === undefined) {
          Core.Toast.error(this, '请先选择节点')
          return
        }
        this.showAddNormalMeter = true
        this.meterEditing = {}
      },
      addNormalMeter: function () {
        addNormalMeter(this.meterEditing.name, this.meterEditing.type, this.meterEditing.code, this.meterEditing.rate, this.meterEditing.begin, this.meterEditing.nameplate, this.meterEditing.manufacturers, this.meterEditing.purchaser, this.meterEditing.cost, Core.Util.getTimestamp(this.meterEditing.buy_time), Core.Util.getTimestamp(this.meterEditing.product_time), this.meterEditing.remark)
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
      context.node = {}
      context.meterNormalList = []
      context.meterCheckList = []
      context.meterChildren = []
      getUserDetail(node.id)
      getNodeByOwner(node.id, Core.Const.TYPE.OWNER_TYPE_USER)
    } else {
//      context.users = []
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
    getNodeDetail(treeNode)
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

  function getNodeDetail (treeNode) {
    Core.Api.NODE.getNodeDetail(treeNode.id).then(function (data) {
      context.node = data.node
    }, function (error) {
      Core.Toast.error(context, '获取节点该最新信息失败: ' + error.message)
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

  function removeNodeUser () {
    Core.Api.NODE_OWNER.invalidNodeOwner(context.node.id, context.users[0].id, Core.Const.TYPE.OWNER_TYPE_USER).then(function (data) {
      context.showRemoveUserOwner = false
      context.users = []
      Core.Toast.success(context, '搬出成功')
      getOwnerByNode(context.node.id)
    }, function (error) {
      Core.Toast.error(context, '搬出失败: ' + error.message)
    })
  }

  function getModalUserTree () {
    Core.Api.DEPARTMENT.getTreeList(1).then(function (data) {
      context.showAddUserOwner = true
      context.userTreeList = data.department_list
      window.$.fn.zTree.init(window.$('#addUserOwnerTree'), context.modal_user_tree_setting, context.userTreeList)
      var treeObj = window.$.fn.zTree.getZTreeObj('addUserOwnerTree')
      var nodes = treeObj.getNodes()
      if (data.department_list.length > 0) {
        treeObj.expandNode(nodes[0], true, false, true)
      }
    }, function (error) {
      Core.Toast.error(context, '获取个人数据失败: ' + error.message)
    })
  }

  function onModalUserNodeSelected (event, treeId, node, clickFlag) {
    if (node.hasOwnProperty('department_id')) {
      bindNodeUser(node.id, context.node.id)
    } else {
//      context.users = []
    }
  }

  function bindNodeUser (userId, nodeId) {
    Core.Api.NODE_OWNER.addNodeOwner(nodeId, userId, Core.Const.TYPE.OWNER_TYPE_USER).then(function (data) {
      context.showAddUserOwner = false
      Core.Toast.success(context, '入住成功')
      getOwnerByNode(nodeId)
    }, function (error) {
      Core.Toast.error(context, '入住失败: ' + error.message)
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

  function removeMeter (id, nodeId, type) {
    Core.Api.METER.remove(id, nodeId).then(function (data) {
      context.showRemoveMeter = false
      context.meterEditing = {}
      if (type > 3) {
        getMeterCheckList(context.node)
      } else {
        getMeterNormalList(context.node)
      }
      Core.Toast.success(context, '移除表成功')
    }, function (error) {
      Core.Toast.error(context, '移除表失败: ' + error.message)
    })
  }

  function getNodeTreeList () {
    Core.Api.NODE.getNodeTreeRoot().then(function (data) {
      context.nodeTreeList = data.tree_root
      window.$.fn.zTree.init(window.$('#setParentMeterTree'), context.node_tree_setting, context.nodeTreeList)
      var treeObj = window.$.fn.zTree.getZTreeObj('setParentMeterTree')
      var nodes = treeObj.getNodes()
      if (data.tree_root) {
        treeObj.expandNode(nodes[0], true, false, true)
      }
      context.showSetParentMeter = true
    }, function (error) {
      Core.Toast.error(context, '获取节点失败: ' + error)
    })
  }

  function onMeterParentNodeSelected (event, treeId, node, clickFlag) {
    getMeterParentList(node.id)
  }

  function getMeterParentList (nodeId) {
    Core.Api.METER.getNormalList(nodeId).then(function (data) {
      context.meterParentList = data.meter_normal_list
    }, function (error) {
      Core.Toast.error(context, '获取该节点主表失败: ' + error.message)
    })
  }

  function setParentMeter (id, nodeId, parentId) {
    Core.Api.METER.setAsChild(id, nodeId, parentId).then(function (data) {
      context.showSetParentMeter = false
      getMeterNormalList(context.node)
      Core.Toast.success(context, '设置上级表成功')
    }, function (error) {
      Core.Toast.error(context, '设置上级表失败: ' + error.message)
    })
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

  function addCheckMeter (name, parentId, type, code, rate, begin, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark) {
    Core.Api.METER.addCheck(name, parentId, code, type, rate, begin, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark).then(function (data) {
      context.showAddCheckMeter = false
      context.meterEditing = {}
      context.meterParent = {}
      getMeterNormalList(context.node)
      getMeterCheckList(context.node)
      Core.Toast.success(context, '添加成功')
    }, function (error) {
      Core.Toast.error(context, '添加失败: ' + error.message)
    })
  }

  function addNormalMeter (name, type, code, rate, begin, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark) {
    Core.Api.METER.addNormal(name, context.node.id, code, type, rate, begin, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark).then(function (data) {
      context.showAddNormalMeter = false
      context.meterEditing = {}
      getMeterNormalList(context.node)
      Core.Toast.success(context, '添加成功')
    }, function (error) {
      Core.Toast.error(context, '添加失败: ' + error.message)
    })
  }
</script>
