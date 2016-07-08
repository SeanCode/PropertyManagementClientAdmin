<template>
  <div class="row">
    <div class='col-md-12'>
      <div class='box box-info' id='box-groups'>
        <div class='box-header with-border'>
          <h3 class='box-title'>机构管理</h3>
          <div class='box-tools pull-right'>
            <button class='btn btn-box-tool' @click='toggleAddInstitution()' title="添加机构">
              <i class='fa fa-plus-square'></i>
            </button>
            <button class='btn btn-box-tool' @click='refresh()' title="刷新">
              <i class='fa fa-refresh'></i>
            </button>
            <button class="btn btn-box-tool" data-widget="collapse" title="折叠/展开">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="box-body" style="display: block;">
          <v-client-table :data='institutionList'
                          :columns='columns'
                          :options='options'
                          class='institution-list-table'>
          </v-client-table>
        </div>
      </div>
      <modal title="修改机构信息" :show.sync="showEditModal" effect="fade" width="800">
        <div slot="modal-body" class="modal-body">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">名称</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">负责人</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.people">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">联系方式</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.contact">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">机构代码</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.code">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">描述</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.description">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">备注</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.remark">
              </div>
            </div>
          </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showEditModal = false'>取消</button>
          <button type="button" class="btn btn-success" @click='updateInstitution'>更新</button>
        </div>
      </modal>
      <modal title="警告" :show.sync="showDeleteModal" effect="fade">
        <div slot="modal-body" class="modal-body">确认删除?</div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showDeleteModal = false'>取消</button>
          <button type="button" class="btn label-danger" @click='delete'>删除</button>
        </div>
      </modal>
      <modal title="添加机构" :show.sync="showAddModal" effect="fade" width="800">
        <div slot="modal-body" class="modal-body">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">名称 *</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">负责人</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.people">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">联系方式</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.contact">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">机构代码</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.code">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">描述</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.description">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">备注</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="modelEditing.remark">
              </div>
            </div>
          </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showAddModal = false'>取消</button>
          <button type="button" class="btn btn-success" @click='addInstitution()'>添加</button>
        </div>
      </modal>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import Core from '../../../../core/core'
  import Modal from '../../../widgets/Modal.vue'

  export default {
    components: {
      'modal': Modal
    },
    data () {
      return {
        showEditModal: false,
        modelEditing: {},
        institutionList: [],
        showDeleteModal: false,
        showAddModal: false,
        columns: ['id', 'name', 'people', 'contact', 'code', 'description', 'remark'],
        options: {
          compileTemplates: true,
          highlightMatches: true,
          filterByColumn: true,
          filterable: ['name', 'people', 'contact', 'code', 'description', 'remark'],
          texts: {
            filter: 'Search:',
            noResults: '暂无匹配',
            count: '共 {count} 条记录'
          },
          headings: {
            id: '编号',
            name: '名称',
            people: '负责人',
            contact: '联系方式',
            code: '机构代码',
            description: '描述',
            remark: '备注',
            edit: '编辑',
            delete: '删除'
          },
          templates: {
            edit: '<a class="label label-primary" href="javascript:void(0);" @click="$parent.toggleEditModal({id})">编辑</a></i></div>',
            delete: '<a class="label label-danger" href="javascript:void(0);" @click="$parent.toggleDeleteModal({id})">删除</a></i></div>'
          }
        }
      }
    },
    ready () {
      initContext(this)
      getInstitutionList()
    },
    methods: {
      'delete': function () {
        this.showDeleteModal = false
        deleteInstitution(this.modelEditing.id)
      },
      'refresh': function () {
        getInstitutionList()
      },
      'toggleDeleteModal': function (id) {
        this.showDeleteModal = true
        this.modelEditing.id = id
      },
      'toggleEditModal': function (id) {
        getInstitutionEditing(id)
      },
      'updateInstitution': function () {
        updateInstitutionInfo(this.modelEditing.id, this.modelEditing.name, this.modelEditing.people, this.modelEditing.contact, this.modelEditing.description, this.modelEditing.remark, this.modelEditing.code)
      },
      'toggleAddInstitution': function () {
        this.modelEditing = {}
        this.showAddModal = true
      },
      'addInstitution': function () {
        addInstitution(this.modelEditing.name, this.modelEditing.people, this.modelEditing.contact, this.modelEditing.description, this.modelEditing.remark, this.modelEditing.code)
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getInstitutionList () {
    Core.Api.INSTITUTION.getInstitutionList().then(function (data) {
      context.institutionList = data.institution_list
    }, function (error) {
      Core.Log.e(error)
    })
  }

  function deleteInstitution (id) {
    Core.Api.INSTITUTION.deleteInstitution(id).then(function (data) {
      getInstitutionList()
    }, function (error) {
      Core.Log.e(error)
    })
  }

  function getInstitutionEditing (id) {
    Core.Api.INSTITUTION.getDetail(id).then(function (data) {
      context.modelEditing = data.institution
      context.showEditModal = true
    }, function (error) {
      Core.Toast.error(context, '获取机构信息失败: ' + error.message)
    })
  }

  function updateInstitutionInfo (id, name, people, contact, description, remark, code) {
    Core.Api.INSTITUTION.updateInstitutionInfo(id, name, people, contact, description, remark, code).then(function (data) {
      Core.Toast.success(context, '更新成功')
      context.showEditInstitution = false
      context.institution = data.institution
      getInstitutionList()
    }, function (error) {
      Core.Toast.error(context, '更新失败: ' + error.message)
    })
  }

  function addInstitution (name, people, contact, description, remark, code) {
    Core.Api.INSTITUTION.addInstitution(name, people, contact, description, remark, code).then(function (data) {
      Core.Toast.success(context, '添加成功')
      context.showAddModal = false
      getInstitutionList()
    }, function (error) {
      Core.Toast.error(context, '添加失败: ' + error.message)
    })
  }

</script>
