<template>
  <!-- Content Header (Page header) -->
  <content-header parent="水电气审核" child="待审核"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">待审核列表</h3>
            <div class="box-tools">
              <button class="btn btn-box-tool btn-default btn-white btn-primary" @click="approveSelected()">通过</button>
              <button class="btn btn-box-tool btn-default btn-white btn-warning" @click="rejectSelected()">回绝</button>
              <button class="btn btn-box-tool btn-default btn-white btn-success" @click="approveNormal()">通过正常数据</button>
              <button class="btn btn-box-tool" @click="refresh()">
                <i class="fa fa-refresh"></i>
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <thead>
              <tr>
                <th><input type="checkbox" v-model="selectAll"/></th>
                <th>#</th>
                <th>节点</th>
                <th>表名</th>
                <th>表编号</th>
                <th>表类型</th>
                <th>起度</th>
                <th>止度</th>
                <th>用度</th>
                <th>抄表人</th>
                <th>抄表时间</th>
                <th>录入时间</th>
                <th>标记</th>
                <th>备注</th>
                <th>通过</th>
                <th>回绝</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="record in recordList">
                <td><input type="checkbox" v-model="record.selected"/></td>
                <td>{{record.id}}</td>
                <td>{{record.node.name}}</td>
                <td>{{record.meter.name}}</td>
                <td>{{record.meter.code}}</td>
                <td>{{record.meter.type_name}}</td>
                <td>{{record.begin}}</td>
                <td>{{record.end}}</td>
                <td>{{record.end - record.begin}}</td>
                <td>{{record.reader}}</td>
                <td>{{dateFormat(record.time)}}</td>
                <td>{{timeFormat(record.create_time)}}</td>
                <td><span class="badge"
                          v-bind:class="{ 'label-warning': record.tag==2, 'label-danger': record.tag==3}"
                          v-show="record.tag !== 0">{{record.tag_name}}</span>
                </td>
                <td>{{record.remark}}</td>
                <td><a href="javascript:void(0)" class="label label-primary"
                       @click="toggleApprove($index, record)">通过</a></td>
                <td><a href="javascript:void(0)" class="label label-danger" @click="toggleReject($index, record)">回绝</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
          <div class="box-footer text-center" v-show="!loadAll">
            <a v-bind:class="{ 'pagination_link_disabled': page <= 1, 'pagination_link': page > 1 }"
               @click="clickToPrevious()">上一页</a>
            <span>&nbsp;&nbsp;&nbsp;{{page}}/{{pageAll}}&nbsp;&nbsp;&nbsp;</span>
            <a v-bind:class="{ 'pagination_link_disabled': page >= pageAll, 'pagination_link': page < pageAll }"
               @click='clickToNext()'>下一页</a>
          </div>
          <modal title="警告!!!" :show.sync="showApproveRecord" effect="fade">
            <div slot="modal-body" class="modal-body">确认<strong>通过</strong>? <br><br>请谨慎操作 !</div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showApproveRecord = false'>取消</button>
              <button type="button" class="btn label-primary" @click="approve()">通过</button>
            </div>
          </modal>
          <modal title="警告!!!" :show.sync="showRejectRecord" effect="fade">
            <div slot="modal-body" class="modal-body">确认<strong>回绝</strong>? <br><br>请谨慎操作 !</div>
            <div slot="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-default" @click='showRejectRecord = false'>取消</button>
              <button type="button" class="btn label-danger" @click="reject()">回绝</button>
            </div>
          </modal>
        </div>
        <!-- /.box -->
      </div>
    </div>
  </section>
</template>
<style>
  .btn-white {
    color: white;
  }
</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'
  import Modal from '../../widgets/Modal.vue'

  export default {
    components: {
      'content-header': ContentHeader,
      'modal': Modal
    },
    data () {
      return {
        recordList: [],
        page: 0,
        pageAll: 0,
        recordEditing: {},
        showApproveRecord: false,
        showRejectRecord: false,
        selectAll: false
      }
    },
    ready () {
      initContext(this)
      getPendingList(1)
    },
    watch: {
      selectAll: function (value) {
        for (var i in this.recordList) {
          if (this.recordList.hasOwnProperty(i)) {
            this.recordList[i].selected = value
          }
        }
      }
    },
    methods: {
      refresh: function () {
        getPendingList(1)
      },
      toggleApprove: function (index, record) {
        this.showApproveRecord = true
        this.recordEditing = record
        this.recordEditing.index = index
      },
      approve: function () {
        approvedRecord(this.recordEditing)
      },
      toggleReject: function (index, record) {
        this.showRejectRecord = true
        this.recordEditing = record
        this.recordEditing.index = index
      },
      reject: function () {
        rejectRecord(this.recordEditing)
      },
      dateFormat: function (time) {
        return Core.Util.date('Y/m/d', time)
      },
      timeFormat: function (time) {
        return Core.Util.date('Y/m/d H:i', time)
      },
      clickToPrevious: function () {
        this.page = parseInt(this.page)
        if (this.page <= 1) {
          return
        }
        Core.Api.RECORD.getPendingList(this.page - 1).then(function (data) {
          context.recordList = data.pending_list
          context.pageAll = Math.ceil(data.pending_count / 10)
          if (data.pending_list.length > 0) {
            --context.page
          }
        }, function (error) {
          Core.Toast.error(context, '获取待审核列表失败: ' + error.message)
        })
      },
      clickToNext: function () {
        this.page = parseInt(this.page)
        if (this.page >= this.pageAll) {
          return
        }
        Core.Api.RECORD.getPendingList(this.page + 1).then(function (data) {
          context.recordList = data.pending_list
          context.pageAll = Math.ceil(data.pending_count / 10)
          if (data.pending_list.length > 0) {
            ++context.page
          }
        }, function (error) {
          Core.Toast.error(context, '获取待审核列表失败: ' + error.message)
        })
      },
      approveSelected: function () {
        var idList = getSelectedId()
        if (idList.length === 0) {
          Core.Toast.error(this, '请勾选要通过的记录')
        } else {
          checkRecordInBatch(idList.join(','), '1')
        }
      },
      rejectSelected: function () {
        var idList = getSelectedId()
        if (idList.length === 0) {
          Core.Toast.error(this, '请勾选要回绝的记录')
        } else {
          checkRecordInBatch(idList.join(','), -1)
        }
      },
      approveNormal: function () {
        var idList = []
        for (var i in context.recordList) {
          if (context.recordList.hasOwnProperty(i)) {
            var record = context.recordList[i]
            if (parseInt(record.tag) === 1) {
              idList.push(record.id)
            }
          }
        }
        if (idList.length === 0) {
          Core.Toast.error(this, '没有正常状态数据, 请逐条操作')
        } else {
          checkRecordInBatch(idList.join(','), 1)
        }
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getPendingList (page) {
    Core.Api.RECORD.getPendingList(page).then(function (data) {
      var temp = data.pending_list
      for (var i in temp) {
        if (temp.hasOwnProperty(i)) {
          temp[i].selected = false
        }
      }
      context.recordList = temp
      context.pageAll = Math.ceil(data.pending_count / 10)
      if (data.pending_list.length > 0) {
        ++context.page
      }
    }, function (error) {
      Core.Toast.error(context, '获取待审核列表失败: ' + error.message)
    })
  }

  function approvedRecord (record) {
    Core.Api.RECORD.checkRecord(record.id, 1).then(function (data) {
      context.showApproveRecord = false
      Core.Toast.success(context, '操作成功')
      context.recordList = context.recordList.slice(record.index + 1)
      context.$broadcast('approve-pended')
    }, function (error) {
      Core.Toast.error(context, '操作失败: ' + error.message)
    })
  }

  function rejectRecord (record) {
    Core.Api.RECORD.checkRecord(record.id, -1).then(function (data) {
      context.showRejectRecord = false
      Core.Toast.success(context, '操作成功')
      context.recordList = context.recordList.slice(record.index + 1)
      context.$root.$broadcast('approve-pended')
    }, function (error) {
      Core.Toast.error(context, '操作失败: ' + error.message)
    })
  }

  function getSelectedId () {
    var idList = []
    for (var i in context.recordList) {
      if (context.recordList.hasOwnProperty(i)) {
        var record = context.recordList[i]
        if (record.selected) {
          idList.push(record.id)
        }
      }
    }
    return idList
  }

  function checkRecordInBatch (idList, status) {
    Core.Api.RECORD.checkRecord(idList, status).then(function (data) {
      Core.Toast.success(context, '操作成功')
      getPendingList(1)
    }, function (error) {
      Core.Toast.error(context, '操作失败: ' + error.message)
    })
  }
</script>
