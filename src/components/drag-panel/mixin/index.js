/* 左边树容器的箭头宽度 */
const ARROW_WIDTH = 10;
export default {
  data () {
    return {
      collapseObjWidth: this.width,
      collapsedWrapperMarginLeft: 0,
      rightCotentMarginLeft: this.width + 10,
      arrowClass: 'collapsed-arrow',
      isDrag: this.isDraggable
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
      type: Number,
      default: 200
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
      if (this.isDrag) {
        const that = this;
        document.onmousemove = function (e) {
          e.preventDefault();
          e.stopPropagation();
          const currentX = e.clientX - 250;
          let documentWidth = document.body.clientWidth;
          documentWidth = documentWidth - 500;
          if (currentX <= that.minWidth) {
            that.rightCotentMarginLeft = that.minWidth + ARROW_WIDTH;
            return false;
          }
          if (currentX >= documentWidth) {
            that.collapseObjWidth = documentWidth;
            that.rightCotentMarginLeft = documentWidth + ARROW_WIDTH;
            return false;
          }
          that.collapseObjWidth = currentX;
          that.rightCotentMarginLeft = currentX + ARROW_WIDTH;
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
        const collapseObjMarginLeft = this.collapsedWrapperMarginLeft;
        if (collapseObjMarginLeft === 0) {
          this.collapsedWrapperMarginLeft = -this.collapseObjWidth;
          this.rightCotentMarginLeft = ARROW_WIDTH;
          this.arrowClass = 'open-arrow';
          this.isDrag = false;
        } else {
          this.collapsedWrapperMarginLeft = 0;
          this.rightCotentMarginLeft = this.collapseObjWidth + ARROW_WIDTH;
          this.arrowClass = 'collapsed-arrow';
          this.isDrag = true;
        }
      } else {
      }
    }
  }
};
