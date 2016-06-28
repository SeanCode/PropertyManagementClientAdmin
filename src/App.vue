<template>
  <div>
    <router-view transition transition-mode="out-in"></router-view>
    <vs-toast></vs-toast>
  </div>
</template>
<script>
  import Toast from './components/widgets/toast.vue'

  export default {
    components: {
      'vs-toast': Toast
    }
  }
</script>
