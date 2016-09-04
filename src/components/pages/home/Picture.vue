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
    overflow: hidden;
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

  .btn-upload-cover {
    padding: 0;
  }

  .btn-upload-cover span {
    color: #fff !important;
    background-color: transparent !important;;
  }

  .btn-upload span {
    color: #97a0b3 !important;
    background-color: transparent !important;;
  }

  .modal-cover img {
    width: 570px;
    max-height: 380px;
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
            <div class="box-tools pull-right">
              <select v-model="type">
                <option value="{{type.value}}" v-for="type in typeList">{{type.name}}</option>
              </select>
              <button class="btn btn-box-tool" @click="showAddCover = true">
                <i class="fa fa-plus"></i>
              </button>
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
          <div class="box-header with-border">
            <h3 class="box-title">{{coverEditing.id ? coverEditing.name : '请选择相册'}}({{photoCount}})</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" v-show="coverEditing.id" title="修改名称" @click="showEditCover = true">
                <i class="fa fa-pencil"></i>
              </button>
              <button class="btn btn-box-tool" v-show="coverEditing.id" title="查看封面" @click="showUpdateCover = true">
                <i class="fa fa-eye"></i>
              </button>
              <button class="btn btn-box-tool btn-upload" v-show="coverEditing.id" title="添加照片">
                <file-upload icon="fa fa-plus" label="" :url="uploadUrl()" :files.sync="files" :filters="filters" :events='cbEvents' :request-options="reqopts"></file-upload>
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
      <modal title="确认" :show.sync="showUploadPhoto" effect="fade">
        <div slot="modal-body" class="modal-body">确认上传该照片?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='toggleUploadImg()'>取消</button>
          <button type="button" class="btn label-info" @click="uploadImg()">上传</button>
        </div>
      </modal>
      <modal title="修改相册名称" :show.sync="showEditCover" effect="fade">
        <div slot="modal-body" class="modal-body">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">名称</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="coverEditing.name">
              </div>
            </div>
          </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showEditCover = false'>取消</button>
          <button type="button" class="btn label-danger" @click="toggleDeleteCover()">删除</button>
          <button type="button" class="btn label-info" @click="updateCover()">修改</button>
        </div>
      </modal>
      <modal title="警告" :show.sync="showDeleteCover" effect="fade">
        <div slot="modal-body" class="modal-body">确认删除该 <strong>相册</strong> ??? 请谨慎操作!!!</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showDeleteCover = false'>取消</button>
          <button type="button" class="btn label-danger" @click="deleteCover()">删除</button>
        </div>
      </modal>
      <modal title="查看相册封面" class="modal-cover" :show.sync="showUpdateCover" effect="fade">
        <div slot="modal-body" class="modal-body">
          <img :src='photoUrl(coverEditing.cover_url)' v-if="coverEditing.cover_url"/>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showUpdateCover = false'>取消</button>
          <button type="button" class="btn label-info btn-upload-cover">
            <file-upload icon="" label="更换封面" :url="uploadUrl()" :files.sync="files" :filters="filters" :events='coverCbEvents' :request-options="reqopts"></file-upload>
          </button>
        </div>
      </modal>
      <modal title="添加相册" class="modal-cover" :show.sync="showAddCover" effect="fade">
        <div slot="modal-body" class="modal-body">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">名称</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="coverAdd.name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">类型</label>
              <div class="col-sm-10">
                <select class="form-control" v-model="coverAdd.type">
                  <option value="1" selected>领导关怀</option>
                  <option value="2">荣誉奖励</option>
                  <option value="1">会议纪实</option>
                  <option value="1">物业动态</option>
                  <option value="1">校园绿化</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showAddCover = false'>取消</button>
          <button type="button" class="btn label-info btn-upload-cover">
            <file-upload icon="" label="选择封面" :url="uploadUrl()" :files.sync="files" :filters="filters" :events='addCoverCbEvents' :request-options="reqopts"></file-upload>
          </button>
        </div>
      </modal>
    </div>
  </section>
</template>
<script>
  import ContentHeader from '../../widgets/admin/content-header.vue'
  import Core from '../../../core/core'
  import Modal from '../../widgets/Modal.vue'
  import VueFileUpload from 'vue-file-upload'

  export default {
    components: {
      'content-header': ContentHeader,
      'modal': Modal,
      'file-upload': VueFileUpload
    },
    data () {
      return {
        typeList: Core.Config.PHOTO_TYPE_LIST,
        type: 0,
        coverList: [],
        coverCount: 0,
        coverPage: 0,
        coverPageAll: 0,
        photoPage: 0,
        photoPageAll: 0,
        photoList: [],
        photoCount: 0,
        photoEditing: {},
        coverEditing: {},
        coverAdd: {},
        showDeletePhoto: false,
        showDeleteCover: false,
        showEditCover: false, // 修改相册名称
        showUpdateCover: false, // 查看相册封面
        showAddCover: false,
        showUploadPhoto: false,
        files: [],
        filters: [{
          name: 'imageFilter',
          fn (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1
          }}
        ],
        cbEvents: {
          onCompleteUpload: (file, response, status, header) => {
            Core.Progress.hide(this)
          },
          onProgressUpload: (file, progress) => {
            Core.Progress.update(this, progress)
          },
          onSuccessUpload: (file, response, status, headers) => {
            if (response && response.data && response.code === 0) {
              this.uploadPhoto(response.data.img)
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
        reqopts: {
          responseType: 'json',
          withCredentials: false,
          headers: {
            Authorization: 'Basic ' + Core.Data.getToken()
          }
        },
        coverCbEvents: {
          onCompleteUpload: (file, response, status, header) => {
            Core.Progress.hide(this)
          },
          onProgressUpload: (file, progress) => {
            Core.Progress.update(this, progress)
          },
          onSuccessUpload: (file, response, status, headers) => {
            if (response && response.data && response.code === 0) {
              this.coverEditing.cover_url = 'img/' + response.data.img
              this.updateCover()
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
            Core.Toast.info(this, '上传中, 请稍后...')
            this.showUpdateCover = false
            Core.Progress.show(this)
            this.$broadcast('DO_POST_FILE')
          },
          onAddFileFail: () => {
            Core.Toast.error(this, '请选择正确类型的文件')
          }
        },
        addCoverCbEvents: {
          onCompleteUpload: (file, response, status, header) => {
            Core.Progress.hide(this)
          },
          onProgressUpload: (file, progress) => {
            Core.Progress.update(this, progress)
          },
          onSuccessUpload: (file, response, status, headers) => {
            if (response && response.data && response.code === 0) {
              this.coverAdd.url = 'img/' + response.data.img
              this.addCover()
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
            Core.Toast.info(this, '上传中, 请稍后...')
            this.showAddCover = false
            Core.Progress.show(this)
            this.$broadcast('DO_POST_FILE')
          },
          onAddFileFail: () => {
            Core.Toast.error(this, '请选择正确类型的文件')
          }
        }
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
        this.photoPage = 1
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
      toggleDeleteCover: function () {
        this.showEditCover = false
        this.showDeleteCover = true
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
      },
      uploadImg: function () {
        this.showUploadPhoto = false
        // 这里保证一次只上传一张图片
        var length = this.files.length
        if (length === 0) {
          return
        }
        var index = length - 1
        this.files[index].upload()
//        this.$broadcast('DO_POST_FILE') 这样可能把前面已经取消上传的文件也上传上去
        Core.Toast.info(this, '上传中, 请稍后...')
        Core.Progress.show(this)
      },
      uploadUrl: function () {
        var endPoint = Core.Config.IS_DEBUG ? Core.Const.NET.END_POINT_DEBUG : Core.Const.NET.END_POINT_RELEASE
        return endPoint + Core.Const.NET.API_PATH + Core.Const.NET.API.UPLOAD_IMG
      },
      toggleUploadImg: function () {
        if (!this.showUploadPhoto) {
          this.showUploadPhoto = true
        } else {
          this.showUploadPhoto = false
          this.files = []
        }
      },
      uploadPhoto: function (imgName) {
        Core.Api.PHOTO.addPhoto(this.coverEditing.id, 'img/' + imgName).then((data) => {
          Core.Toast.success(this, '上传成功')
          Core.Progress.hide(this)
          getPhotoList(this.type, this.coverEditing.id, 1)
        }, (error) => {
          Core.Toast.error(this, '上传失败: ' + error.message)
        })
      },
      updateCover: function () {
        Core.Api.PHOTO.updateCover(this.coverEditing.id, this.coverEditing.name, this.coverEditing.cover_url).then(data => {
          Core.Toast.success(this, '相册更新成功, 刷新中...')
          this.showEditCover = false
          Core.Api.PHOTO.getPhotoList(this.type, this.coverEditing.id, 1).then((data) => {
            this.coverEditing = data.cover
            Core.Toast.success(this, '相册已刷新')
          }, () => {
            Core.Toast.error(this, '相册刷新失败, 请手动刷新')
          })
          Core.Api.PHOTO.getCoverList(this.type, this.coverPage).then((data) => {
            this.coverList = data.cover_list
            Core.Toast.success(this, '相册列表已刷新')
          }, () => {
            Core.Toast.error(this, '相册列表刷新失败, 请手动刷新')
          })
        }, (error) => {
          this.showEditCover = false
          Core.Toast.error(this, '相册更新失败 ' + error.message)
        })
      },
      addCover: function () {
        Core.Api.PHOTO.addCover(this.coverAdd.name, this.coverAdd.url, this.coverAdd.type).then((data) => {
          this.showAddCover = false
          Core.Toast.success(this, '相册已添加, 刷新中...')
          this.coverAdd = {}
          Core.Api.PHOTO.getCoverList(this.type, this.coverPage).then((data) => {
            this.coverList = data.cover_list
            Core.Toast.success(this, '相册列表已刷新')
          }, () => {
            Core.Toast.error(this, '相册列表刷新失败, 请手动刷新')
          })
        }, (error) => {
          this.showAddCover = false
          Core.Toast.error(this, '相册添加失败 ' + error.message)
        })
      },
      deleteCover: function () {
        Core.Api.PHOTO.deleteCover(this.coverEditing.id).then((data) => {
          this.showDeleteCover = false
          Core.Toast.success(this, '相册已删除, 刷新中...')
          this.coverEditing = {}
          this.photoList = []
          Core.Api.PHOTO.getCoverList(this.type, this.coverPage).then((data) => {
            this.coverList = data.cover_list
            Core.Toast.success(this, '相册列表已刷新')
          }, () => {
            Core.Toast.error(this, '相册列表刷新失败, 请手动刷新')
          })
        }, (error) => {
          this.showDeleteCover = false
          Core.Toast.error(this, '相册删除失败 ' + error.message)
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
      if (data.count === 0) {
        context.coverPage = 0
      } else {
        if (page === 1) {
          context.coverPage = 1
        }
      }
    }, (error) => {
      Core.Toast.error(context, error.message)
    })
  }

  function getPhotoList (type, id, page) {
    Core.Api.PHOTO.getPhotoList(type, id, page).then((data) => {
      context.photoList = data.photo_list
      context.photoCount = data.count
      context.photoPageAll = Math.ceil(data.count / 9)
      if (data.count === 0) {
        context.photoPage = 0
      } else {
        if (page === 1) {
          context.photoPage = 1
        }
      }
    }, (error) => {
      Core.Toast.error(context, error.message)
    })
  }

</script>
