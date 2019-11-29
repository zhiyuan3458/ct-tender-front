<template>
  <el-popover
    width="500"
    trigger="click"
    placement="bottom"
    v-model="isShow"
    @show="showPopover"
  >
    <el-carousel ref="carousel" :height="containerHeight + 'px'" :autoplay="false" v-clickoutside="handleClose">
      <el-carousel-item v-for="(item, index) in list" :key="index">
       <ul class="icon-container">
         <li class="icon-container-item">
           <div
             class="icon-item"
             v-for="innerItem in item"
             :key="innerItem.value"
             @click="handleClick(innerItem)"
           >
             <svg-icon :font-size="20" :icon-class="innerItem.value"></svg-icon>
             <p class="text">{{ innerItem.name }}</p>
           </div>
         </li>
       </ul>
      </el-carousel-item>
    </el-carousel>
    <el-input slot="reference" v-model="name" @input="search(name)">
      <template slot="append">
        <svg-icon v-if="name" :icon-class="icon" font-size="18"></svg-icon>
      </template>
    </el-input>
  </el-popover>
</template>

<script>
import svgIcon from 'src/components/svg-icon';
import { getAllIcon } from 'src/api/backstage/icon';
import Clickoutside from 'element-ui/lib/utils/clickoutside';

export default {
  components: {
    svgIcon
  },
  data () {
    return {
      allList: [],
      iconList: [],
      icon: '',
      name: '',
      containerHeight: 300,
      isShow: false,
      flag: true
    };
  },
  directives: { Clickoutside },
  props: {
    /* 选中的值 */
    value: {
      type: String,
      default: ''
    },
    /* 几行 */
    row: {
      type: [String, Number],
      default: 4
    },
    /* 几列 */
    column: {
      type: [String, Number],
      default: 4
    }
  },
  computed: {
    list () {
      const NUMBER_FOR_ITEM = this.row * this.column;
      const length = Math.floor(this.iconList.length / NUMBER_FOR_ITEM);
      const total = this.iconList.length % NUMBER_FOR_ITEM === 0 ? length : length + 1;
      const arr = [];
      for (let i = 0; i < total; i++) {
        arr.push(this.iconList.slice(i * NUMBER_FOR_ITEM, (i + 1) * NUMBER_FOR_ITEM));
      }
      return arr;
    }
  },
  watch: {
    value () {
      this.icon = this.value;
      if (!this.value) {
        this.name = '';
      } else {
        this.name = this.allList.find(item => item.value === this.value).name;
      }
      this.flag = false;
    }
  },
  created () {
    this.getIconList();
  },
  mounted () {
    this.$nextTick(() => {
      const HEIGHT = 60;
      this.containerHeight = HEIGHT * this.column + 5 * 5;
    });
  },
  methods: {
    showPopover () {
      this.$nextTick(() => {
        this.$refs.carousel.setActiveItem(0);
      });
    },
    /**
     * @description 获取图标
     * @author lvzhiyuan
     * @date 2019/10/29
     */
    async getIconList () {
      try {
        const { data } = await getAllIcon();
        if (data.code === process.env.ERR_OK) {
          this.iconList = data.data;
          this.allList = data.data;
        };
      } catch (e) {
        console.log(`enterpriseUserManagement-getList error: ${e}`);
      }
    },
    /**
     * @description 选中图标后赋值
     * @author lvzhiyuan
     * @date 2019/10/29
     */
    handleClick (item) {
      this.icon = item.value;
      this.name = item.name;
      this.$emit('input', this.icon);
      this.isShow = false;
    },
    /**
     * @description 搜索
     * @author lvzhiyuan
     * @date 2019/10/29
     */
    search (name) {
      if (name) {
        const temp = [];
        this.iconList.forEach(item => {
          if (item.name.indexOf(name) >= 0) {
            temp.push(item);
          }
        });
        this.iconList = temp;
      } else {
        this.iconList = this.allList;
      }
    },
    /**
     * @description 关闭弹窗
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    handleClose () {
      // this.isShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-container {
  padding: 0 50px;
  margin-left: 10px;
  .icon-container-item {
    overflow: hidden;
    .icon-item {
      width: 84px;
      height: 60px;
      padding: 8px;
      float: left;
      text-align: center;
      border: 1px solid #eee;
      cursor: pointer;
      margin-right: 5px;
      margin-bottom: 5px;
      .text {
        width: 100%;
        display: inline-block;
        margin-top: 5px;
        white-space:  nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
