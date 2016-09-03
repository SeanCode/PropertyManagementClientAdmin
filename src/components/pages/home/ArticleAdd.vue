<template>
  <content-header parent="门户管理" child="文章管理"></content-header>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
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
            <div class="article_add_textarea_wrapper">
              <textarea id="article_add_textarea" class="article_add_textarea"></textarea>
            </div>
          </div>
          <div class="box-footer box-footer_center">
            <a href="javascript:void(0)" class="label label-primary add_btn" @click="addArticle()">提交</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
  .box-footer_center {
    text-align: center;
  }

  .add_btn {
    padding: 8px 20px;
  }

  .article_add_textarea {
    width: 100%;
    height: 400px;
    border: 1px solid #dddddd
  }

</style>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'

  export default {
    components: {
      'content-header': ContentHeader
    },
    data () {
      return {
        article: {}
      }
    },
    ready () {
      // 跟ArticleDetail.vue一样 可能获取不到wysihtml5这个function 导致初始化失败
      var textarea = window.$('.article_add_textarea')
      if (textarea) {
        textarea.remove()
      }
      window.$('.article_add_textarea_wrapper').html('<textarea id="article_add_textarea" class="article_add_textarea"></textarea>')
      var wysihtml5 = window.$('.article_add_textarea').wysihtml5
      if (wysihtml5 && typeof (wysihtml5) === 'function') {
        window.$('.article_add_textarea').wysihtml5({
          toolbar: {
            'fa': true,
            'link': false,
            'image': false
          }
        })
      } else {
        setTimeout(() => {
          window.$('.article_add_textarea').wysihtml5({
            toolbar: {
              'fa': true,
              'link': false,
              'image': false
            }
          })
        }, 1000)
      }
    },
    methods: {
      addArticle: function () {
        Core.Log.d(window.$('.article_add_textarea').val())
      }
    }
  }
</script>
