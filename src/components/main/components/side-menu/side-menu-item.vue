<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''" />
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <side-menu-item v-if="showChildren(item)" :parent-item="item" :key="`menu-${item.name}`"></side-menu-item>
      <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
        <common-icon :type="item.icon" />
        <span>{{ showTitle(item) }}</span>
      </menu-item>
    </template>
  </Submenu>
</template>

<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
  name: 'SideMenuItem',
  mixins: [mixin, itemMixin]
}
</script>
