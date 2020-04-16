<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" :theme="theme" @on-select="handleSelect" width="auto">
      <template v-for="item in menuList">
        <side-menu-item v-if="showChildren(item)" :parentItem="item" :key="`menu-${item.name}`"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed"></div>
  </div>
</template>

<script>
import SideMenuItem from './side-menu-item'
import mixin from './mixin'
export default {
  name: 'SideMenu',
  mixins: [mixin],
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
  components: {
    SideMenuItem
  },
  data () {
    return {
      openNames: []
    }
  },
  created () {
    console.log(this)
  },
  methods: {
    handleSelect (name) {
      // return this.$route.matched
      // console.log(name)
      this.$emit('on-select', name)
    }
  }
}
</script>
