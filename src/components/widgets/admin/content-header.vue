<template>
  <section class="content-header">
    <h1>
      {{title}}
    </h1>
    <ol class="breadcrumb">
      <li><a v-link="{ path: '/'}"><i class="fa fa-home"></i> 系统</a></li>
      <li v-bind:class="{ 'active': !child}">{{parent}}</li>
      <li v-show="child" v-bind:class="{ 'active': child }">{{child ? child : ''}}</li>
    </ol>
  </section>

</template>
<style>
</style>
<script>
  export default {
    computed: {
      title () {
        return this.child ? this.child : this.parent
      }
    },
    props: {
      child: {
        type: String,
        default: ''
      },
      parent: {
        type: String,
        default: ''
      }
    }
  }
</script>
