<template>
  <app-header></app-header>
  <app-sidebar></app-sidebar>
  <app-content></app-content>
  <app-footer></app-footer>
</template>

<script>
  import Header from './components/layout/Header.vue'
  import Sidebar from './components/layout/Sidebar.vue'
  import Content from './components/layout/Content.vue'
  import Footer from './components/layout/Footer.vue'

  export default {
    name: 'Container',
    route: {
      activate () {
        this.$broadcast('login-msg')
      }
    },
    data: function () {
      return {
        menu: require('./config/menu.js') || []
      }
    },
    replace: false,
    components: {
      'app-header': Header,
      'app-sidebar': Sidebar,
      'app-content': Content,
      'app-footer': Footer
    },
    events: {
      'path-msg': function (path) {
        this.$broadcast('path-msg', path)
      }
    }
  }
</script>
