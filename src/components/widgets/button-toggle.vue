<template>
  <div class="btn btn-toggle btn-toggle-gritcode {{btnSize}} btn-default {{active ? 'active' : ''}}"
       :disabled="disabled">
    <button class="btn btn-block {{btnVariant}} {{btnSize}}" v-on:click.prevent="toggle(false)">{{text.on}}</button>
    <span class="handle" v-on:click.prevent="toggle()"></span>
    <button class="btn btn-block btn-default {{btnSize}}" v-on:click.prevent="toggle(true)">{{text.off}}</button>
  </div>
</template>
<style>
  .btn-toggle-gritcode {
    position: relative;
    overflow: hidden;
    padding: 0 !important;
    border: 0;
  }

  .btn-toggle-gritcode .btn {
    margin: 0;
    display: inline-block;
    outline: none;
    -webkit-transition: -webkit-transform .35s;
    transition: -webkit-transform .35s;
    transition: transform .35s;
    transition: transform .35s, -webkit-transform .35s;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    -ms-transform: translate(-100%, 0);
    padding-left: 1rem;
    padding-right: 0.8rem;
  }

  .btn-toggle-gritcode .btn:active, .btn-toggle-gritcode .btn:hover, .btn-toggle-gritcode .btn:visited, .btn-toggle-gritcode .btn:focus {
    outline: none;
  }

  .btn-toggle-gritcode .btn.btn-sm {
    padding-left: 0.75rem;
    padding-right: 0.55rem;
  }

  .btn-toggle-gritcode .btn.btn-lg {
    padding-left: 1.25rem;
    padding-right: 1.05rem;
  }

  .btn-toggle-gritcode.active .btn {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -ms-transform: translate(0, 0);
    padding-left: 0.8rem;
    padding-right: 1rem;
  }

  .btn-toggle-gritcode.active .btn.btn-sm {
    padding-left: 0.55rem;
    padding-right: 0.75rem;
  }

  .btn-toggle-gritcode.active .btn.btn-lg {
    padding-left: 1.05rem;
    padding-right: 1.25rem;
  }

  .btn-toggle-gritcode.active .handle {
    left: calc(100% - 12px);
  }

  .btn-toggle-gritcode .handle {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #fff;
    position: absolute;
    margin: 1px;
    height: calc(100% - 2px);
    padding: 0;
    width: 10px;
    left: 0%;
    top: 0;
    z-index: 2;
    -webkit-transition: left .35s;
    transition: left .35s;
  }
</style>
<script>
//  const ANIMATION = 350 // in ms
  export default {
    name: 'button-toggle',
    replace: true,
    computed: {
      btnVariant () {
        return !this.variant || this.variant === 'default' ? 'btn-primary' : 'btn-' + this.variant
      },
      btnSize () {
        return !this.size || this.size === 'default' ? '' : 'btn-' + this.size
      }
    },
    data () {
      return {
        active: true
      }
    },
    props: {
      model: {
        type: Boolean,
        twoWay: true
      },
      disabled: {
        type: Boolean,
        twoWay: true
      },
      size: {
        type: String,
        default: 'md'
      },
      variant: {
        type: String,
        default: 'primary'
      },
      text: {
        type: Object,
        default: '',
        required: true
      }
    },
    methods: {
      toggle (value) {
        this.active = value || !this.active
//        setTimeout(function () {
        this.model = this.active
        this.$dispatch('toggled::button-toggle', this.model)
//        }, ANIMATION)
      }
    },
    ready () {
      this.active = this.model
    }
  }
</script>
