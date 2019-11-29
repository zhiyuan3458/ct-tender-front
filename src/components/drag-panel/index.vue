<template>
    <div class="drag-panel">
        <div class="collapsed-wrapper" ref="collapsedWrapper" :style="{width: collapseObjWidth + 'px', 'margin-left': collapsedWrapperMarginLeft + 'px'}">
            <div class="collapsed-content">
                <slot name="left"></slot>
            </div>
            <div class="arrow-wrapper" @mousedown="drag" v-if="isCollapsable">
                <div class="arrowIcon" :class="arrowClass" @click.stop="handleCollapse"></div>
            </div>
        </div>
        <div class="right-content-container" :style="{'margin-left': rightCotentMarginLeft + 'px'}">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import mixin from './mixin';
export default {
  mixins: [mixin]
};
</script>

<style lang="scss" scoped>
.drag-container {
  .collapsed-wrapper {
    height: 100%;
    padding: 6px 4px 0 4px;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
    position: relative;
    float: left;

    .collapsed-content {
      height: 100%;
      overflow-x: hidden;
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
  .right-content-container {
    height: 100%;
  }
}
</style>
