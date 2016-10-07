<template>
  <!-- Content Header (Page header) -->
  <content-header parent="水电气录入" child="节点录入"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-3">
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">节点</h3>
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
            <div class="nod-tree-box">
              <ul id="nodeTree" class="ztree"></ul>
            </div>
          </div>
          <!--  boxbody -->
        </div>
        <!-- boxinfo -->
      </div>
      <div class="col-md-9" id="panel">
        <div class="box box-solid">
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
                </tr>
                </tbody>
              </table>
            </div>
            <!-- table-->
          </div>
        </div>
        <div class="box box-info">
          <div class="box-header">
            <h3 class="box-title">录入表格</h3>
            <div class="box-tools pull-right">
              <div class="btn btn-box-tool">
                <span>抄表时间: &nbsp;</span>
                <date-picker :time.sync="recordTime"></date-picker>
              </div>
              <button class="btn btn-box-tool" data-widget="collapse">
                <i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="box-body" style="display: block;">
            <div class="table-responsive">
              <table class="table no-margin table200">
                <thead>
                  <tr>
                    <th>名称</th>
                    <th>编号</th>
                    <th>类型</th>
                    <th>上级表</th>
                    <th>当前度数</th>
                    <th>上次录入时间</th>
                    <th>上次录入结果</th>
                    <th>录入</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="meter in meterList">
                    <td>{{meter.name}}</td>
                    <td>{{meter.code}}</td>
                    <td>{{meter.type_name}}</td>
                    <td>{{meter.parent ? meter.parent.name : ''}}</td>
                    <td>{{meter.current}}</td>
                    <td>{{meter.last_input_time == 0 ? '暂无记录' : dateDiff(meter.last_input_time)}}</td>
                    <td><span class="label" v-bind:class="{ 'label-danger': meter.last_input_status == -1, 'label-warning': meter.last_input_status == 1, 'label-success': meter.last_input_status == 2 } ">{{meter.last_input_status_name}}</span></td>
                    <td><input v-on:keyup.enter="submitValue(meter)" type=number v-model="meter.value"/>  <a v-show="meter.value" class="label label-primary" @click="submitValue(meter)">提交</a></td>
                    <td><a class="label label-danger" @click="toggleReplaceMeter(meter)">换表</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <modal title="录入警告" :show.sync="showForceSubmit" effect="fade">
          <div slot="modal-body" class="modal-body">
            当前数值可能过大, 请再次检查, 确认无误后点击强制提交
          </div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showForceSubmit = false'>取消</button>
            <button type="button" class="btn btn-danger" @click='forceSubmit()'>强制提交</button>
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
            <button type="button" class="btn btn-success" @click='replaceMeter()'>确定</button>
          </div>
        </modal>
      </div>
    </div>
  </section>
</template>
<style>
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
        // 节点树相关
        node: {}, // 当前选中节点
        nodeList: [], // 用于显示节点树
        node_setting: { // 节点树的配置
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
            onClick: onNodeSelected
          }
        },
        // 上次抄表时间
        recordTime: Core.Data.getRecordTime(),
        // 临时变量,用于提交录入
        meterInput: {},
        // 所有表List
        meterList: [],
        // 显示强制提交modal
        showForceSubmit: false,
        // 换表modal控制变量
        meterEditing: {},
        showReplaceMeter: false
      }
    },
    watch: {
      // 同步记录上次的抄表时间
      recordTime: function (value) {
        Core.Data.setRecordTime(value)
      }
    },
    ready () {
      initContext(this)
      initNodeTree()
    },
    methods: {
      refreshNodeTree: function () {
        initNodeTree()
      },
      submitValue: function (meter) {
        submit(meter, false)
      },
      forceSubmit: function () {
        submit(this.meterInput, true)
      },
      dateDiff: function (time) {
        return Core.Util.dateDiff(time)
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

  function initNodeTree () {
    Core.Api.NODE.getNodeTreeRoot().then(function (data) {
      context.nodeList = data.tree_root
      window.$.fn.zTree.init(window.$('#nodeTree'), context.node_setting, context.nodeList)
      var treeObj = window.$.fn.zTree.getZTreeObj('nodeTree')
      var nodes = treeObj.getNodes()
      if (data.tree_root) {
        treeObj.expandNode(nodes[0], true, false, true)
      }
    }, function (error) {
      Core.Toast.error(context, '获取节点树失败')
      Core.Log.e(error)
    })
  }

  function onNodeSelected (event, treeId, treeNode, clickFlag) {
    context.node = treeNode
    context.meterList = []
    if (treeNode.id) {
      getMeterList(treeNode.id)
    }
  }

  function getMeterList (nodeId) {
    Core.Api.METER.getList(nodeId).then(function (data) {
      context.meterList = data.meter_list
    }, function (error) {
      context.meterList = []
      Core.Toast.error(context, '获取该节点表信息失败: ' + error.message)
    })
  }

  function submit (meter, force) {
    if (!meter || !meter.id || !meter.value || meter.value <= 0) {
      Core.Toast.error(context, '非法数据, 请重新输入')
      return
    }
    context.meterInput = meter
    Core.Api.RECORD.input(meter.id, meter.value, context.recordTime / 1000, '', '', force).then((data) => {
      meter.value = undefined
      context.meterInput = {}
      context.meterList = data.meter_list
      context.showForceSubmit = false
    }, (error) => {
      if (error.code && parseInt(error.code) === Core.Const.ERROR.METER_INPUT_WARNING) {
        context.showForceSubmit = true
      } else {
        Core.Toast.error(context, '提交录入失败: ' + error.message)
      }
    })
  }

  // 换表请求
  function replaceMeter (id, name, type, code, rate, begin, end, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark) {
    Core.Api.METER.replace(id, name, code, rate, begin, end, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark).then(function (data) {
      context.showReplaceMeter = false
      context.meterEditing = {}
      getMeterList(context.node.id)
      Core.Toast.success(context, '换表成功')
    }, function (error) {
      Core.Toast.error(context, '换表失败: ' + error.message)
    })
  }

</script>
