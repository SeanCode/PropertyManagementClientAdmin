<template>
  <div class="row">
    <side></side>
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

              </tr>
              <tr v-for="u in user">
                <td>{{u.name}}</td>
                <td>{{u.bumen}}</td>
                <td>{{u.phone}}</td>
                <td>{{u.yikatong}}</td>
                <td>{{u.idcard}}</td>
                <td>{{u.mark}}</td>
                <td>{{u.title}}</td>
                <td>{{u.info}}</td>

              </tr>


            </table>
          </div>

        </div>
        <!--  boxbody -->

      </div>
      <!-- boxinfo -->
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
            <table class="table no-margin ">
              <tr>
                <th>地址名</th>
                <th>地址编号</th>
                <th>完整地址信息</th>
                <th>是否是房间</th>
                <th>房间面积(平方米)</th>
                <th>物管价(元/每平方米)</th>
                <th>物管费(元)</th>
                <th>所有权</th>
                <th>租房合同</th>
                <th>原户主</th>
                <th>现户主</th>
                <th>居住人</th>
                <th>备注</th>
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
              </tr>
            </table>
          </div>
          <!-- table-->


        </div>
        <!--  boxbody -->

      </div>
      <!-- boxinfo -->
      <div class="well bg-aqua-gradient text-black">
        <label class="label la text-black">当前抄表时间为：</label> <select
        v-model="date">
        <option v-for="t in inputDate"><span>{{t}}</span></option>
      </select> <input type="date" v-show="newDate" id="newDate"> <label
        class="btn btn-primary" v-show="!newDate" @click="showNewDate()">新增</label>
        <label class="btn btn-primary" v-show="newDate"
               @click="showNewDate()">取消</label> <label class="btn btn-primary"
                                                        v-show="newDate" @click="NewDate()">确定</label>
        <div>
          <label class="label la text-black">筛选类型:</label> <input
          type="checkbox" v-model="checkbox.water" value="水表">水表
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
                <td><input v-model="m.input|input m" type="number"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-html="true"
                           data-placement="bottom" min="0"
                           data-content="{{m.content}}" data-trigger="focous">
                  <button @click="uploadMeter($index)"
                          class="btn btn-sm btn-info">提交
                  </button>
                </td>
                <td>{{m.price }}</td>
                <td>{{m.used}}</td>
                <td>{{m.fee }}</td>
                <td>
                  <button @click="showChangeMeter($index)"
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
        <div class="box-footer clearfix" style="display: block;">
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
                        type="text" class="form-control"
                        v-model="temp.temp.start" readonly="true" min="0"
                        max="5" placeholder="开发中">
                      </div>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon bg-red">当前本月表止度</span> <input
                        type="number" class="form-control"
                        v-model="temp.temp.input" min="0" placeholder="必填*">
                      </div>
                      <br>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon bg-red">该止度抄表日期</span> <input
                        type="date" v-model="temp.temp.date">
                      </div>
                    </div>
                    <div class="col-xs-6">
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon">表类型</span> <input
                        type="text" readonly="true" v-model="temp.temp.type"
                        class="form-control">
                      </div>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon">新表名称</span> <input
                        type="text" class="form-control"
                        v-model="temp.temp.name" placeholder="必填*">
                      </div>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon">新表编号</span> <input
                        type="text" class="form-control"
                        v-model="temp.temp.code" placeholder="请输入表编号">
                      </div>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon bg-green">新表初始表起度</span> <input
                        type="number" class="form-control" min="0"
                        v-model="temp.temp.new_zore" placeholder="必填*">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default"
                          data-dismiss="modal">关闭
                  </button>
                  <button type="button" class="btn btn-primary"
                          @click="changeMeter()">确定
                  </button>
                </div>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal -->

        </div>
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
        <div class="box-footer clearfix" style="display: block;">
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
                        type="text" class="form-control"
                        v-model="temp.temp.start" readonly="true" min="0"
                        max="5" placeholder="开发中">
                      </div>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon bg-red">当前本月表止度</span> <input
                        type="number" class="form-control"
                        v-model="temp.temp.input" min="0" placeholder="必填*">
                      </div>
                      <br>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon bg-red">该止度抄表日期</span> <input
                        type="date" v-model="temp.temp.date">
                      </div>
                    </div>
                    <div class="col-xs-6">
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon">表类型</span> <input
                        type="text" readonly="true" v-model="temp.temp.type"
                        class="form-control">
                      </div>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon">新表名称</span> <input
                        type="text" class="form-control"
                        v-model="temp.temp.name" placeholder="必填*">
                      </div>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon">新表编号</span> <input
                        type="text" class="form-control"
                        v-model="temp.temp.code" placeholder="请输入表编号">
                      </div>
                      <div class="input-group input-group-xs">
                        <span class="input-group-addon bg-green">新表初始表起度</span> <input
                        type="number" class="form-control" min="0"
                        v-model="temp.temp.new_zore" placeholder="必填*">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default"
                          data-dismiss="modal">关闭
                  </button>
                  <button type="button" class="btn btn-primary"
                          @click="changeCheck()">确定
                  </button>
                </div>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal -->

        </div>
        <!-- /.box-footer -->
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import Side from './personal/side.vue'

  export default {
    components: {
      'side': Side
    }
  }
</script>
