<template>
  <Submenu :name="`${parentName}`">

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
