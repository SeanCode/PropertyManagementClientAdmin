<template>
  <!-- sidebar menu: : style can be found in sidebar.less -->
  <ul class="sidebar-menu">
    <li class="header">菜单</li>
    <template v-for="item in menu">
      <li v-if="item.children" class="treeview" v-link-active>
        <a v-link="{ path: item.link }">
          <i class="fa {{ item.icon }}"></i>
          <span>{{ item.name }}</span>
          <i v-if="item.children" class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li v-link-active v-for="child in item.children">
            <a @click="updatePath({parent: item, child: child})" v-link="{ path: child.link }">
              <i class="fa {{ child.icon }}"></i> {{ child.name }}
            </a>
          </li>
        </ul>
      </li>
      <li v-else v-link-active>
        <a @click="updatePath({parent: item, child: undefined})" v-link="{ path: item.link, exact: true }">
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
      updatePath: function (path) {
        this.$dispatch('path-msg', path)
      }
    }
  }

</script>
