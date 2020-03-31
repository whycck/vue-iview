<template>
  <div class="side-mune-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" theme="primary"></Menu>
    <div class="menu-collapsed" v-show="collapsed"></div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    collapsed: {
      type: Boolean
    }
  },
  data () {
    return {
      openNames: []
    }
  }
}
</script>
