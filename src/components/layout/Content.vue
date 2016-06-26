<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        {{title}}
      </h1>
      <ol class="breadcrumb">
        <li><a v-link="{ path: '/'}"><i class="fa fa-home"></i> 系统</a></li>
        <li v-bind:class="{ 'active': !child}">{{parent.name}}</li>
        <li v-show="child" v-bind:class="{ 'active': child }">{{child ? child.name : ''}}</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <router-view></router-view>

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>
<script>
  export default {
    events: {
      'path-msg': function (path) {
        this.title = path.child ? path.child.name : path.parent.name
        this.child = path.child
        this.parent = path.parent
      }
    },
    data () {
      return {
        title: '首页',
        parent: {
          name: '首页',
          link: '/dashboard/index',
          icon: 'fa-home'
        },
        child: {}
      }
    }
  }
</script>
