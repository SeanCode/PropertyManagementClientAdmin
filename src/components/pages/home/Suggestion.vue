<template>
  <content-header parent="门户管理" child="意见建议管理"></content-header>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">意见建议列表</h3>
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
//  import Core from '../../../core/core'
  import Modal from '../../widgets/Modal.vue'

  export default {
    data () {
      return {}
    },
    components: {
      'content-header': ContentHeader,
      'modal': Modal
    }
  }
</script>
