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
                  <th>电话</th>
                  <th>一卡通</th>
                  <th>身份证</th>
                  <th>标记用户</th>
                  <th>备注</th>
                </tr>
                <tr v-for="user in users">
                  <td>{{user.name}}</td>
                  <td>{{user.phone}}</td>
                  <td>{{user.school_card}}</td>
                  <td>{{user.id_card}}</td>
                  <td>{{user.important}}</td>
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
                  <th>当前度数</th>
                  <th>备注</th>
                  <th>上次录入</th>
                  <th>录入</th>
                  <th>本月记录</th>
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
                  <td>{{meter.current}}</td>
                  <td>{{meter.remark}}</td>
                  <td>{{meter.last_input_time == 0 ? '' : new Date(meter.last_input_time * 1000).toLocaleString()}}</td>
                  <td>
                    <a class="label label-primary" href="javascript:void(0);" @click="toggleInputMeter(meter)">录入</a>
                  </td>
                  <td>
                    <a class="label label-primary" href="javascript:void(0);" @click="toggleRecordList(meter)">记录</a>
                  </td>
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

          <modal title="录入(请先检查后提交录入)" :show.sync="showInputMeter" effect="fade" width=800>
            <div slot="modal-body" class="modal-body">
              <div class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">名称</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled v-model="meterEditing.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">编号</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled v-model="meterEditing.code">
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
                  <label class="col-sm-2 control-label">当前度数</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" disabled v-model="meterEditing.current">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">上月用度</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled value="{{recordLast.month.end - recordLast.month.begin}}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">去年同月用度</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled value="{{recordLast.year.end - recordLast.year.begin}}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">抄表日期</label>
                  <div class="col-sm-10">
                    <date-picker :time.sync="meterEditing.time"></date-picker>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">抄表度数</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" v-model="meterEditing.value">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">抄表员</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.reader">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">备注</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="meterEditing.input_remark">
                  </div>
                </div>
              </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showInputMeter = false'>取消</button>
              <button type="button" class="btn btn-success" @click='inputCheck()'>检查</button>
              <button type="button" class="btn btn-danger" @click='inputMeter()'>提交</button>
            </div>
          </modal>
          <modal title="修改录入" :show.sync="showModifyRecord" effect="fade" width=800>
            <div slot="modal-body" class="modal-body">
              <div class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">名称</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled v-model="meterEditing.name">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">编号</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled v-model="meterEditing.code">
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
                  <label class="col-sm-2 control-label">当前度数</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" disabled v-model="meterEditing.current">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">上月用度</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled value="{{recordLast.month.end - recordLast.month.begin}}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">去年同月用度</label>
                  <div class="col-sm-10">
                    <input class="form-control" disabled value="{{recordLast.year.end - recordLast.year.begin}}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">抄表日期</label>
                  <div class="col-sm-10">
                    <date-picker :time.sync="recordEditing.time"></date-picker>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">抄表度数</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="number" v-model="recordEditing.end">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">抄表员</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="recordEditing.reader">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">备注</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="recordEditing.remark">
                  </div>
                </div>
              </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showModifyRecord = false'>取消</button>
              <button type="button" class="btn btn-success" @click='checkRecordModify()'>检查</button>
              <button type="button" class="btn btn-danger" @click='updateRecord()'>提交</button>
            </div>
          </modal>
          <modal title="录入历史(本月)" :show.sync="showRecordList" effect="fade" large>
            <div slot="modal-body" class="modal-body">
              <div class="table-responsive ">
                <table class="table no-margin table200">
                  <thead>
                  <tr>
                    <th>表名称</th>
                    <th>起度</th>
                    <th>止度</th>
                    <th>用度</th>
                    <th>抄表员</th>
                    <th>录入员</th>
                    <th>状态</th>
                    <th>审核人</th>
                    <th>标记</th>
                    <th>备注</th>
                    <th>抄表时间</th>
                    <th>录入时间</th>
                    <th>修改</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="record in recordTempList | filterBy meterEditing.id in 'meter_id'">
                    <td>{{meterEditing.name}}</td>
                    <td>{{record.begin}}</td>
                    <td>{{record.end}}</td>
                    <td>{{record.end - record.begin}}</td>
                    <td>{{record.reader}}</td>
                    <td>{{record.operator.username}}</td>
                    <td>{{record.status_name}}</td>
                    <td>{{record.reviewer ? record.reviewer.name : ''}}</td>
                    <td>{{record.tag_name}}</td>
                    <td>{{record.remark}}</td>
                    <td>{{new Date(record.time * 1000).toLocaleString()}}</td>
                    <td>{{new Date(record.create_time * 1000).toLocaleString()}}</td>
                    <td>
                      <a class="label label-danger" href="javascript:void(0);"
                         @click="toggleModifyRecord(record)">修改</a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showRecordList = false'>取消</button>
            </div>
          </modal>
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
                  <th>当前度数</th>
                  <th>备注</th>
                  <th>上次录入</th>
                  <th>录入</th>
                  <th>本月记录</th>
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
                  <td>{{meter.current}}</td>
                  <td>{{meter.remark}}</td>
                  <td>{{meter.last_input_time == 0 ? '' : new Date(meter.last_input_time * 1000).toLocaleString()}}</td>
                  <td>
                    <a class="label label-primary" href="javascript:void(0);" @click="toggleInputMeter(meter)">录入</a>
                  </td>
                  <td>
                    <a class="label label-primary" href="javascript:void(0);" @click="toggleRecordList(meter)">记录</a>
                  </td>
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
                  <th>当前度数</th>
                  <th>备注</th>
                  <th>上次录入</th>
                  <th>详情</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="meter in meterChildren">
                  <td>{{meter.parent ? meter.parent.name : ''}}</td>
                  <td>{{meter.type_name}}</td>
                  <td>{{meter.name}}</td>
                  <td>{{meter.code}}</td>
                  <td>{{meter.current}}</td>
                  <td>{{meter.remark}}</td>
                  <td>{{meter.last_input_time == 0 ? '' : new Date(meter.last_input_time * 1000).toLocaleString()}}</td>
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
        users: [],
        node: {},
        departmentList: [],
        nodeList: [],
        meterEditing: {},
        meterNormalList: [],
        meterCheckList: [],
        meterChildren: [],
        showReplaceMeter: false,
        showEditMeter: false,
        showInputMeter: false,
        inputChecked: false,
        showModifyRecord: false,
        recordEditing: {},
        showRecordList: false,
        recordTempList: [],
        recordLast: {
          year: {
            begin: 0,
            end: 0
          },
          month: {
            begin: 0,
            end: 0
          }
        },
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
      },
      toggleInputMeter: function (meter) {
        this.meterEditing = meter
        this.meterEditing.time = new Date().getTime()
        this.showInputMeter = true
        getLastRecord(meter.id)
      },
      inputMeter: function () {
        inputMeter(this.meterEditing.id, this.meterEditing.value, Core.Util.getTimestamp(this.meterEditing.time), this.meterEditing.reader, this.meterEditing.input_remark)
      },
      inputCheck: function () {
        checkMeterInput()
      },
      toggleRecordList: function (meter) {
        context.meterEditing = meter
        getTempRecordList(meter.node_id)
      },
      toggleModifyRecord: function (record) {
        var date = new Date()
        var day = date.getDay()
        date.setTime(record.create_time * 1000)
        var _day = date.getDay()
        if (day !== _day || record.status !== 0) {
          Core.Toast._error(this, '只可修改当天未审核数据')
          return
        }
        this.recordEditing = record
        this.showRecordList = false
        this.showModifyRecord = true
        getLastRecord(record.meter_id)
      },
      checkRecordModify: function () {
        checkRecordModify()
      },
      updateRecord: function () {
        updateRecord(this.recordEditing.id, this.recordEditing.end, this.recordEditing.reader, this.recordEditing.remark)
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

  function getTempRecordList (nodeId) {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    Core.Api.RECORD.getTempList(nodeId, year, month).then(function (data) {
      context.recordTempList = data.record_list
      context.showRecordList = true
    }, function (error) {
      Core.Toast.error(context, '获取录入记录失败: ' + error.message)
    })
  }

  function inputMeter (meterId, value, time, reader, remark) {
    Core.Api.RECORD.input(meterId, value, time, reader, remark).then(function (data) {
      context.showInputMeter = false
      context.meterEditing = {}
      Core.Toast.success(context, '录入成功')
    }, function (error) {
      Core.Toast.error(context, '录入失败: ' + error.message)
    })
  }

  function checkMeterInput () {
    if (context.recordLast.year.id === undefined || context.recordLast.month.id === undefined) {
      Core.Toast.error(context, '检查失败, 请重新点击')
      getLastRecord(context.meterEditing.id)
      return false
    }
    if (context.meterEditing.value === undefined || context.meterEditing.value < context.recordLast.month.end) {
      Core.Toast.error(context, '检查未通过!!!请检查本月止度')
      return false
    }
    // 假设超过50这个阈值 就警告
    var usage = context.meterEditing.value - context.meterEditing.current
    var lastMonthUsage = context.recordLast.month.begin - context.recordLast.month.end
    if (usage - lastMonthUsage > 50) {
      Core.Toast.warning(context, '警告!本月用度远超上月用度')
      return
    }
    var lastYearMonthUsage = context.recordLast.year.begin - context.recordLast.year.end
    if (usage - lastYearMonthUsage > 50) {
      Core.Toast.warning(context, '警告!本月用度远超去年同月用度')
      return
    }
    Core.Toast.success(context, '检查通过')
  }

  function checkRecordModify () {
    if (context.recordLast.year.id === undefined || context.recordLast.month.id === undefined) {
      Core.Toast.error(context, '检查失败, 请重新点击')
      getLastRecord(context.meterEditing.id)
      return false
    }
    if (context.recordEditing.end === undefined || context.recordEditing.end < context.recordLast.month.end) {
      Core.Toast.error(context, '检查未通过!!!请检查本月止度')
      return false
    }
    // 假设超过50这个阈值 就警告
    var usage = context.recordEditing.end - context.recordEditing.begin
    var lastMonthUsage = context.recordLast.month.begin - context.recordLast.month.end
    if (usage - lastMonthUsage > 50) {
      Core.Toast.warning(context, '警告!本月用度远超上月用度')
      return
    }
    var lastYearMonthUsage = context.recordLast.year.begin - context.recordLast.year.end
    if (usage - lastYearMonthUsage > 50) {
      Core.Toast.warning(context, '警告!本月用度远超去年同月用度')
      return
    }
    Core.Toast.success(context, '检查通过')
  }

  function getLastRecord (meterId) {
    Core.Api.RECORD.getLastRecord(meterId).then(function (data) {
      if (data.last_year_month !== null) {
        context.recordLast.year = data.last_year_month
      } else {
        context.recordLast.year.id = 0
      }
      if (data.last_month !== null) {
        context.recordLast.month = data.last_month
      } else {
        context.recordLast.month.id = 0
      }
    }, function (error) {
      Core.Toast.error(context, '获取历史记录失败: ' + error.message)
    })
  }

  function updateRecord (id, end, reader, remark) {
    Core.Api.RECORD.updateRecord(id, end, reader, remark).then(function (data) {
      context.showModifyRecord = false
      Core.Toast.success(context, '修改录入成功')
    }, function (error) {
      Core.Toast.error(context, '修改录入失败: ' + error.message)
    })
  }
</script>
