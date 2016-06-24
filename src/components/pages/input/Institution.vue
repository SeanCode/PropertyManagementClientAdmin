<template>
  <div class="row">
    <side></side>
    <div class="col-md-9">
      <div class="box box-solid box-info">
        <div class="box-header with-border">

          <h3 class="box-title">地址信息</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" style="display: block;">


          <div class="table-responsive">
            <table class="table no-margin ">
              <tr>
                <th>地址名</th>
                <th>编号</th>
                <th>完整地址信息</th>
                <th>是否是公司</th>
                <th>物管费(元)</th>
                <th>备注</th>
              </tr>
              <tr id="lc1">
                <td>千喜鹤</td>
                <td>wjz01yly</td>
                <td>崇文路2号-34单元</td>
                <td>是</td>
                <td>700</td>
                <td>收费不定式</td>
              </tr>
            </table>
          </div>
          <!-- table-->


        </div>
        <!--  boxbody -->

      </div>
      <!-- boxinfo -->

      <div class="box box-solid box-info">
        <div class="box-header with-border">
          <h3 class="box-title">主表信息</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" style="display: block;">
          <div class="table-responsive">
            <table class="table ">
              <thead>
              <tr>
                <th>表名称</th>
                <th>表编号</th>
                <th>表类型</th>
                <th>本月起度</th>
                <th>本月止度</th>
                <th>单价</th>
                <th>用度</th>
                <th>费用</th>
              </tr>
              </thead>
              <tbody>

              <tr class="bg-red">
                <td>水表1(错误)</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="bg-yellow">
                <td>水表1(警告)</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="bg-green">
                <td>水表1</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="">
                <td>水表1</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>


              </tbody>
            </table>
          </div>
          <!-- /.table-responsive -->
        </div>
        <!-- /.box-body -->
        <div class="box-footer clearfix" style="display: block;"></div>
        <!-- /.box-footer -->
      </div>
      <!-- 主表信息 -->
      <div class="box box-solid box-info">
        <div class="box-header with-border">
          <h3 class="box-title">检查表信息</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" style="display: block;">
          <div class="table-responsive ">
            <table class="table no-margin">
              <thead>
              <tr>
                <th>表名称</th>
                <th>表编号</th>
                <th>表类型</th>
                <th>本月起度</th>
                <th>本月止度</th>
                <th>单价</th>
                <th>用度</th>
                <th>费用</th>
              </tr>
              </thead>
              <tbody>

              <tr class="bg-red">
                <td>水表1(错误)</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="bg-yellow">
                <td>水表1(警告)</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>
              <tr class="bg-green">
                <td>水表1</td>
                <td>sbwj01yly03jf</td>
                <td>水表</td>
                <td>555</td>
                <td><input type="number" id="test"
                           class="popover-show text-black" data-container="body"
                           data-toggle="popover" data-placement="bottom"
                           data-content="上月用度：100度;    去年同月用度为：150度;去年平均用度：230"
                           data-trigger="focous"> <a href="#"
                                                     class="btn btn-sm btn-info">提交</a></td>
                <td>0.5</td>
                <td>223</td>
                <td>234</td>
              </tr>


              </tbody>
            </table>
          </div>
          <!-- /.table-responsive -->
        </div>
        <!-- /.box-body -->
        <div class="box-footer clearfix" style="display: block;"></div>
        <!-- /.box-footer -->
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import Side from './institution/side.vue'

  export default {
    components: {
      'side': Side
    }
  }
</script>
