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
              <button class="btn btn-box-tool" @click="refresh()">
                <i class="fa fa-refresh"></i>
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <tr>
                <th>ID</th>
                <th>节点</th>
                <th>表名</th>
                <th>表编号</th>
                <th>表类型</th>
                <th>起度</th>
                <th>止度</th>
                <th>用度</th>
                <th>抄表人</th>
                <th>抄表时间</th>
                <th>录入人</th>
                <th>录入时间</th>
                <th>标记</th>
                <th>备注</th>
                <th>通过</th>
                <th>回绝</th>
              </tr>
              <tr v-for="record in recordList">
                <td>{{record.id}}</td>
                <td>{{record.node.name}}</td>
                <td>{{record.meter.name}}</td>
                <td>{{record.meter.code}}</td>
                <td>{{record.meter.type_name}}</td>
                <td>{{record.begin}}</td>
                <td>{{record.end}}</td>
                <td>{{record.end - record.begin}}</td>
                <td>{{record.reader}}</td>
                <td>{{new Date(record.time*1000).toLocaleString()}}</td>
                <td>{{record.operator.username}}</td>
                <td>{{new Date(record.create_time*1000).toLocaleString()}}</td>
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
            </table>
          </div>
          <!-- /.box-body -->
          <div class="box-footer text-center" v-show="!loadAll">
            <a href="javascript:void(0)" @click="loadNextPage()">加载更多</a>
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
        loadAll: false,
        loading: true,
        recordEditing: {},
        showApproveRecord: false,
        showRejectRecord: false
      }
    },
    ready () {
      initContext(this)
      getPendingList(0)
    },
    methods: {
      loadNextPage: function () {
        if (!this.loading) {
          getPendingList(this.page)
        } else {
          Core.Toast.info('加载中...请稍候')
        }
      },
      refresh: function () {
        getPendingList(0)
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
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getPendingList (page) {
    Core.Api.RECORD.getPendingList(page).then(function (data) {
      if (page === 0) {
        context.recordList = []
      }
      context.loading = false
      if (data.pending_list.length > 0) {
        ++context.page
        var i = 0
        for (i; i < data.pending_list.length; i++) {
          context.recordList.push(data.pending_list[i])
        }
      } else {
        context.loadAll = true
        Core.Toast.info(context, '列表获取完毕')
      }
    }, function (error) {
      context.loading = false
      Core.Toast.error(context, '获取待审核列表失败: ' + error.message)
    })
  }

  function approvedRecord (record) {
    Core.Api.RECORD.checkRecord(record.id, 1).then(function (data) {
      context.showApproveRecord = false
      Core.Toast.success(context, '操作成功')
      context.recordList = context.recordList.slice(record.index + 1)
    }, function (error) {
      Core.Toast.error(context, '操作失败: ' + error.message)
    })
  }

  function rejectRecord (record) {
    Core.Api.RECORD.checkRecord(record.id, -1).then(function (data) {
      context.showRejectRecord = false
      Core.Toast.success(context, '操作成功')
      context.recordList = context.recordList.slice(record.index + 1)
    }, function (error) {
      Core.Toast.error(context, '操作失败: ' + error.message)
    })
  }
</script>
