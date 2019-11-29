<template>
  <drag-panel class="drag-container" :width="230" :min-width="230">
    <tree
      slot="left"
      ref="tree"
      @add="handleAdd"
      @edit="handleEdit"
      @get-id="getInitId"
    >
    </tree>
    <div class="right-container" slot="right">
      <add-edit :node="formData" @save="handleSave"></add-edit>
    </div>
  </drag-panel>
</template>

<script>
import dragPanel from 'src/components/drag-panel';
import tree from './components/tree';
import addEdit from './components/add-edit';

export default {
  name: '/backstage/menu',
  components: {
    dragPanel,
    tree,
    addEdit
  },
  data () {
    return {
      formData: {}
    };
  },
  methods: {
    /**
     * @description 初始化id
     * @author lvzhiyuan
     * @date 2019/9/21
     */
    getInitId (id) {
      this.formData = { id };
    },
    /**
     * @description 新增节点
     * @author lvzhiyuan
     * @date 2019/9/2
     */
    handleAdd (data) {
      this.formData = { parentId: data.id, btnType: data.btnType };
    },

    /**
     * @description 编辑节点
     * @author lvzhiyuan
     * @date 2019/9/21
     */
    handleEdit (data) {
      this.formData = { id: data.id, btnType: data.btnType };
    },

    /**
     * @description 保存
     * @author lvzhiyuan
     * @date 2019/9/5
     */
    handleSave () {
      this.$refs.tree.getTree();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~src/common/stylesheet/right-panel';
</style>
