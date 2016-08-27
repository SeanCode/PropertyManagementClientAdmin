<style>
  .logo {
    position: fixed;
  }
</style>
<template>
  <header class="main-header">
    <!-- Logo -->
    <a v-link="{ path: '/dashboard/index' }" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">物管</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">重邮物业后台管理系统</span>
    </a>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Tasks: style can be found in dropdown.less -->
          <li class="dropdown tasks-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger" v-show="recordPendingCount != 0">{{recordPendingCount}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">你有{{recordPendingCount}}条待审核记录</li>
              <li class="footer">
                <a v-link="{ path: '/dashboard/sdq/check/pending'}">查看所有</a>
              </li>
            </ul>
          </li>
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="hidden-xs">{{admin.name}}</span>
              <strong class="caret"></strong>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="/static/dashboard/img/user2-160x160.jpg" class="img-circle" alt="User Image"/>
                <p>
                  {{admin.name}}
                  <small>{{admin.username}}</small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat" @click="toggleShowUpdatePassword()">修改密码</a>
                </div>
                <div class="pull-right">
                  <a v-link="{ path: '/logout' }" class="btn btn-default btn-flat">退出</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <modal title="修改密码" :show.sync="showUpdatePassword" effect="fade">
      <div slot="modal-body" class="modal-body">
        <div class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">旧密码</label>
            <div class="col-sm-10">
              <input class="form-control" v-model="adminEditing.password">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">新密码</label>
            <div class="col-sm-10">
              <input class="form-control" v-model="adminEditing.new_password">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">确认密码</label>
            <div class="col-sm-10">
              <input class="form-control" v-model="adminEditing.ensure_password">
            </div>
          </div>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click='showUpdatePassword = false'>取消</button>
        <button type="button" class="btn label-danger" @click="updatePassword()">确定</button>
      </div>
    </modal>
  </header>
</template>
<script>
  import Core from '../../core/core'
  import Modal from '../widgets/Modal.vue'

  module.exports = {
    components: {
      'modal': Modal
    },
    data () {
      return {
        admin: {},
        adminEditing: {},
        recordPendingCount: 0,
        showUpdatePassword: false
      }
    },
    ready () {
      initContext(this)
      this.admin = Core.Data.getAdmin()
      getPendingCount()
    },
    events: {
      'login-msg': function () {
        this.admin = Core.Data.getAdmin()
      },
      'approve-pended': function () {
        getPendingCount()
      }
    },
    methods: {
      toggleShowUpdatePassword: function () {
        this.showUpdatePassword = true
      },
      updatePassword: function () {
        if (this.adminEditing.new_password !== this.adminEditing.ensure_password) {
          Core.Toast.error(this, '密码不一致!')
          return
        }
        updatePassword(this.admin.name, this.adminEditing.password, this.adminEditing.new_password)
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getPendingCount () {
    Core.Api.RECORD.getPendingCount().then(function (data) {
      context.recordPendingCount = data.pending_count
    }, function (error) {
      Core.Toast.error(context, '获取待审核记录失败: ' + error.message)
    })
  }

  function updatePassword (name, oldPassword, password) {
    Core.Api.ADMIN.updateAdminPassword(name, password, oldPassword).then(function (data) {
      context.showUpdatePassword = false
      Core.Data.clear()
      Core.Toast.success(context, '密码修改成功')
      setTimeout(function () {
        window.router.go('/dashboard/login')
      }, 2000)
    }, function (error) {
      Core.Toast.error(context, '密码修改失败: ' + error.message)
    })
  }
</script>
