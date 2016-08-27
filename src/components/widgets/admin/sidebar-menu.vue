<template>
  <!-- sidebar menu: : style can be found in sidebar.less -->
  <ul class="sidebar-menu">
    <li class="header">菜单</li>
    <template v-for="item in menu">
      <li v-if="item.children" class="treeview" v-bind:class="{ 'active': hasRoute(item.link) }">
        <a>
          <i class="fa {{ item.icon }}"></i>
          <span>{{ item.name }}</span>
          <i v-if="item.children" class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li v-bind:class="{ 'active': hasRoute(child.link) }" v-for="child in item.children">
            <a v-link="{ path: child.link }">
              <i class="fa {{ child.icon }}"></i> {{ child.name }}
            </a>
          </li>
        </ul>
      </li>
      <li v-else v-bind:class="{ 'active': hasRoute(item.link) }">
        <a v-link="{ path: item.link, exact: true }">
          <i class="fa {{ item.icon }}"></i>
          <span>{{ item.name }}</span>
        </a>
      </li>
    </template>
  </ul>
</template>
<script>
  export default {
    data: function () {
      return {
        menu: this.$parent.$data.menu || []
      }
    },
    methods: {
      // a solution for v-link-active
      hasRoute: function (partial) {
        return (this.$route.path.indexOf(partial) > -1)
      }
    }
  }

</script>
