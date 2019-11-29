<template>
  <div class="tree-container">
    <el-input
      class="search-input"
      placeholder="输入关键字进行搜索"
      v-model="filterText">
    </el-input>
    <div class="fit-fixed"></div>
    <div class="tree-content">
      <el-tree
        ref="menuTree"
        :data="ztreeList"
        :filter-node-method="filterNode"
        highlight-current
        draggable
        :props="props"
        node-key="id"
        :render-content="renderNode"
        :expand-on-click-node="false"
        @node-drop="nodeDrop"
        accordion
      >
      </el-tree>
    </div>
  </div>
</template>

<script type="text/jsx">
import { ADD } from '../constant';
import treeMixins from 'src/mixins/tree';
import { dataToChildren } from 'src/common/js/utils';
import { getTree, remove, dragDrop } from 'src/api/backstage/menu';
import svgIcon from 'src/components/svg-icon';
export default {
  name: '/backstage/menu',
  components: {
    /* eslint-disable */
    svgIcon
    /* eslint-disable */
  },
  data () {
    return {
      ztreeList: [],
      props: {
        label: 'text'
      },
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    };
  },
  mixins: [treeMixins],
  created () {
    this.getTree().then(ztreeList => {
      if (ztreeList && ztreeList.length > 0) {
        this.$nextTick(() => {
          const id = this.ztreeList[0].id;
          this.$refs.menuTree.setCurrentKey(id);
          this.$emit('get-id', id);
        });
      }
    });
  },
  watch: {
    filterText (val) {
      this.$refs.menuTree.filter(val);
    }
  },
  methods: {
    /**
         * @description 获取树的数据
         * @author lvzhiyuan
         * @date 2019/9/2
         */
    async getTree () {
      try {
        const { data } = await getTree();
        if (data.code === process.env.ERR_OK) {
          data.data.ztreeList.forEach(item => {
            item.status = false;
          });
          this.ztreeList = dataToChildren(data.data.ztreeList);
          return this.ztreeList;
        }
      } catch (e) {
        console.log(`menu-getTree error: ${e}`);
      }
    },
    /**
     * @description 拖拽树节点触发
     * @author lvzhiyuan
     * @date 2019/11/21
     */
    async nodeDrop (draggingNode, target, position, event) {
      const params = {
        targetId: target.data.id,
        sourceId: draggingNode.data.id,
        moveType: position === 'before' ? 'prev' : position === 'inner' ? 'inner' : 'next'
      };
      try {
        await dragDrop(params);
      } catch (e) {
        console.log(`menu-dragDrop error: ${e}`);
      }
    },
    /**
         * @description 新增节点
         * @author lvzhiyuan
         * @date 2019/9/2
         */
    add (data, e) {
      e.stopPropagation();
      this.$emit('add', { id: data.id, btnType: ADD });
    },
    /**
         * @description 编辑
         * @author lvzhiyuan
         * @date 2019/9/3
         */
    edit (data, e) {
      e.stopPropagation();
      this.$refs.menuTree.setCurrentKey(data.id);
      this.$emit('edit', data);
    },
    /**
         * @description 删除
         * @author lvzhiyuan
         * @date 2019/9/3
         */
    remove (data, e) {
      e.stopPropagation();
      this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await remove({ id: data.id });
          this.getTree();
        } catch (e) {
          console.log(`menu-remove1 error: ${e}`);
        }
      }).catch(e => {
        console.log(`menu-remove2 error: ${e}`);
      });
    },
    /**
         * 渲染树
         */
    renderNode (h, { node, data, store }) {
      return (
        <span style="display: inline-block;width: 100%;" on-mouseenter={() => { data.status = true; }} on-mouseleave={() => { data.status = false; }}>
          <span>
            <svgIcon style="margin-right: 4px;" icon-class={data.iconSkin} />
            <span on-click={e => this.edit(data, e)}>{node.label}</span>
          </span>
          <span v-show={data.status}>
            <i class="icon el-icon-circle-plus-outline" on-click={e => this.add(data, e)} />
            <i class="icon el-icon-close" on-click={e => this.remove(data, e)} />
          </span>
        </span>);
    },
    /**
     * @description 搜索过滤
     * @author lvzhiyuan
     * @date 2019/9/27
     */
    filterNode (value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .icon {
    display: inline-block;
    margin-left: 8px;
    cursor: pointer;
}
/deep/ .el-icon-circle-plus-outline {
    color: dodgerblue;
}

/deep/ .el-icon-notebook-1 {
    color: green;
}

/deep/ .el-icon-close {
    color: firebrick;
}
</style>
