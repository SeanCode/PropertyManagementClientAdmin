<template>
  <!-- Content Header (Page header) -->
  <content-header parent="统计" child="机构统计"></content-header>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-3">
        <div class="box box-solid">
          <div class="box-header">
            <h3 class="box-title">机构</h3>
          </div>
          <div class="box-body" style="display: block; padding: 0;">
            <v-client-table :data='institutionList' :columns='tableSetting.columns' :options='tableSetting.options'
                            class='institution-list-table'></v-client-table>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="box box-info">
          <div class="box-header with-border">
            <h4 class="box-title">用水</h4>
          </div>
          <div class="box-body">

          </div>
        </div>
        <div class="box box-danger">
          <div class="box-header with-border">
            <h4 class="box-title">用电</h4>
          </div>
          <div class="box-body">

          </div>
        </div>
        <div class="box box-success">
          <div class="box-header with-border">
            <h4 class="box-title">用气</h4>
          </div>
          <div class="box-body">

          </div>
        </div>
        <div class="box box-warning">
          <div class="box-header with-border">
            <h4 class="box-title">费用比例</h4>
          </div>
          <div class="box-body">

          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
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
        institutionList: [],
        tableSetting: {
          columns: ['id', 'name'],
          options: {
            highlightMatches: true,
            filterByColumn: true,
            filterable: ['name'],
            texts: {
              filter: 'Search:',
              noResults: '暂无匹配',
              count: '共 {count} 条记录'
            },
            onRowClick: function (row) {
              onInstitutionRowClick(row)
            },
            headings: {
              id: '编号',
              name: '名称'
            }
          }
        }
      }
    },
    ready () {
      initContext(this)
      getInstitutionList()
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function onInstitutionRowClick (row) {
    Core.Toast.error(context, '暂无统计数据')
  }

  function getInstitutionList () {
    Core.Api.INSTITUTION.getInstitutionList().then(function (data) {
      context.institutionList = data.institution_list
    }, function (error) {
      Core.Log.e(error)
    })
  }
</script>
