<template>
  <icons :is="iconType" :type="iconName" :size="iconSize" :color="iconColor"></icons>
</template>

<script>
import Icons from '_c/icons/icons'
export default {
  name: 'common-icon',
  components: { Icons },
  props: {
    type: {
      type: String,
      required: true
    },
    color: String,
    size: Number
  },
  computed: {
    iconType () {
      return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon'
    },
    iconName () {
      return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
    },
    iconSize () {
      return this.size || (this.iconType === 'Icons' ? 12 : undefined)
    },
    iconColor () {
      return this.color || ''
    }
  },
  methods: {
    getCustomIconName (iconName) {
      return iconName.slice(1)
    }
  }
}
</script>
