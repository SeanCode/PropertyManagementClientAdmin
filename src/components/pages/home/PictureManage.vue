<style>
  .photo_box {
    width: 260px;
    height: 200px;
    float: left;
  }

  .photo_wrapper {
    width: 240px;
    height: 160px;
    margin: 10px;
  }

  .photo_box img {
    max-width: 240px;
  }

  .photo_editor {
    height: 20px;
  }

  .clear {
    clear: both;
  }
</style>
<template>
  <!-- Content Header (Page header) -->
  <content-header parent="门户管理" child="风采管理"></content-header>
  <section class="content">
    <div class="row">
      <div class="col-md-4">
        <div class="box box-info">
          <div class="box-header">
            <h3 class="box-title">相册({{coverCount}})</h3>
            <div class="box-tools">
              <select v-model="type">
                <option value="{{type.value}}" v-for="type in typeList">{{type.name}}</option>
              </select>
            </div>
          </div>
          <div class="box-body table-responsive no-padding" style="display: block;">
            <table class="table table-hover">
              <tr>
                <th>类型</th>
                <th>相册名</th>
              </tr>
              <tr v-for="cover in coverList" @click="showCoverPhotos(cover)">
                <td>{{cover.type_name}}</td>
                <td>{{cover.name}}</td>
              </tr>
            </table>
          </div>
          <div class="box-footer text-center">
            <a v-bind:class="{ 'pagination_link_disabled': coverPage <= 1, 'pagination_link': coverPage > 1 }"
               @click="clickToPreviousCover()">上一页</a>
            <span>&nbsp;&nbsp;&nbsp;{{coverPage}}/{{coverPageAll}}&nbsp;&nbsp;&nbsp;</span>
            <a v-bind:class="{ 'pagination_link_disabled': coverPage >= coverPageAll, 'pagination_link': coverPage < coverPageAll }"
               @click='clickToNextCover()'>下一页</a>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="box box-info">
          <div class="box-header">
            <h3 class="box-title">{{coverEditing.id ? coverEditing.name : '请选择相册'}}({{photoCount}})</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" v-show="coverEditing.id" title="修改">
                <i class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-box-tool" title="添加照片">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="display: block; text-align: center">
            <div class="photo_box" v-for="photo in photoList">
              <div class="photo_wrapper">
                <img :src="photoUrl(photo.url)"/>
              </div>
              <div class="photo_editor">
                <a href="javascript:void(0)" class="label label-danger" @click="toggleDeletePhoto(photo)">删除</a>
              </div>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="box-footer text-center">
            <a v-bind:class="{ 'pagination_link_disabled': photoPage <= 1, 'pagination_link': photoPage > 1 }"
               @click="clickToPreviousPhoto()">上一页</a>
            <span>&nbsp;&nbsp;&nbsp;{{photoPage}}/{{photoPageAll}}&nbsp;&nbsp;&nbsp;</span>
            <a v-bind:class="{ 'pagination_link_disabled': photoPage >= photoPageAll, 'pagination_link': photoPage < photoPageAll }"
               @click='clickToNextPhoto()'>下一页</a>
          </div>
        </div>
      </div>
      <modal title="警告" :show.sync="showDeletePhoto" effect="fade">
        <div slot="modal-body" class="modal-body">确认删除该照片??? 请谨慎操作!!!</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showDeletePhoto = false'>取消</button>
          <button type="button" class="btn label-danger" @click="deletePhoto()">删除</button>
        </div>
      </modal>
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
        typeList: Core.Config.PHOTO_TYPE_LIST,
        type: 0,
        coverList: [],
        coverCount: 0,
        coverPage: 1,
        coverPageAll: 0,
        photoPage: 1,
        photoPageAll: 0,
        photoList: [],
        photoCount: 0,
        photoEditing: {},
        coverEditing: {},
        showDeletePhoto: false,
        showDeleteCover: false,
        showEditCover: false
      }
    },
    watch: {
      type: function (value) {
        this.covePage = 1
        getCoverList(value, 1)
      }
    },
    ready () {
      initContext(this)
      getCoverList(this.type, 1)
    },
    methods: {
      clickToPreviousCover: function () {
        this.coverPage = parseInt(this.coverPage)
        if (this.coverPage <= 1) {
          return
        }
        Core.Api.PHOTO.getCoverList(this.type, this.coverPage).then((data) => {
          context.coverList = data.cover_list
          context.coverPageAll = Math.ceil(data.count / 10)
          ++context.coverPage
        }, (error) => {
          Core.Toast.error(context, error.message)
        })
      },
      clickToNextCover: function () {
        this.coverPage = parseInt(this.coverPage)
        if (this.coverPage >= this.coverPageAll) {
          return
        }
        Core.Api.PHOTO.getCoverList(this.type, this.coverPage).then((data) => {
          context.coverList = data.cover_list
          context.coverPageAll = Math.ceil(data.count / 10)
          ++context.coverPage
        }, (error) => {
          Core.Toast.error(context, error.message)
        })
      },
      showCoverPhotos: function (cover) {
        this.coverEditing = cover
        getPhotoList(this.type, cover.id, 1)
      },
      clickToPreviousPhoto: function () {
        this.photoPage = parseInt(this.photoPage)
        if (this.photoPage <= 1) {
          return
        }
        Core.Api.PHOTO.getPhotoList(this.type, this.coverEditing.id, this.photoPage - 1).then((data) => {
          this.photoList = data.photo_list
          this.photoPageAll = Math.ceil(data.count / 9)
          --this.photoPage
        }, (error) => {
          Core.Toast.error(this, error.message)
        })
      },
      clickToNextPhoto: function () {
        this.photoPage = parseInt(this.photoPage)
        if (this.photoPage >= this.photoPageAll) {
          return
        }
        Core.Api.PHOTO.getPhotoList(this.type, this.coverEditing.id, this.photoPage + 1).then((data) => {
          this.photoList = data.photo_list
          this.photoPageAll = Math.ceil(data.count / 9)
          ++this.photoPage
        }, (error) => {
          Core.Toast.error(this, error.message)
        })
      },
      photoUrl: function (url) {
        if (Core.Config.IS_DEBUG) {
          return 'http://localhost/static/res/' + url
        } else {
          return 'http://202.202.43.93/static/res/' + url
        }
      },
      toggleDeletePhoto: function (photo) {
        this.photoEditing = photo
        this.showDeletePhoto = true
      },
      deletePhoto: function () {
        Core.Api.PHOTO.deletePhoto(this.photoEditing.id).then((data) => {
          Core.Toast.success(this, '删除成功')
          this.showDeletePhoto = false
          getPhotoList(this.type, this.photoEditing.cover_id, this.photoPage)
          this.photoEditing = {}
        }, (error) => {
          this.showDeletePhoto = false
          Core.Toast.error(this, '删除失败: ' + error.message)
        })
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getCoverList (type, page) {
    Core.Api.PHOTO.getCoverList(type, page).then((data) => {
      context.coverList = data.cover_list
      context.coverPageAll = Math.ceil(data.count / 10)
      context.coverCount = data.count
    }, (error) => {
      Core.Toast.error(context, error.message)
    })
  }

  function getPhotoList (type, id, page) {
    Core.Api.PHOTO.getPhotoList(type, id, page).then((data) => {
      context.photoList = data.photo_list
      context.photoCount = data.count
      context.photoPageAll = Math.ceil(data.count / 9)
    }, (error) => {
      Core.Toast.error(context, error.message)
    })
  }

</script>
