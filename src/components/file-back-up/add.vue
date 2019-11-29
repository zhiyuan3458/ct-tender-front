<template>
  <el-dialog
    title=""
    :visible.sync="isShow"
    :close-on-click-modal="false"
    width="900px"
  >
    <div class="add-edit-container">
      <div class="form-container">
        <el-form :model="formData" ref="ctForm" label-width="150px">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="formData.projectName" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目编号" prop="projectCode">
            <el-input v-model="formData.projectCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目名称" prop="tenderBatchName">
            <el-input v-model="formData.tenderBatchName" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目编号" prop="tenderBatchCode">
            <el-input v-model="formData.tenderBatchCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="报文单位" prop="ownerName">
            <el-input v-model="ownerName"></el-input>
          </el-form-item>
          <el-form-item label="审核单位" prop="auditDept">
            <dictionary-comp
              v-model="formData.auditDept"
              type="select"
              code="auditDept"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="文件标题" prop="fileTitle">
            <el-input v-model="formData.fileTitle"></el-input>
          </el-form-item>
          <el-form-item label="文件类型" prop="fileType">
            <dictionary-comp
              v-model="formData.fileType"
              type="select"
              code="fileType"
              readonly
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="文号" prop="fileNum">
            <el-input v-model="formData.fileNum"></el-input>
          </el-form-item>
          <el-form-item label="发文流水号" prop="postFileNum">
            <el-input v-model="formData.postFileNum"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <uploader
              v-model="formData.attachmentIdOfFile"
              disabled
            >
            </uploader>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="submitFn">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      isShow: false,
      formData: {},
      submitApi: '/tender/td/projectmanagement/filerecordinfo/submit'
    };
  },
  methods: {
    /**
     * @description 打开模态框
     * @author lvzhiyuan
     * @date 2019/11/19
     */
    showAddPage () {
      this.isShow = true;
    },
    /**
     * @description 提交
     * @author lvzhiyuan
     * @date 2019/11/18
     */
    async submitFn () {
      const params = {
        tenderBatchInfoId: this.$route.query.tenderBatchInfoId,
        ...this.formData
      };
      try {
        const { data } = await this.$http.post2(this.submitApi, params);
        if (data.code === process.env.ERR_OPERATE_OK) {
          setTimeout(() => {
            this.isShow = false;
            this.$parent.getList();
          }, 2000);
        }
      } catch (e) {
        console.log(`src-components-file-back-up-add-submitFn error: ${e}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dialog{
  .add-edit-container {
    padding-bottom: 0;
  }
  .el-form-item{
    width: 50%;
    float: left;
  }
  .tool-container {
    width: 100%;
    text-align: right;
  }
}
</style>
