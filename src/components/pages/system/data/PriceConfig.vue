<template>
  <div class="box box-info" id="box-time">
    <div class="box-header with-border">
      <h3 class="box-title">默认单价</h3>
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
        <div v-show="isWaterInputShowing" class="input-group input-group-sm">
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
        <div v-show="isEleInputShowing" class="input-group input-group-sm">
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
        <div v-show="isGasInputShowing" class="input-group input-group-sm">
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
  .single-row {
    margin-bottom: 8px;
  }

  .input-group {
    margin-top: 8px;
  }

  .btn-right {
    float: right;
    padding: 0 5px;
  }

  .badge {
    float: right;
  }
</style>
<script>
  import Core from '../../../../core/core'

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
      getPriceConfig(this)
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
        updateDefaultPrice(this)
      },
      saveEle: function () {
        this.isEleInputShowing = false
        updateDefaultPrice(this)
      },
      saveGas: function () {
        this.isGasInputShowing = false
        updateDefaultPrice(this)
      },
      refresh: function () {
        getPriceConfig(this)
      }
    }
  }

  function getPriceConfig (context) {
    Core.Api.CONFIG.getPrice().then(function (data) {
      context.price = data.config.price
    })
  }

  function updateDefaultPrice (context) {
    Core.Api.CONFIG.updateDefaultPrice(context.price.water, context.price.ele, context.price.gas).then(function (data) {
      context.price = data.config.price
    })
  }
</script>
