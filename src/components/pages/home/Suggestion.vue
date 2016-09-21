<template>
  <content-header parent="门户管理" child="意见建议管理"></content-header>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box  box-info">
          <div class="box-header">
            <h3 class="box-title">未处理</h3>
            <div class="box-tools">
              <button class="btn btn-box-tool" data-widget="collapse" title="折叠/展开">
                <i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <tr>
                <th>姓名</th>
                <th>一卡通/学号</th>
                <th>内容</th>
                <th>类型</th>
                <th>提交时间</th>
                <th>操作</th>
              </tr>
              <tr v-for="suggest in unreadList">
                <td>{{suggest.user_name}}</td>
                <td>{{suggest.user_account}}</td>
                <td>{{suggest.content}}</td>
                <td><small  class="label" v-bind:class="{ 'bg-green': suggest.type==1, 'label-primary': suggest.type==2}">{{suggest.type_name}}</small></td>
                <td>{{suggest.create_time_formatted}}</td>
                <td><a href="javascript:void(0)" class="label label-primary" @click="toggleShowReply(suggest)">回复</a></td>
              </tr>
            </table>
          </div>
          <div class="box-footer text-center">
            <a v-bind:class="{ 'pagination_link_disabled': pageRead <= 1, 'pagination_link': pageRead > 1 }"
               @click="clickToPreviousRead()">上一页</a>
            <span>&nbsp;&nbsp;&nbsp;{{pageRead}}/{{pageReadAll}}&nbsp;&nbsp;&nbsp;</span>
            <a v-bind:class="{ 'pagination_link_disabled': pageRead >= pageReadAll, 'pagination_link': pageRead < pageReadAll }"
               @click='clickToNextRead()'>下一页</a>
          </div>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">已处理</h3>
            <div class="box-tools">
              <button class="btn btn-box-tool" data-widget="collapse" title="折叠/展开">
                <i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <tr>
                <th>姓名</th>
                <th>一卡通/学号</th>
                <th>内容</th>
                <th>类型</th>
                <th>回复内容</th>
                <th>提交时间</th>
                <th>处理时间</th>
              </tr>
              <tr v-for="suggest in readList">
                <td>{{suggest.user_name}}</td>
                <td>{{suggest.user_account}}</td>
                <td>{{suggest.content}}</td>
                <td><small  class="label" v-bind:class="{ 'bg-green': suggest.type==1, 'label-primary': suggest.type==2}">{{suggest.type_name}}</small></td>
                <td>{{suggest.reply}}</td>
                <td>{{suggest.create_time_formatted}}</td>
                <td>{{suggest.update_time_formatted}}</td>
              </tr>
            </table>
          </div>
          <div class="box-footer text-center">
            <a v-bind:class="{ 'pagination_link_disabled': pageUnread <= 1, 'pagination_link': pageUnread > 1 }"
               @click="clickToPreviousUnread()">上一页</a>
            <span>&nbsp;&nbsp;&nbsp;{{pageUnread}}/{{pageUnreadAll}}&nbsp;&nbsp;&nbsp;</span>
            <a v-bind:class="{ 'pagination_link_disabled': pageUnread >= pageUnreadAll, 'pagination_link': pageUnread < pageUnreadAll }"
               @click='clickToNextUnread()'>下一页</a>
          </div>
        </div>
      </div>
      <modal title="回复" :show.sync="showReply" effect="fade" large>
        <div slot="modal-body" class="modal-body">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-1 control-label">内容</label>
              <div class="col-sm-11">
                <p class="form-control-static">{{suggestEditing.content}}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-1 control-label">回复</label>
              <div class="col-sm-11">
                <textarea class="form-control" rows="10" v-model="suggestEditing.reply"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showReply = false'>取消</button>
          <button type="button" class="btn label-primary" @click="reply()">回复</button>
        </div>
      </modal>
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
        pageRead: 0,
        pageReadAll: 0,
        pageUnread: 0,
        pageUnreadAll: 0,
        readList: [],
        unreadList: [],
        showReply: false,
        suggestEditing: {}
      }
    },
    ready () {
      this.initList()
    },
    methods: {
      clickToPreviousRead: function () {
        this.pageRead = parseInt(this.pageRead)
        if (this.pageRead <= 1) {
          return
        }
        Core.Api.SUGGESTION.getSuggestionListByStatus(1, this.pageRead - 1).then((data) => {
          this.readList = data.suggestion_list
          this.pageReadAll = Math.ceil(data.count / 10)
          --this.pageRead
        }, (error) => {
          Core.Toast.error(this, '获取列表失败: ' + error.message)
        })
      },
      clickToNextRead: function () {
        this.pageRead = parseInt(this.pageRead)
        if (this.pageRead >= this.pageReadAll) {
          return
        }
        Core.Api.SUGGESTION.getSuggestionListByStatus(1, this.pageRead + 1).then((data) => {
          this.readList = data.suggestion_list
          this.pageReadAll = Math.ceil(data.count / 10)
          ++this.pageRead
        }, (error) => {
          Core.Toast.error(this, '获取列表失败: ' + error.message)
        })
      },
      clickToPreviousUnread: function () {
        this.pageUnread = parseInt(this.pageUnread)
        if (this.pageUnread <= 1) {
          return
        }
        Core.Api.SUGGESTION.getSuggestionListByStatus(0, this.pageUnread - 1).then((data) => {
          this.unreadList = data.suggestion_list
          this.pageUnreadAll = Math.ceil(data.count / 10)
          --this.pageUnread
        }, (error) => {
          Core.Toast.error(this, '获取列表失败: ' + error.message)
        })
      },
      clickToNextUnread: function () {
        this.pageUnread = parseInt(this.pageUnread)
        if (this.pageUnread >= this.pageUnreadAll) {
          return
        }
        Core.Api.SUGGESTION.getSuggestionListByStatus(1, this.pageUnread + 1).then((data) => {
          this.readList = data.suggestion_list
          this.pageUnreadAll = Math.ceil(data.count / 10)
          ++this.pageUnread
        }, (error) => {
          Core.Toast.error(this, '获取列表失败: ' + error.message)
        })
      },
      toggleShowReply: function (suggest) {
        this.suggestEditing = suggest
        this.showReply = true
      },
      reply: function () {
        if (this.suggestEditing.reply === undefined || this.suggestEditing.reply.length === 0) {
          Core.Toast.error(this, '请填写回复内容后,再提交')
          return
        }
        this.showReply = false
        Core.Api.SUGGESTION.reply(this.suggestEditing.id, this.suggestEditing.reply).then(() => {
          Core.Toast.success(this, '回复成功')
          this.suggestEditing = {}
          this.initList()
        }, (error) => {
          Core.Toast.error(this, '回复失败: ' + error.message)
        })
      },
      initList: function () {
        // 未处理列表
        Core.Api.SUGGESTION.getSuggestionListByStatus(0).then((data) => {
          this.unreadList = data.suggestion_list
          this.pageUnreadAll = Math.ceil(data.count / 10)
          if (this.pageUnreadAll > 0) {
            this.pageUnread = 1
          } else {
            this.pageRead = 0
          }
        }, (error) => {
          Core.Toast.error(this, '获取列表失败: ' + error.message)
        })
        // 已处理列表
        Core.Api.SUGGESTION.getSuggestionListByStatus(1).then((data) => {
          this.readList = data.suggestion_list
          this.pageReadAll = Math.ceil(data.count / 10)
          if (this.pageReadAll > 0) {
            this.pageRead = 1
          } else {
            this.pageRead = 0
          }
        }, (error) => {
          Core.Toast.error(this, '获取列表失败: ' + error.message)
        })
      }
    }
  }
</script>
