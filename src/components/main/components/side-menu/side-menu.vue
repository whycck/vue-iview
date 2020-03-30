<template>
  <div class="side-mune-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed"></Menu>
    <div class="menu-collapsed" v-show="collapsed"></div>
  </div>
</template>

<script>
export default {
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
