<template>
  <content-header parent="门户管理" child="文章管理"></content-header>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box" v-show="article.id">
          <div class="box-header with-border">
            <div class="form-horizontal">
              <div class="form-group">
                <div class="col-sm-6">
                  <input class="form-control" placeholder="请填写标题" v-model="article.title">
                </div>
              </div>
            </div>
          </div>
          <div class="box-body">
            <div class="article_edit_textarea_wrapper">
              <textarea id="article_edit_textarea" class="article_edit_textarea"></textarea>
            </div>
          </div>
          <div class="box-footer box-footer_right">
            <a href="javascript:void(0)" class="label label-primary update_btn" @click="updateArticle()">更新</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
  .box-footer_right {
    text-align: right;
  }

  .article_edit_textarea {
    width: 100%;
    height: 400px;
    border: 1px solid #dddddd
  }

  .update_btn {
    padding: 8px 20px;
  }
</style>
<script>
  // 这个vue文件 可能是我写过的最恶心的一个vue了,比表节点那个vue还恶心!!!
  // 珍爱生命 远离前端
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'

  export default {
    components: {
      'content-header': ContentHeader
    },
    route: {
      data (transition) {
        var params = transition.to.params
        var type = params.type
        var id = params.id
        Core.Api.ARTICLE.getArticleContent(type, id).then((data) => {
          transition.next({
            article: data.article
          })
        }, () => {
          Core.Toast.error(this, '获取文章失败, 请重试')
        })
      }
    },
    data () {
      return {
        article: {}
      }
    },
    ready () {},
    watch: {
      // 由于在route方法里面去获取文章内容,并不是一个同步的过程!!!其实是异步的,所以可能刚渲染完的时候,是拿不到内容的,
      // 所以需要watch article
      // 当发现article获取到了就把内容设置到编辑器里面
      article: function (val) {
        var textarea = window.$('.article_edit_textarea')
        if (textarea) {
          textarea.remove()
        }
        window.$('.article_edit_textarea_wrapper').html('<textarea id="article_edit_textarea" class="article_edit_textarea"></textarea>')
        window.$('.article_edit_textarea').wysihtml5({
          toolbar: {
            'fa': true,
            'link': false,
            'image': false
          }
        }).html(val.content)
      }
    },
    methods: {
      updateArticle: function () {
        Core.Api.ARTICLE.updateArticle(this.article.id, this.article.title, window.$('.article_edit_textarea').val(), this.article.attachments, this.article.img).then((data) => {
          Core.Toast.success(this, '更新文章成功')
          this.$route.router.go('/dashboard/home/article')
        }, (error) => {
          Core.Toast.error(this, '文章更新时发生错误: ' + error.message)
        })
      }
    }
  }
</script>
