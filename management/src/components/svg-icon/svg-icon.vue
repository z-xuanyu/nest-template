<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

// const components = import.meta.globEager('../../assets/icons/*.svg')
// const modules = {}
// Object.keys(components).forEach(path => {
//   const fileName = path.replace(/(.*\/)*([^.]+).*/ig,"$2")
//   modules[fileName] = components[path].default
// })

interface SvgIcon {
  iconClass: string
  className?: string
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props: SvgIcon) {
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => 'svg-icon')

    return {
      iconName,
      svgClass
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
