<template>
  <div class="collapsed-wrapper" ref="collapsedWrapper" :style="{width: collapsedWrapperWidth + 'px', marginLeft: marginLeft + 'px'}">
    <div class="collapsed-content">
      <slot name="left"></slot>
    </div>
    <div class="arrow-wrapper" @mousedown="drag" v-if="collapsable">
      <div class="arrowIcon" :class="arrowClass" @click.stop="handleCollapse"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      collapsedWrapperWidth: 0,
      collapsedWrapperMarginLeft: 0,
      arrowClass: 'collapsed-arrow',
      expandShow1: this.expandShow
    };
  },
  props: {
    /* 宽度 */
    width: {
      type: Number,
      default: 260
    },
    /* 规定左栏的拖拽最小宽度 */
    minWidth: {
      type: String,
      defatult: 200
    },
    /* 距离左边的边距 */
    marginLeft: {
      type: Number,
      default: 0
    },
    /* 是否可伸缩 */
    isCollapsable: {
      type: Boolean,
      default: true
    },
    /* 初始时是否展开 */
    isInitExpand: {
      ype: Boolean,
      default: true
    },
    /* 是否可拖拽 */
    isDraggable: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    expandShow: function () {
      this.expandShow1 = this.expandShow;
    }
  },

  /**
   * 初始化左栏的宽度和左偏移
   */
  created () {
    this.collapsedWrapperWidth = this.width;
    this.collapsedWrapperMarginLeft = this.marginLeft;
  },

  methods: {
    // 拖拽可伸缩侧导航栏函数
    drag (e) {
      // 如果是按了箭头收缩的话，就不给拉动
      if (e.target.className.indexOf('arrowIcon') >= 0) {
        return false;
      }
      // 看传入的draggable值是否为true才给拉伸
      if (this.isDraggable) {
        const that = this;
        document.onmousemove = function (e) {
          e.preventDefault();
          e.stopPropagation();
          const currentMarginWidth = e.clientX - 51;
          let documentWidth = document.body.clientWidth;
          documentWidth = documentWidth - 500;
          if (currentMarginWidth <= this.minWidth) {
            that.collapsedWrapperWidth = this.minWidth;
            that.$emit('getLzyTableWrapperMarginLeft', { left: this.minWidth });
            return false;
          }
          if (currentMarginWidth >= documentWidth) {
            that.collapsedWrapperWidth = documentWidth;
            that.$emit('getLzyTableWrapperMarginLeft', { left: documentWidth });
            return false;
          }
          // 把collapsedWrapperWidth提交到父组件
          that.$emit('getMarginLeft', { left: currentMarginWidth });
          that.collapsedWrapperWidth = currentMarginWidth;
        };

        document.onmouseup = function () {
          document.onmousemove = null;
        };
      } else {
        return false;
      }
    },

    // 点击侧导航栏的伸缩符可以伸缩侧导航栏
    handleCollapse () {
      if (this.isCollapsable) {
        const collapsedWrapperMarginLeft = this.collapsedWrapperMarginLeft;
        if (collapsedWrapperMarginLeft === 0) {
          this.collapsedWrapperMarginLeft = -this.collapsedWrapperWidth;
          this.$emit('getLzyTableWrapperMarginLeft', { left: 0 });
          this.arrowClass = 'open-arrow';
          this.isDraggable = false;
        } else {
          this.collapsedWrapperMarginLeft = 0;
          this.$emit('getLzyTableWrapperMarginLeft', { left: this.collapsedWrapperWidth });
          this.arrowClass = 'collapsed-arrow';
          this.isDraggable = true;
        }
      } else {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.collapsed-wrapper {
  height: 100%;
  padding: 6px 4px 0 4px;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
  float: left;

  .collapsed-content {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }

  .arrow-wrapper {
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    right: -10px;
    cursor: col-resize;

    .arrowIcon {
      width: 10px;
      height: 83px;
      position: absolute;
      right: 0px;
      top: 280px;
      cursor: pointer;
    }

    .collapsed-arrow {
      background: url('./img/arrow.png') no-repeat 0 0;
    }

    .open-arrow {
      background: url('./img/arrow.png') no-repeat -11px 0;
    }
  }
}
</style>
