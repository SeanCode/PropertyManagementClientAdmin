<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <Login class="hold-transition login-page">
    <div class="login-box">

      <div class="login-logo">
        <p>重邮物业后台管理系统</p>
      </div>
      <!-- /.login-logo -->

      <div class="login-box-body">
        <p class="login-box-msg">登陆</p>
        <!--<form onsubmit="Javascript:if (this.username.value==''||this.password.value=='')-->
        <!--{alert('账号,密码都要输入完全,^_^!');return false;}">-->
        <div class="form-group has-feedback">
          <input type="text" name="username" class="form-control" placeholder="用户名" v-model="name"/>
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" name="password" class="form-control" placeholder="密码" v-model="password"/>
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <!--<p th:if="${error} != null" class="text-red">用户名或者密码错误</p>-->
        <div class="row">
          <div class="col-xs-4 col-xs-offset-4">
            <button type="button" onclick="Javascript:history.back(-1);"
                    class="btn btn-default btn-block btn-flat">返回
            </button>
          </div>
          <!-- /.col -->
          <div class="col-xs-4 ">

            <button class="btn btn-success btn-block btn-flat" v-on:click="login">登陆</button>
          </div>
          <!-- /.col -->
        </div>
        <div class="row">
          <div class="col-xs-12" id="copyright">
              <span>Copyright &copy; 2016 重邮物业管理中心.<br/>All rights reserved.
            </span>

          </div>
          <!-- /.col -->
        </div>
        <!--</form>-->

      </div>
      <!-- /.login-box-body -->
    </div>
    <!-- /.login-box -->
  </Login>

</template>
<script>
  import loginService from '../services/login'
//  import Log from '../core/Log'

  module.exports = {
    methods: {
      login: function () {
        if (this.username === '' || this.password === '') {
          window.alert('账号,密码都要输入完全,^_^!')
          return false
        }
        loginService.login(this.name, this.password)
      }
    },

    data () {
      return {
        name: '',
        password: ''
      }
    }
  }
</script>
<style>
  body {
    background-color: white;
  }

  #copyright {
    text-align: center;
    margin: 20px auto 0;
    color: gray;
    font-size: 12px;
  }

  .login-logo p {
    font-family: "微软雅黑";
  }

  .login-box-body {
    box-shadow: gray 1px 1px 2px 1px;
    border-radius: 2px;
  }
</style>
