<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        首页
      </h1>
      <ol class="breadcrumb">
        <li><a v-link="{ path: '/'}"><i class="fa fa-home"></i> 系统</a></li>
        <li class="active">首页</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <router-view class="view" keep-alive transition transition-mode="out-in"></router-view>

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
  module.exports = {
    name: 'Content',
    props: {
      title: String
    }
  }
</script>
