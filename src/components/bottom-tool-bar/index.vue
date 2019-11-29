<template>
    <div class="bottom-tool-bar">
        <div class="tool-container">
            <el-button type="success" v-if="isShowSubmit" @click="$emit('submit')">提交</el-button>
            <el-button type="primary" v-if="isShowEdit" @click="$emit('edit')">编辑</el-button>
            <el-button type="primary" v-if="isShowSave" @click="$emit('save')">保存</el-button>
            <el-button v-if="isShowReturn" @click="$emit('return')">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'bottom-tool-bar',
  props: {
    /* 保存 */
    isShowSave: {
      type: Boolean,
      default: true
    },
    /* 编辑 */
    isShowEdit: {
      type: Boolean,
      default: false
    },
    /* 提交 */
    isShowSubmit: {
      type: Boolean,
      default: false
    },
    /* 返回 */
    isShowReturn: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom-tool-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    border-radius: 3px;
    background-color: #f8f9f9;
    border: #e0e3e6 1px solid;
    border-left: 0;
 margin-left: 230px;
    .tool-container {
        display: flex;
        justify-content: center;
        padding: 10px 20px;
        box-sizing: border-box;
        align-items: center;
        border-radius: 0 0 3px 3px;
        text-align: center;
    }
}
</style>
