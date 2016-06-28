<template>
  <div class="row">
    <div class='col-md-12'>
      <div class='box box-info' id='box-groups'>
        <div class='box-header with-border'>
          <h3 class='box-title'>机构管理</h3>
          <div class='box-tools pull-right'>
            <button class='btn btn-box-tool' @click='refresh'>
              <i class='fa fa-refresh'></i>
            </button>
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="box-body" style="display: block;">
          <v-client-table :data='institutionList' :columns='columns' :options='options'
                          class='institution-list-table'></v-client-table>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import Core from '../../../../core/core'

  export default {
    data () {
      return {
        institutionList: [],
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
            code: '组织机构代码',
            description: '描述',
            remark: '备注',
            operate: '操作'
          },
          templates: {
            operate: '<a class="label label-danger" href="javascript:void(0);" @click="$parent.operate({id})">编辑</a></i></div>'
          }
        }
      }
    },
    ready () {
      initContext(this)
      getInstitutionList()
    },
    methods: {
      'operate': function (id) {
        if (window.confirm('确认删除?')) {
          deleteInstitution(id)
        }
      },
      'refresh': function () {
        getInstitutionList()
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

</script>
