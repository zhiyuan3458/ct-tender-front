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
        ref="dictionaryTree"
        :data="ztreeList"
        :filter-node-method="filterNode"
        highlight-current
        :props="props"
        node-key="id"
        accordion
        :render-content="renderNode"
        :expand-on-click-node="false"
        default-expand-all
      >
      </el-tree>
    </div>
  </div>
</template>

<script type="text/jsx">
import treeMixins from 'src/mixins/tree';
import { dataToChildren } from 'src/common/js/utils';
import { getTree, remove } from 'src/api/backstage/dictionary';
import { ADD, ADD_CATEGORY, EDIT } from '../constant';

export default {
  name: '/backstage/dictionary',
  data () {
    return {
      ztreeList: [],
      props: {
        label: 'text'
      },
      /* 树形过滤字段 */
      filterText: ''
    };
  },
  mixins: [treeMixins],
  created () {
    this.getTree();
  },
  watch: {
    /**
     * @description 输入关键字时进行搜索
     * @author lvzhiyuan
     * @date 2019/9/28
     */
    filterText (val) {
      this.$refs.dictionaryTree.filter(val);
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
        }
      } catch (e) {
        console.log(`dictionary-getTree error: ${e}`);
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
         * @description 新增目录
         * @author lvzhiyuan
         * @date 2019/9/2
         */
    addCategory (data, e) {
      e.stopPropagation();
      this.$emit('add', { id: data.id, btnType: ADD_CATEGORY });
    },
    /**
         * @description 编辑
         * @author lvzhiyuan
         * @date 2019/9/3
         */
    edit (data, e) {
      e.stopPropagation();
      if (data.type === 'root') return false;
      data.btnType = EDIT;
      this.$emit(EDIT, data);
    },
    /**
         * @description 删除
         * @author lvzhiyuan
         * @date 2019/9/3
         */
    remove (data, e) {
      e.stopPropagation();
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const { id, type, code } = data;
          const res = await remove({ id, type, value: code });
          const data1 = res.data;
          if (data1.code === process.env.ERR_OPERATE_OK) {
            this.getTree();
          } else {
            this.$message({
              type: 'warning',
              message: data1.msg
            });
          }
        } catch (e) {
          console.log(`dictionary-remove error: ${e}`);
        }
      }).catch(() => {
      });
    },
    /**
         * 渲染树
         */
    renderNode (h, { node, data, store }) {
      return (
        <span style="display: inline-block;width: 100%;" on-mouseenter={() => { data.status = true; }} on-mouseleave={() => { data.status = false; }}>
          <span>
            <span on-click={e => this.edit(data, e)}>{node.label}</span>
          </span>
          <span v-show={data.status}>
            <i class="icon el-icon-circle-plus-outline" v-show={data.type === '1'} on-click={e => this.add(data, e)} />
            <i class="icon el-icon-notebook-1" v-show={data.type !== '0'} on-click={e => this.addCategory(data, e)} />
            <i class="icon el-icon-close" v-show={data.type !== 'root'} on-click={e => this.remove(data, e)} />
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
@import '~src/common/stylesheet/tree.scss';
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
