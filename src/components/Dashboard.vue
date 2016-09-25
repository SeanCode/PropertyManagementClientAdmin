<template>
  <!-- Content Header (Page header) -->
  <content-header parent="首页"></content-header>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-aqua"><i class="fa fa-tint"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">用水总量</span>
            <span class="info-box-number">{{water}}</span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
      </div><!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-red"><i class="fa fa-bolt"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">用电总量</span>
            <span class="info-box-number">{{ele}}</span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
      </div><!-- /.col -->

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-green"><i class="fa fa-fire"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">用气总量</span>
            <span class="info-box-number">{{gas}}</span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
      </div><!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-yellow"><i class="fa fa-users"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">用户总数</span>
            <span class="info-box-number">{{userAmount}}</span>
          </div><!-- /.info-box-content -->
        </div><!-- /.info-box -->
      </div><!-- /.col -->
    </div><!-- /.row -->

    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">数据走向</h3>
          </div><!-- /.box-header -->
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <p class="text-center">
                  <strong>2016年1月1日 - 2016年9月26日</strong>
                </p>
                <div class="chart">
                  <!-- Sales Chart Canvas -->
                  <line-chart :data="waterData" height="200"></line-chart>
                  <line-chart :data="eleData" height="200"></line-chart>
                </div><!-- /.chart-responsive -->
              </div><!-- /.col -->
              <!--<div class="col-md-4">-->
                <!--<p class="text-center">-->
                  <!--<strong>Goal Completion</strong>-->
                <!--</p>-->
                <!--<div class="progress-group">-->
                  <!--<span class="progress-text">Add Products to Cart</span>-->
                  <!--<span class="progress-number"><b>160</b>/200</span>-->
                  <!--<div class="progress sm">-->
                    <!--<div class="progress-bar progress-bar-aqua" style="width: 80%"></div>-->
                  <!--</div>-->
                <!--</div>&lt;!&ndash; /.progress-group &ndash;&gt;-->
                <!--<div class="progress-group">-->
                  <!--<span class="progress-text">Complete Purchase</span>-->
                  <!--<span class="progress-number"><b>310</b>/400</span>-->
                  <!--<div class="progress sm">-->
                    <!--<div class="progress-bar progress-bar-red" style="width: 80%"></div>-->
                  <!--</div>-->
                <!--</div>&lt;!&ndash; /.progress-group &ndash;&gt;-->
                <!--<div class="progress-group">-->
                  <!--<span class="progress-text">Visit Premium Page</span>-->
                  <!--<span class="progress-number"><b>480</b>/800</span>-->
                  <!--<div class="progress sm">-->
                    <!--<div class="progress-bar progress-bar-green" style="width: 80%"></div>-->
                  <!--</div>-->
                <!--</div>&lt;!&ndash; /.progress-group &ndash;&gt;-->
                <!--<div class="progress-group">-->
                  <!--<span class="progress-text">Send Inquiries</span>-->
                  <!--<span class="progress-number"><b>250</b>/500</span>-->
                  <!--<div class="progress sm">-->
                    <!--<div class="progress-bar progress-bar-yellow" style="width: 80%"></div>-->
                  <!--</div>-->
                <!--</div>&lt;!&ndash; /.progress-group &ndash;&gt;-->
              <!--</div>&lt;!&ndash; /.col &ndash;&gt;-->
            </div><!-- /.row -->
          </div><!-- ./box-body -->
          <div class="box-footer">
            <!--<div class="row">-->
              <!--<div class="col-sm-3 col-xs-6">-->
                <!--<div class="description-block border-right">-->
                  <!--<span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 17%</span>-->
                  <!--<h5 class="description-header">$35,210.43</h5>-->
                  <!--<span class="description-text">TOTAL REVENUE</span>-->
                <!--</div>&lt;!&ndash; /.description-block &ndash;&gt;-->
              <!--</div>&lt;!&ndash; /.col &ndash;&gt;-->
              <!--<div class="col-sm-3 col-xs-6">-->
                <!--<div class="description-block border-right">-->
                  <!--<span class="description-percentage text-yellow"><i class="fa fa-caret-left"></i> 0%</span>-->
                  <!--<h5 class="description-header">$10,390.90</h5>-->
                  <!--<span class="description-text">TOTAL COST</span>-->
                <!--</div>&lt;!&ndash; /.description-block &ndash;&gt;-->
              <!--</div>&lt;!&ndash; /.col &ndash;&gt;-->
              <!--<div class="col-sm-3 col-xs-6">-->
                <!--<div class="description-block border-right">-->
                  <!--<span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 20%</span>-->
                  <!--<h5 class="description-header">$24,813.53</h5>-->
                  <!--<span class="description-text">TOTAL PROFIT</span>-->
                <!--</div>&lt;!&ndash; /.description-block &ndash;&gt;-->
              <!--</div>&lt;!&ndash; /.col &ndash;&gt;-->
              <!--<div class="col-sm-3 col-xs-6">-->
                <!--<div class="description-block">-->
                  <!--<span class="description-percentage text-red"><i class="fa fa-caret-down"></i> 18%</span>-->
                  <!--<h5 class="description-header">1200</h5>-->
                  <!--<span class="description-text">GOAL COMPLETIONS</span>-->
                <!--</div>&lt;!&ndash; /.description-block &ndash;&gt;-->
              <!--</div>-->
            <!--</div>&lt;!&ndash; /.row &ndash;&gt;-->
          </div><!-- /.box-footer -->
        </div><!-- /.box -->
      </div><!-- /.col -->
    </div><!-- /.row -->
  </section>
</template>
<script>
  import ContentHeader from './widgets/admin/content-header.vue'
  import Core from '../core/core'
  import Line from './widgets/chart/Line.vue'

  export default {
    components: {
      'content-header': ContentHeader,
      'line-chart': Line
    },
    data () {
      return {
        water: 900,
        ele: 1000,
        gas: 0,
        userAmount: 0,
        waterData: {
          labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月'],
          datasets: [
            {
              label: '用水量',
              backgroundColor: '#00c0ef',
              data: [40, 39, 10, 40, 39, 80, 40, 50, 60]
            }
          ]
        },
        eleData: {
          labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月'],
          datasets: [
            {
              label: '用电量',
              backgroundColor: '#dd4b39',
              data: [40, 39, 80, 40, 39, 80, 40, 50, 60, 40, 40, 30]
            }
          ]
        }
      }
    },
    ready () {
      initContext(this)
      updateAdmin()
      getUserAmount()
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function updateAdmin () {
    var admin = Core.Data.getAdmin()

    Core.Api.ADMIN.getAdminInfo(admin.id).then(function (data) {
      Core.Data.setAdmin(data.admin)
    })
  }

  function getUserAmount () {
    Core.Api.USER.getUserAmount().then(function (data) {
      context.userAmount = data.user_amount
    })
  }
</script>
