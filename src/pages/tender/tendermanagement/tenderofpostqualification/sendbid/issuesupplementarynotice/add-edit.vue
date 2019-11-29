<template>
  <!--    编辑-->
  <el-dialog
    title=""
    :visible.sync="isShow"
    :close-on-click-modal="false"
    width="900px"
  >
    <notice-public
      ref="noticePublic"
      :tenderBatchInfoId="$route.query.tenderBatchInfoId"
      type="1"
      :isInDialog="true"
      :isView="showType === 'view'"
      :rowId="rowId"
      @close="handleClose">
    </notice-public>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import noticePublic from 'src/components/notice-publish';
export default {
  components: {
    noticePublic
  },
  data () {
    return {
      isShow: false,
      rowId: ''
    };
  },
  props: {
    /* 显示类型 */
    showType: {
      type: String
    }
  },
  mixins: [addEditMixin],
  watch: {
    isShow: {
      handler (newValue) {
        if (this.$refs.noticePublic) {
          // 弹窗隐藏时清空校验信息
          if (!newValue && this.$refs.noticePublic.$refs.ctForm) {
            this.$refs.noticePublic.$refs.ctForm.clearValidate();
          }
          // 点击编辑和查看时调用接口
          if (newValue && this.showType !== 'add') {
            this.$refs.noticePublic.getFormData();
          }
        }
      }
    }
  },
  methods: {
    /**
     * @description 显示信息弹窗
     * @author lizipei
     * @date 2019/11/20
     */
    showNoticePublic (id) {
      this.isShow = true;
      this.rowId = id || '';
    },
    /**
     * @description 弹窗关闭时触发
     * @author lizipei
     * @date 2019/11/20
     */
    handleClose (type) {
      this.isShow = false;
      this.$emit('return', type);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
