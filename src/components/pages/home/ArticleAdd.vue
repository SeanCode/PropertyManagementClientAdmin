<style>

  .img_box_wrapper {

  }

  .img_box {
    float: left;
    margin: 0 10px;
  }

  .img_cross {
    text-align: center;
  }

  .img_cross a {
    color: red;
  }

  .img_add_box {
    padding: 35px 0 35px 10px;
  }

  .img_box img{
    max-height: 100px;
    overflow: hidden;
  }

  .attachment_box {
  }

  .attachment_box  li {
    list-style: disc;
  }

  .attachment_box  ul {
    padding-left: 20px;
  }

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

  .link_cross {
    margin-left: 10px;
    color: red;
  }

  .footer_btn {
    margin-left: 20px;
  }

  .btn_upload_img {
  }

  .btn_upload_img span {
    padding: 0 !important;
    font-size: 12px !important;
    color: #fff !important;
    background-color: transparent !important;;
  }
</style>
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
                  <select v-model="type" class="form-control">
                    <option value="{{t.value}}" v-for="t in typeList">{{t.name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-horizontal">
              <div class="form-group">
                <div class="col-sm-6">
                  <input class="form-control" placeholder="请填写标题" v-model="title">
                </div>
              </div>
            </div>
          </div>
          <div class="box-body">
            <div class="article_add_textarea_wrapper">
              <textarea id="article_add_textarea" class="article_add_textarea"></textarea>
            </div>
          </div>
          <div class="box-footer">
            <div class="img_box_wrapper">
              <div class="img_box" v-for="img in imgs" track-by="$index">
                <img :src="imgUrl(img)">
                <div class="img_cross"><a href="javascript:void(0)" @click="deleteImg($index)"><i class="fa fa-times"></i></a></div>
              </div>
              <div class="img_box img_add_box">
                <a href="javascript:void(0)" class="label label-primary add_btn btn_upload_img">
                  <file-upload icon="" label="添加图片" :url="uploadImgUrl()" :files.sync="imgFiles" :filters="imgFilters" :events='imgCbEvents' :request-options="reqopts"></file-upload>
                </a>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="box-footer">
            <div class="attachment_box">
              <ul>
                <li v-for="attach in attachments" track-by="$index">
                  <a target="_blank" href="/static/res/{{attach.url}}">{{attach.name}}</a>
                  <a href="javascript:void(0)" class="link_cross" @click="deleteAttachment($index)"><i class="fa fa-times"></i></a>
                </li>
              </ul>
            </div>
            <a href="javascript:void(0)" class="label label-primary add_btn footer_btn btn_upload_img">
              <file-upload icon="" label="添加附件" :url="uploadAttachmentUrl()" :files.sync="attachmentFiles" :filters="attachmentFilters" :events="attachmentCbEvents" :request-options="reqopts"></file-upload>
            </a>
            <span>&nbsp;&nbsp;&nbsp;最大允许上传文件大小为10M, 否则会上传失败</span>
          </div>
          <div class="box-footer box-footer_center">
            <a href="javascript:void(0)" class="label label-primary add_btn" @click="trySaveArticle()">提交</a>
          </div>
        </div>
      </div>
      <modal title="确认" :show.sync="showUploadPicture" effect="fade">
        <div slot="modal-body" class="modal-body">确认上传该照片?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='toggleUploadImg()'>取消</button>
          <button type="button" class="btn label-info" @click="uploadImg()">上传</button>
        </div>
      </modal>
      <modal title="确认" :show.sync="showUploadAttachment" effect="fade">
        <div slot="modal-body" class="modal-body">确认上传该附件?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='toggleUploadAttachment()'>取消</button>
          <button type="button" class="btn label-info" @click="uploadAttachment()">上传</button>
        </div>
      </modal>
      <modal title="确认" :show.sync="showSaveArticle" effect="fade">
        <div slot="modal-body" class="modal-body">请确认选择的文章类型,若无误则点击确认按钮提交!</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showSaveArticle = false'>取消</button>
          <button type="button" class="btn label-info" @click="saveArticle()">确认</button>
        </div>
      </modal>
    </div>
  </section>
</template>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'
  import VueFileUpload from 'vue-file-upload'
  import Modal from '../../widgets/Modal.vue'

  export default {
    components: {
      'content-header': ContentHeader,
      'modal': Modal,
      'file-upload': VueFileUpload
    },
    data () {
      return {
        title: '',
        imgs: [],
        type: 10001,
        typeList: Core.Config.ARTICLE_SAVE_CATEGORY_LIST,
        attachments: [],
        showUploadPicture: false,
        showUploadAttachment: false,
        showSaveArticle: false,
        imgFilters: [{
          name: 'imageFilter',
          fn (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1
          }}
        ],
        imgCbEvents: {
          onCompleteUpload: (file, response, status, header) => {
            Core.Progress.hide(this)
          },
          onProgressUpload: (file, progress) => {
            Core.Progress.update(this, progress)
          },
          onSuccessUpload: (file, response, status, headers) => {
            if (response && response.data && response.code === 0) {
              this.imgs.push('img/' + response.data.img)
              Core.Toast.success(this, '上传图片成功')
            } else {
              Core.Toast.error(this, '上传失败')
            }
          },
          onErrorUpload: (file, response, status, headers) => {
            Core.Toast.error(this, '上传失败')
          },
          onAbortUpload: (file, response, status, headers) => {
            Core.Toast.error(this, '取消上传')
          },
          onAddFileSuccess: (file) => {
            this.toggleUploadImg()
          },
          onAddFileFail: () => {
            Core.Toast.error(this, '请选择正确类型的文件')
          }
        },
        imgFiles: [],
        attachmentFilters: [],
        attachmentCbEvents: {
          onCompleteUpload: (file, response, status, header) => {
            Core.Progress.hide(this)
          },
          onProgressUpload: (file, progress) => {
            Core.Progress.update(this, progress)
          },
          onSuccessUpload: (file, response, status, headers) => {
            if (response && response.data && response.code === 0) {
              this.attachments.push(response.data.attachment)
              Core.Toast.success(this, '上传附件成功')
            } else {
              Core.Toast.error(this, '上传失败')
            }
          },
          onErrorUpload: (file, response, status, headers) => {
            Core.Toast.error(this, '上传失败')
          },
          onAbortUpload: (file, response, status, headers) => {
            Core.Toast.error(this, '取消上传')
          },
          onAddFileSuccess: (file) => {
            this.toggleUploadAttachment()
          },
          onAddFileFail: () => {
            Core.Toast.error(this, '请选择正确类型的文件')
          }
        },
        attachmentFiles: [],
        reqopts: {
          responseType: 'json',
          withCredentials: false,
          headers: {
            Authorization: 'Basic ' + Core.Data.getToken()
          }
        }
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
      uploadImgUrl: function () {
        var endPoint = Core.Config.IS_DEBUG ? Core.Const.NET.END_POINT_DEBUG : Core.Const.NET.END_POINT_RELEASE
        return endPoint + Core.Const.NET.API_PATH + Core.Const.NET.API.UPLOAD_IMG
      },
      uploadAttachmentUrl: function () {
        var endPoint = Core.Config.IS_DEBUG ? Core.Const.NET.END_POINT_DEBUG : Core.Const.NET.END_POINT_RELEASE
        return endPoint + Core.Const.NET.API_PATH + Core.Const.NET.API.UPLOAD_ATTACHMENT
      },
      imgUrl: function (url) {
        if (Core.Config.IS_DEBUG) {
          return 'http://localhost/static/res/' + url
        } else {
          return 'http://202.202.43.93/static/res/' + url
        }
      },
      deleteImg: function (index) {
        if (index < 0 || index >= this.imgs.length) {
          return
        }
        this.imgs.splice(index, 1)
      },
      deleteAttachment: function (index) {
        if (index < 0 || index >= this.attachments.length) {
          return
        }
        this.attachments.splice(index, 1)
      },
      toggleUploadImg: function () {
        if (!this.showUploadPicture) {
          this.showUploadPicture = true
        } else {
          this.showUploadPicture = false
          // 貌似无法去掉文件队列
        }
      },
      uploadImg: function () {
        this.showUploadPicture = false
        // 这里保证一次只上传一张图片
        var length = this.imgFiles.length
        if (length === 0) {
          return
        }
        var index = length - 1
        this.imgFiles[index].upload()
        Core.Toast.info(this, '上传中, 请稍后...')
        Core.Progress.show(this)
      },
      toggleUploadAttachment: function () {
        if (!this.showUploadAttachment) {
          this.showUploadAttachment = true
        } else {
          this.showUploadAttachment = false
          // 貌似无法去掉文件队列
        }
      },
      uploadAttachment: function () {
        this.showUploadAttachment = false
        // 这里保证一次只上传一张图片
        var length = this.attachmentFiles.length
        if (length === 0) {
          return
        }
        var index = length - 1
        this.attachmentFiles[index].upload()
        Core.Toast.info(this, '上传中, 请稍后...')
        Core.Progress.show(this)
      },
      trySaveArticle: function () {
        if (this.title === undefined || this.title.length <= 0) {
          Core.Toast.error(this, '请填写文章标题')
        } else {
          this.showSaveArticle = true
        }
      },
      saveArticle: function () {
        var attachmentId = ''
        for (var i = 0; i < this.attachments.length; i++) {
          var attach = this.attachments[i]
          attachmentId = attachmentId + ',' + attach.id
        }
        var imgNames = this.imgs.join()
        Core.Api.ARTICLE.saveArticle(this.type, this.title, window.$('.article_add_textarea').val(), attachmentId, imgNames).then((data) => {
          this.showSaveArticle = false
          Core.Toast.success(this, '提交成功')
          this.$route.router.go('/dashboard/home/article')
        }, (error) => {
          this.showSaveArticle = false
          Core.Toast.error(this, '提交失败: ' + error.message)
        })
      }
    }
  }
</script>
