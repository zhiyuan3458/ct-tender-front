<template>
  <svg :class="svgClass" :style="{'font-size': fontSize + 'px'}" aria-hidden="true" >
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: { type: String, required: true },
    className: { type: String },
    fontSize: { type: Number, default: 13 }
  },
  computed: {
    iconName () {
      return `#ct-icon-${this.iconClass}`;
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
