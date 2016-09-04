<template>
  <div>
    <div class="progress-global" v-show="showProgress">
      <progress :now="progressValue" type="success" striped animated></progress>
    </div>
    <router-view transition transition-mode="out-in"></router-view>
    <vs-toast></vs-toast>
  </div>
</template>
<style>
  .progress-global {
    position: fixed;
    z-index: 1031;
    margin-bottom: 0;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.7;
  }

  .progress-global .progress-bar {
    position: absolute;
    top: 40%;
    height: 8px;
    border-radius: 4px;
  }
</style>
<script>
  import Toast from './components/widgets/Toast.vue'
  import Progress from './components/widgets/ProgressBar.vue'

  export default {
    components: {
      'vs-toast': Toast,
      'progress': Progress
    },
    data () {
      return {
        showProgress: false,
        progressValue: 0,
        type: 'info'
      }
    },
    events: {
      'progress::show': function (type) {
        this.showProgress = true
        if (type) {
          this.type = type
        }
        this.progressValue = 0
      },
      'progress::hide': function () {
        setTimeout(() => {
          this.showProgress = false
          this.progressValue = 0
        }, 500)
      },
      'progress::update': function (now) {
        this.progressValue = now
      }
    }
  }
</script>
