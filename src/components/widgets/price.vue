<template>
  <div class="box box-info" id="box-time">
    <div class="box-header with-border">
      <h3 class="box-title">本月单价</h3>
      <div class="box-tools pull-right">
        <button class="btn btn-box-tool" @click="refresh()">
          <i class="fa fa-refresh"></i>
        </button>
        <button class="btn btn-box-tool" data-widget="collapse">
          <i class="fa fa-minus"></i>
        </button>
      </div>
    </div>
    <div class="box-body" style="display: block;">
      <div class="single-row">
        <span class="label label-info">水</span>
        <button class="btn btn-right btn-box-tool" @click="showWaterInput()">
          <i class="fa fa-pencil"></i>
        </button>
        <span class="badge bg-red">{{price.water}}元</span>
        <div v-show="isWaterInputShowing" class="input-group-top input-group-sm">
          <input type="text" v-model="price.water" class="form-control">
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-info btn-flat" @click="saveWater()">保存</button>
                    </span>
        </div>
      </div>
      <div class="single-row">
        <span class="label label-info">电</span>
        <button class="btn btn-right btn-box-tool" @click="showEleInput()">
          <i class="fa fa-pencil"></i>
        </button>
        <span class="badge bg-red">{{price.ele}}元</span>
        <div v-show="isEleInputShowing" class="input-group-top input-group-sm">
          <input type="text" v-model="price.ele" class="form-control">
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-info btn-flat" @click="saveEle()">保存</button>
                    </span>
        </div>
      </div>
      <div class="single-row">
        <span class="label label-info">气</span>
        <button class="btn btn-right btn-box-tool" @click="showGasInput()">
          <i class="fa fa-pencil"></i>
        </button>
        <span class="badge bg-red">{{price.gas}}元</span>
        <div v-show="isGasInputShowing" class="input-group-top input-group-sm">
          <input type="text" v-model="price.gas" class="form-control">
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-info btn-flat" @click="saveGas()">保存</button>
                    </span>

        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import Core from '../../core/core'

  export default {
    data () {
      return {
        isWaterInputShowing: false,
        isEleInputShowing: false,
        isGasInputShowing: false,
        price: {
          water: 0.00,
          ele: 0.00,
          gas: 0.00
        }
      }
    },
    ready () {
      initContext(this)
      getPriceConfig()
    },
    methods: {
      showWaterInput: function () {
        this.isWaterInputShowing = !this.isWaterInputShowing
      },
      showEleInput: function () {
        this.isEleInputShowing = !this.isEleInputShowing
      },
      showGasInput: function () {
        this.isGasInputShowing = !this.isGasInputShowing
      },
      saveWater: function () {
        this.isWaterInputShowing = false
        updatePrice()
      },
      saveEle: function () {
        this.isEleInputShowing = false
        updatePrice()
      },
      saveGas: function () {
        this.isGasInputShowing = false
        updatePrice()
      },
      refresh: function () {
        getPriceConfig()
      }
    }
  }

  var context

  function initContext (c) {
    context = c
  }

  function getPriceConfig () {
    var date = new Date()
    Core.Api.CONFIG.getPrice(date.getFullYear(), date.getMonth() + 1).then(function (data) {
      context.price = data.config.price
    }, function (error) {
      Core.Toast.error(context, '获取价格失败: ' + error.message)
    })
  }

  function updatePrice () {
    var date = new Date()
    Core.Api.CONFIG.saveSpecificPrice(date.getFullYear(), date.getMonth() + 1, context.price.water, context.price.ele, context.price.gas).then(function (data) {
      context.price = data.config.price
    }, function (error) {
      Core.Log.e(error)
      getPriceConfig(context)
    })
  }

</script>
