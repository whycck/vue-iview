<template>
  <div class="side-mune-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" :theme="theme"></Menu>
    <div class="menu-collapsed" v-show="collapsed"></div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data () {
    return {
      openNames: []
    }
  },
  created () {
    console.log(this)
  }
}
</script>
