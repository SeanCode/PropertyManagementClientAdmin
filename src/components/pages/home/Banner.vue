<template>
  <!-- Content Header (Page header) -->
  <content-header parent="门户管理" child="轮播图管理"></content-header>
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-info">
          <div class="box-header ">
            <h3 class="box-title">轮播图列表</h3>
          </div>
          <div class="box-body table-responsive no-padding banner-table">
            <table class="table table-hover">
              <tr>
                <th>序号</th>
                <th>图片</th>
                <th>操作</th>
              </tr>
              <tr v-for="banner in bannerList">
                <td>{{$index + 1}}</td>
                <td><img :src="photoUrl(banner.data)"/></td>
                <td><a href="javascript:void(0)" class="label label-primary"><file-upload @click="setBanner(banner)" icon="" label="更新" :url="uploadUrl()" :files.sync="files" :filters="filters" :events='cbEvents' :request-options="reqopts"></file-upload></a></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <modal title="确认" :show.sync="showUpdateBanner" effect="fade">
        <div slot="modal-body" class="modal-body">确认上传?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showUpdateBanner = false'>取消</button>
          <button type="button" class="btn label-info" @click="uploadBanner()">上传</button>
        </div>
      </modal>
    </div>
  </section>
</template>
<style>
  .banner-table .fileupload-button {
    background-color: transparent !important;
  }

  .banner-table tbody > tr > td {
    vertical-align: middle;
  }

  .banner-table img {
    max-width: 684px;
  }
</style>
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
        bannerList: [],
        files: [],
        showUpdateBanner: false,
        bannerEditing: {},
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
              this.updateBanner('img/' + response.data.img)
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
            this.toggleUploadBanner()
          }
        },
        reqopts: {
          responseType: 'json', withCredentials: false, headers: {Authorization: 'Basic ' + Core.Data.getToken()}
        }
      }
    },
    ready () {
      this.getBannerList()
    },
    methods: {
      getBannerList: function () {
        Core.Api.CONFIG.getBannerList().then((data) => {
          this.bannerList = data.banner_list
        }, (error) => {
          Core.Toast.error(this, '获取轮播列表失败 ' + error.message)
        })
      },
      setBanner: function (banner) {
        this.bannerEditing = banner
      },
      photoUrl: function (url) {
        if (Core.Config.IS_DEBUG) {
          return 'http://localhost/static/res/' + url
        } else {
          return 'http://202.202.43.93/static/res/' + url
        }
      },
      uploadUrl: function () {
        var endPoint = Core.Config.IS_DEBUG ? Core.Const.NET.END_POINT_DEBUG : Core.Const.NET.END_POINT_RELEASE
        return endPoint + Core.Const.NET.API_PATH + Core.Const.NET.API.UPLOAD_IMG
      },
      toggleUploadBanner: function () {
        this.showUpdateBanner = true
      },
      uploadBanner: function () {
        this.showUpdateBanner = false
        this.$broadcast('DO_POST_FILE')
        Core.Toast.info(this, '上传中, 请稍后...')
        Core.Progress.show(this)
      },
      updateBanner: function (url) {
        Core.Api.CONFIG.updateBanner(this.bannerEditing.id, url).then((data) => {
          this.bannerList = data.banner_list
          Core.Toast.success(this, 'banner更新成功')
        }, (error) => {
          Core.Toast.error(this, 'banner替换失败: ' + error.message)
        })
      }
    }
  }
</script>
