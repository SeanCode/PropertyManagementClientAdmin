<template>
  <div>
    <div class="progress" v-show="showProgress">
      <progress :now="progressValue" type="success" striped animated></progress>
    </div>
    <router-view transition transition-mode="out-in"></router-view>
    <vs-toast></vs-toast>
  </div>
</template>
<style>
  .progress {
    position: relative;
    z-index: 1031;
    margin-bottom: 0;
    height: 4px;
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
      },
      'progress::hide': function () {
        this.showProgress = false
      },
      'progress::update': function (now) {
        this.progressValue = now
      }
    }
  }
</script>
