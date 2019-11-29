<template>
    <drag-panel class="drag-container" :width="232" :min-width="232">
      <tree
        slot="left"
        ref="tree"
        @add="handleAdd"
        @edit="handleEdit"
      >
      </tree>
        <div class="right-container" slot="right">
            <list ref="list" v-if="isListShow" :node="listData" @show-add-edit="handleShowAddEdit" v-show="!isAddEditShow"></list>
            <add-edit v-if="isAddEditShow" :node="formData" @return="isAddEditShow = false" @save="handleSave"></add-edit>
        </div>
    </drag-panel>
</template>

<script>
import dragPanel from 'src/components/drag-panel';
import tree from './components/tree';
import list from './components/list';
import addEdit from './components/add-edit';
import { ADD, ADD_CATEGORY } from './constant';
export default {
  name: '/backstage/dictionary',
  components: {
    dragPanel,
    tree,
    list,
    addEdit
  },
  data () {
    return {
      isListShow: false,
      isAddEditShow: false,
      listData: {},
      formData: {}
    };
  },
  methods: {
    /**
         * @description 新增节点
         * @author lvzhiyuan
         * @date 2019/9/2
         */
    handleAdd (data) {
      this.formData = { id: data.id, btnType: data.btnType, code: '' };
      this.isListShow = false;
      this.isAddEditShow = true;
    },

    /**
         * @description 编辑
         * @author lvzhiyuan
         * @date 2019/9/2
         */
    handleEdit (data) {
      if (data.type === '0') {
        this.listData = data;
        this.isListShow = true;
        this.isAddEditShow = false;
      } else {
        this.formData = data;
        this.isListShow = false;
        this.isAddEditShow = true;
      }
    },
    /**
         * @description 修改表格行的信息
         * @author lvzhiyuan
         * @date 2019/9/4
         */
    handleShowAddEdit (data) {
      this.formData = data;
      this.isAddEditShow = true;
    },
    /**
         * @description
     * @author lvzhiyuan
         * @date 2019/9/5
         */
    handleSave () {
      this.$refs.tree.getTree();
      const arr = [ADD, ADD_CATEGORY];
      if (arr.includes(this.formData.btnType)) {
        this.$refs.tree.getTree();
      } else {
        this.isAddEditShow = false;
        this.$refs.list.getList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~src/common/stylesheet/right-panel';
</style>
