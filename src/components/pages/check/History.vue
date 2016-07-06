<template>
  <!-- Content Header (Page header) -->
  <content-header parent="水电气审核" child="审核历史"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">我审核的</h3>
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
                <td><span class="label"
                          v-bind:class="{ 'label-warning': record.tag==2, 'label-danger': record.tag==3}"
                          v-show="record.tag !== 0">{{record.tag_name}}</span>
                </td>
                <td>{{record.remark}}</td>
              </tr>
            </table>
          </div>
          <!-- /.box-body -->
          <div class="box-footer text-center" v-show="!loadAll">
            <a href="javascript:void(0)" class="uppercase" @click="loadNextPage()">加载更多</a>
          </div>
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
        loading: true
      }
    },
    ready () {
      initContext(this)
      getCheckedList(0)
    },
    methods: {
      loadNextPage: function () {
        if (!this.loading) {
          getCheckedList(this.page)
        } else {
          Core.Toast.info('加载中...请稍候')
        }
      },
      refresh: function () {
        getCheckedList(0)
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getCheckedList (page) {
    Core.Api.RECORD.getCheckedList(page).then(function (data) {
      if (page === 0) {
        context.recordList = []
      }
      context.loading = false
      if (data.checked_list.length > 0) {
        ++context.page
        var i = 0
        for (i; i < data.checked_list.length; i++) {
          context.recordList.push(data.checked_list[i])
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
</script>
