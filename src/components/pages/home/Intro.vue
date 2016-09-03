<template>
  <!-- Content Header (Page header) -->
  <content-header parent="门户管理" child="机构简介管理"></content-header>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">机构简介列表</h3>
            <div class="box-tools">
              <button class="btn btn-box-tool" data-widget="collapse" title="折叠/展开">
                <i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover">
              <tr>
                <th>机构</th>
                <th>内容</th>
                <th>编辑</th>
              </tr>
              <tr v-for="intro in introList">
                <td>{{intro.name}}</td>
                <td><div class="intro_preview">{{{intro.content}}}</div></td>
                <td><a href="javascript:void(0)" class="label label-primary" @click="toggleEditIntro(intro)">编辑</a></td>
              </tr>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
    <modal title="编辑" :show.sync="showIntroEdit" effect="fade" large=true>
      <div slot="modal-body" class="modal-body">
        <div class="intro_textarea_wrapper">
          <textarea id="intro_textarea" class="intro_textarea"></textarea>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click='showIntroEdit = false'>取消</button>
        <button type="button" class="btn label-primary" @click="updateIntro()">更新</button>
      </div>
    </modal>
  </section>
</template>
<style>
  .intro_textarea {
    width: 100%;
    height: 400px;
    border: 1px solid #dddddd
  }

  .intro_preview {
    max-height: 100px;
    overflow: hidden;
  }
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
        introList: [],
        introEditing: {},
        showIntroEdit: false
      }
    },
    ready () {
      this.getIntroList()
    },
    methods: {
      getIntroList: function () {
        Core.Api.INTRODUCTION.getIntroList().then((data) => {
          this.introList = data.intro_list
        }, (error) => {
          Core.Toast.error(this, '获取简介列表失败: ' + error.message)
        })
      },
      toggleEditIntro: function (intro) {
        this.introEditing = intro
        window.$('.intro_textarea').remove()
        window.$('.intro_textarea_wrapper').html('<textarea id="intro_textarea" class="intro_textarea"></textarea>')
        window.$('.intro_textarea').wysihtml5({
          toolbar: {
            'fa': true,
            'link': false,
            'image': false
          }
        })
        window.$('#intro_textarea').html(intro.content)
        this.showIntroEdit = true
      },
      updateIntro: function () {
        Core.Api.INTRODUCTION.updateIntroduction(this.introEditing.id, window.$('.intro_textarea').val()).then((data) => {
          Core.Toast.success(this, '更新成功')
          this.introList = data.intro_list
          this.showIntroEdit = false
          window.$('#intro_textarea').html()
        }, (error) => {
          Core.Toast.error(this, '更新简介失败: ' + error.message)
          this.showIntroEdit = false
        })
      }
    }
  }
</script>
