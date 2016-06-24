<template>
  <div class="row">
    <side></side>
    <div class="col-md-9" id="panel">

      <div class="box box-solid box-info">
        <div class="box-header with-border">

          <h3 class="box-title">地址信息</h3>
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
                <th>地址名</th>
                <th>地址编号</th>
                <th>完整地址信息</th>
                <th>类型</th>
                <th>房间面积(平方米)</th>
                <th>物管价(元/每平方米)</th>
                <th>物管费(元)</th>
                <th>所有权</th>
                <th>租房合同</th>
                <th>原户主</th>
                <th>现户主</th>
                <th>居住人</th>
                <th>备注</th>
                <th>操作</th>
              </tr>
              <tr>
                <td>{{node.name}}</td>
                <td>{{node.code}}</td>
                <td>{{node.longname}}</td>
                <td>{{node.type}}</td>
                <td>{{node.price}}</td>
                <td>{{node.area}}</td>
                <td>{{node.fee}}</td>
                <td>{{node.ower}}</td>
                <td>{{node.hetong}}</td>
                <td>{{node.oriower}}</td>
                <td>{{node.curower}}</td>
                <td>{{node.curpeople}}</td>
                <td>{{node.info}}</td>
                <td v-if="node.nid"><a class="label label-danger"
                                       href="javascript:void(0);" @click="showUpdNode()">修改</a></td>
              </tr>
            </table>
          </div>
          <!-- table-->


        </div>
        <!--  boxbody -->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="modal-upd-node" tabindex="-2"
             role="dialog" aria-labelledby="cll1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="cll1">修改地址信息</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-xs-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">地址名</span> <input
                      type="text" v-model="temp.name" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">地址编号</span> <input
                      type="text" v-model="temp.code" class="form-control">
                    </div>
                    完整地址信息<input type="text" readonly="true"
                                 class="form-control">
                    <div class="input-group input-group-md">
														<span class="input-group-addon">类型<input
                              type="radio" v-model="temp.type" name="type" value="公司">公司<input
                              type="radio" v-model="temp.type" name="type" value="一般">一般
														</span>
                    </div>

                    <div class="input-group input-group-md">
                      <span class="input-group-addon">房间面积</span> <input
                      type="number" v-model="temp.area" class="form-control"
                      min="0" max="10000">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">物管费单价(元/平方米)</span> <input
                      type="number" v-model="temp.price" class="form-control"
                      min="0" max="1000">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">物管费</span> <input
                      type="number" v-model="temp.fee" class="form-control"
                      min="0" max="10000">
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">所有权</span> <input
                      type="text" v-model="temp.ower" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">租房合同</span> <input
                      type="text" v-model="temp.hetong" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">原户主</span> <input
                      type="text" v-model="temp.oriower" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">现户主</span> <input
                      type="text" v-model="temp.curower" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">居住人</span> <input
                      type="text" v-model="temp.curpeople" class="form-control">
                    </div>
													<textarea v-model="temp.info" class="form-control"
                                    cols="30" rows="10" resize="none" placeholder="备注"></textarea>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-danger pull-left"
                        data-toggle="collapse" data-target="#divdel"
                        @click="delNode()">删除地址</button>
                <button class="btn btn-danger pull-left"
                        data-toggle="collapse" data-target="#divdel"
                        @click="delNodeReal()">彻底删除地址</button>
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary"
                        @click="updNode()">确定</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal -->
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
                <th>表单价</th>
                <th>倍率</th>
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
              <tr v-for="m in meter">
                <td>{{m.name}}</td>
                <td>{{m.code}}</td>
                <td>{{m.type}}</td>
                <td>{{m.price}}</td>
                <td>{{m.rate}}</td>
                <td>{{m.parent}}</td>
                <td>{{m.zore}}</td>
                <td>{{m.mingpai}}</td>
                <td>{{m.provider}}</td>
                <td>{{m.birthday}}</td>
                <td>{{m.who}}</td>
                <td>{{m.when}}</td>
                <td>{{m.paid}}</td>
                <td>{{m.info}}</td>
                <td><a class="label label-danger "
                       href="javascript:void(0);" @click="showUpdMeter($index)">修改</a>
                  <a class="label label-danger" href="javascript:void(0);"
                     @click="showChangeMeter($index)">换表</a> <a
                    class="label label-danger" href="javascript:void(0);"
                    @click="showDiv($index)">设置主表</a> <a
                    class="label label-danger" href="javascript:void(0);"
                    @click="showNewCheck($index)">添加检查表</a></td>

              </tr>


              </tr>
              </tbody>
            </table>
          </div>
          <!-- /.table-responsive -->
        </div>
        <!-- /.box-body -->
        <div class="box-footer clearfix" style="display: block;"></div>
        <!-- /.box-footer -->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="modal-upd-meter" tabindex="-2"
             role="dialog" aria-labelledby="cml1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="cml1">修改表信息</h4>
              </div>
              <div class="modal-body">
                <div id="cmul" class="row">
                  <div class="col-xs-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表名称</span> <input
                      type="text" v-model="temp.name" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表编号</span> <input
                      type="text" v-model="temp.code" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表类型</span> <input
                      type="text" v-model="temp.type" readonly="true"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表单价</span> <input
                      type="number" v-model="temp.price" min="0" max="1000"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">倍率</span> <input
                      type="number" v-model="temp.rate" min="0.001" max="1000"
                      class="form-control">
                    </div>

                    <div class="input-group input-group-md">
                      <span class="input-group-addon">上级表编号</span> <input
                      type="text" v-model="temp.parent" readonly="true"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">初始表起度</span> <input
                      type="number" v-model="temp.zore" class="form-control"
                      min="0">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表铭牌号</span> <input
                      type="text" v-model="temp.mingpai" class="form-control">
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">生产厂家</span> <input
                      type="text" v-model="temp.provider" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">生产日期</span> <input
                      type="date" v-model="temp.birthday" class="form-control"
                      placeholder="1945-01-01">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">采购员</span> <input
                      type="text" v-model="temp.who" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">采购日期</span> <input
                      type="date" v-model="temp.when" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">采购价格(元)</span> <input
                      type="number" v-model="temp.paid" class="form-control"
                      min="0">
                    </div>
													<textarea class="form-control" v-model="temp.info"
                                    cols="30" rows="10" resize="none" placeholder="备注"></textarea>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger pull-left"
                        @click="delMeter()">删除表</button>
                <button type="button" class="btn btn-danger pull-left"
                        @click="delMeterReal()">彻底删除表</button>
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary"
                        @click="updMeter()">确定</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal -->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="modal-change-meter" tabindex="-2"
             role="dialog" aria-labelledby="exchangeMeterl"
             aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="exchangeMeterl">换表</h4>
              </div>
              <div class="modal-body">
                当前地址：<label class="bg-green">{{node.name}}</label>


                <div class="row">
                  <div class="col-xs-6">
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-green">当前本月表起度</span> <input
                      type="text" class="form-control" v-model="temp.start"
                      readonly="true" min="0" max="5" placeholder="开发中">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-red">当前本月表止度</span> <input
                      type="number" class="form-control" v-model="temp.old_end"
                      min="0" placeholder="必填*">
                    </div>
                    <br>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-red">该止度抄表日期</span> <input
                      type="date" v-model="temp.date">
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">表类型</span> <input
                      type="text" readonly="true" v-model="temp.type"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">新表名称</span> <input
                      type="text" class="form-control" v-model="temp.name"
                      placeholder="必填*">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">新表编号</span> <input
                      type="text" class="form-control" v-model="temp.code"
                      placeholder="请输入表编号">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-green">新表初始表起度</span> <input
                      type="number" class="form-control" min="0"
                      v-model="temp.new_zore" placeholder="必填*">
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary"
                        @click="changeMeter()">确定</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal -->


        <!-- 模态框（Modal） -->
        <div class="modal fade" id="modal-div" tabindex="-2"
             role="dialog" aria-labelledby="dvimeterl" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="dvimeterl">
                  设置主表 <small class="text-red">在下方选择主表（选择的主表，统计费用将减去分表的费用）</small>
                </h4>
              </div>
              <div class="modal-body">
                当前地址：<label class="bg-green">{{node.name}}</label> 当前分表编号：<label>{{meter[index].code}}</label><br>

                <div class="row">

                  <div>
                    <ul id="divMeterTree" class="ztree"></ul>
                  </div>
                  <div>

                    <table class="table no-margin">
                      <tr v-for="m in temp.meter">
                        <td>{{"名称："+m.name+" 编号"+m.code}}</td>
                        <td><input type="radio" value="{{m.mid}}"
                                   v-model="temp.son" name="divmeter">设为主表</td>
                      </tr>
                    </table>

                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary"
                        @click="setDivMeter()">确定</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal -->


        <!-- 模态框（Modal） -->
        <div class="modal fade" id="modal-new-check" tabindex="-2"
             role="dialog" aria-labelledby="checkmeternl" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="checkmeternl">添加检查表</h4>
              </div>
              <div class="modal-body">
                当前地址：<label class="bg-green">重庆邮电大学崇文路2号</label> 本月表起度：<label></label><br>

                <div class="row">
                  <div class="col-xs-11">
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">表类型</span> <input
                      type="text" readonly="true" v-model="temp.type"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">新表名称</span> <input
                      type="text" class="form-control" v-model="temp.name"
                      placeholder="必填">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">新表编号</span> <input
                      type="text" class="form-control" v-model="temp.code"
                      placeholder="必填">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-green">新表初始表起度</span> <input
                      type="number" class="form-control"
                      v-model="temp.new_zore" min="0" placeholder="必填">
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary"
                        @click="newCheck()">确定</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal -->

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
            <table class="table no-margin table200">
              <thead>
              <tr>
                <th>表名称</th>
                <th>表编号</th>
                <th>表类型</th>
                <th>表单价</th>
                <th>倍率</th>
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
              <tr v-for="m in check">
                <td>{{m.name}}</td>
                <td>{{m.code}}</td>
                <td>{{m.type}}</td>
                <td>{{m.price}}</td>
                <td>{{m.rate}}</td>
                <td>{{m.parent}}</td>
                <td>{{m.zore}}</td>
                <td>{{m.mingpai}}</td>
                <td>{{m.provider}}</td>
                <td>{{m.birthday}}</td>
                <td>{{m.who}}</td>
                <td>{{m.when}}</td>
                <td>{{m.paid}}</td>
                <td>{{m.info}}</td>
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
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="modal-upd-check" tabindex="-2"
             role="dialog" aria-labelledby="cml1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="cml1">修改检查表信息</h4>
              </div>
              <div class="modal-body">
                <div id="cmul" class="row">
                  <div class="col-xs-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表名称</span> <input
                      type="text" v-model="temp.name" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表编号</span> <input
                      type="text" v-model="temp.code" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表类型</span> <input
                      type="text" v-model="temp.type" readonly="true"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表单价</span> <input
                      type="number" v-model="temp.price" min="0" max="1000"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">倍率</span> <input
                      type="number" v-model="temp.rate" min="0.01" max="1000"
                      class="form-control">
                    </div>

                    <div class="input-group input-group-md">
                      <span class="input-group-addon">上级表编号</span> <input
                      type="text" v-model="temp.parent" readonly="true"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">初始表起度</span> <input
                      type="number" v-model="temp.zore" class="form-control"
                      min="0">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">表铭牌号</span> <input
                      type="text" v-model="temp.mingpai" class="form-control">
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">生产厂家</span> <input
                      type="text" v-model="temp.provider" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">生产日期</span> <input
                      type="date" v-model="temp.birthday" class="form-control"
                      placeholder="1945-01-01">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">采购员</span> <input
                      type="text" v-model="temp.who" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">采购日期</span> <input
                      type="date" v-model="temp.when" class="form-control">
                    </div>
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">采购价格(元)</span> <input
                      type="number" v-model="temp.paid" class="form-control"
                      min="0">
                    </div>
													<textarea class="form-control" v-model="temp.info"
                                    cols="30" rows="10" resize="none" placeholder="备注"></textarea>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger pull-left"
                        @click="delCheck()">删除表</button>
                <button type="button" class="btn btn-danger pull-left"
                        @click="delCheckReal()">彻底删除表</button>
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary"
                        @click="updCheck()">确定</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal -->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="modal-change-check" tabindex="-2"
             role="dialog" aria-labelledby="exchangeMeterl"
             aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="exchangeMeterl">更换检查表</h4>
              </div>
              <div class="modal-body">
                当前地址：<label class="bg-green">{{node.name}}</label>


                <div class="row">
                  <div class="col-xs-6">
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-green">当前本月表起度</span> <input
                      type="text" class="form-control" v-model="temp.start"
                      readonly="true" min="0" max="5" placeholder="开发中">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-red">当前本月表止度</span> <input
                      type="number" class="form-control" v-model="temp.old_end"
                      min="0" placeholder="必填*">
                    </div>
                    <br>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-red">该止度抄表日期</span> <input
                      type="date" v-model="temp.date">
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">表类型</span> <input
                      type="text" readonly="true" v-model="temp.type"
                      class="form-control">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">新表名称</span> <input
                      type="text" class="form-control" v-model="temp.name"
                      placeholder="必填*">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon">新表编号</span> <input
                      type="text" class="form-control" v-model="temp.code"
                      placeholder="请输入表编号">
                    </div>
                    <div class="input-group input-group-xs">
                      <span class="input-group-addon bg-green">新表初始表起度</span> <input
                      type="number" class="form-control" min="0"
                      v-model="temp.new_zore" placeholder="必填*">
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary"
                        @click="changeCheck()">确定</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal -->

      </div>
    </div>
  </div>
</template>
<style>
  .ztree li span.button {
    min-width: 21px !important;
    min-height: 21px !important;
  }
</style>
<script>
  import Side from './institution/side.vue'

  export default {
    components: {
      'side': Side
    }
  }
</script>
