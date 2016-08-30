<style>
  .box-footer a {
    cursor: pointer;
  }

  .pagination span {
    margin: 0 12px;
  }

  .pagination_link {
    color: #666;
    cursor: pointer;
  }

  .pagination_link_disabled {
    color: #777;
    cursor: text !important;
  }
</style>
<template>
  <!-- Content Header (Page header) -->
  <content-header parent="门户管理" child="文章管理"></content-header>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">文章列表</h3>
            <div class="box-tools">
              <select v-model="typeKind">
                <option value='all'>请选择分类</option>
                <option value='guide'>服务指南</option>
                <option value='news'>新闻公告</option>
                <option value='log'>安检日志</option>
              </select>
              <select v-model="typeCategory">
                <option value='{{category.value}}' v-for='category in categoryList'>{{category.name}}</option>
              </select>
              <button class='btn btn-box-tool' title="发布文章" @click="goToAddArticle()">
                <i class='fa fa-plus-square'></i>
              </button>
              <button class="btn btn-box-tool" data-widget="collapse" title="折叠/展开">
                <i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <tr>
                <th>ID</th>
                <th>标题</th>
                <th>作者</th>
                <th>类型</th>
                <th>发表时间</th>
                <th>更新时间</th>
                <th>编辑</th>
                <th>删除</th>
              </tr>
              <tr v-for="article in articleList">
                <td>{{article.id}}</td>
                <td>{{article.title}}</td>
                <td>{{article.admin ? article.admin.name : 'admin'}}</td>
                <td>{{article.type_name}}</td>
                <td>{{article.create_time_formated}}</td>
                <td>{{article.update_time_formated}}</td>
                <td><a href="javascript:void(0)" class="label label-primary">编辑</a></td>
                <td><a href="javascript:void(0)" class="label label-danger" @click="showDeleteArticle(article)">删除</a></td>
              </tr>
            </table>
          </div>
          <!-- /.box-body -->
          <div class="box-footer text-center">
            <a v-bind:class="{ 'pagination_link_disabled': page <= 1, 'pagination_link': page > 1 }"
               @click="clickToPrevious()">上一页</a>
            <span>&nbsp;&nbsp;&nbsp;{{page}}/{{pageAll}}&nbsp;&nbsp;&nbsp;</span>
            <a v-bind:class="{ 'pagination_link_disabled': page >= pageAll, 'pagination_link': page < pageAll }"
               @click='clickToNext()'>下一页</a>
          </div>
        </div>
        <!-- /.box -->

        <modal title="警告" :show.sync="showDelete" effect="fade">
          <div slot="modal-body" class="modal-body">确认删除  <strong>{{articleEditing.title}}</strong>  ???</div>
          <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='showDelete = false'>取消</button>
            <button type="button" class="btn label-danger" @click="deleteArticle()">删除</button>
          </div>
        </modal>
      </div>
    </div>
  </section>
</template>
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
        page: 1,
        pageAll: 0,
        articleList: [],
        typeKind: 'all',
        typeCategory: 0,
        categoryList: [],
        showDelete: false,
        articleEditing: {}
      }
    },
    ready () {
      initContext(this)
      getArticleList(0, 1)
      this.categoryList = Core.Config.ARTICLE_CATEGORY_LIST.all
    },
    watch: {
      typeKind: function (value) {
        switch (value) {
          case 'all':
            this.categoryList = Core.Config.ARTICLE_CATEGORY_LIST.all
            this.typeCategory = 0
            break
          case 'guide':
            this.categoryList = Core.Config.ARTICLE_CATEGORY_LIST.guide
            this.typeCategory = 10000
            break
          case 'news':
            this.categoryList = Core.Config.ARTICLE_CATEGORY_LIST.news
            this.typeCategory = 20000
            break
          case 'log':
            this.categoryList = Core.Config.ARTICLE_CATEGORY_LIST.log
            this.typeCategory = 30000
            break
          default:
            this.categoryList = Core.Config.ARTICLE_CATEGORY_LIST.all
            this.typeCategory = 0
            break
        }
      },
      typeCategory: function (type) {
        this.typeCategory = type
        this.page = 1
        getArticleList(type, this.page)
      }
    },
    methods: {
      clickToPrevious: function () {
        this.page = parseInt(this.page)
        if (this.page <= 1) {
          return
        }
        Core.Api.ARTICLE.getArticleList(this.typeCategory, this.page - 1).then((data) => {
          context.articleList = data.article_list
          context.pageAll = Math.ceil(data.count / 10)
          --context.page
        }, (error) => {
          Core.Toast.error(context, error.message)
        })
      },
      clickToNext: function () {
        this.page = parseInt(this.page)
        if (this.page >= this.pageAll) {
          return
        }
        Core.Api.ARTICLE.getArticleList(this.typeCategory, this.page + 1).then((data) => {
          context.articleList = data.article_list
          context.pageAll = Math.ceil(data.count / 10)
          ++context.page
        }, (error) => {
          Core.Toast.error(context, error.message)
        })
      },
      goToAddArticle: function () {
        this.$route.router.go('/dashboard/home/article')
      },
      showDeleteArticle: function (article) {
        this.articleEditing = article
        this.showDelete = true
      },
      deleteArticle: function () {
        this.showDelete = false
        Core.Api.ARTICLE.deleteArticle(this.articleEditing.id).then((data) => {
          this.articleEditing = {}
          getArticleList(this.typeCategory, this.page)
        }, (error) => {
          Core.Toast.error(this, error.message)
          this.articleEditing = {}
        })
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getArticleList (type, page) {
    Core.Api.ARTICLE.getArticleList(type, page).then((data) => {
      context.articleList = data.article_list
      context.pageAll = Math.ceil(data.count / 10)
    }, (error) => {
      Core.Toast.error(context, error.message)
    })
  }

</script>
