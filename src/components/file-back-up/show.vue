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
            <el-input v-model="ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核单位" prop="auditDept">
            <dictionary-comp
              v-model="formData.auditDept"
              type="select"
              code="auditDept"
              readonly
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="文件标题" prop="fileTitle">
            <el-input v-model="formData.fileTitle" disabled></el-input>
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
            <el-input v-model="formData.fileNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="发文流水号" prop="postFileNum">
            <el-input v-model="formData.postFileNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <uploader
              v-model="formData.attachmentIdOfFile"
              disabled
            >
            </uploader>
          </el-form-item>
          <el-form-item label="备案意见" prop="recordOpinion">
            <el-input v-model="formData.recordOpinion" disabled></el-input>
          </el-form-item>
          <el-form-item label="备案意见附件" prop="attachmentIdOfOpinion">
            <uploader
              v-model="formData.attachmentIdOfOpinion"
              disabled
            >
            </uploader>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取消</el-button>
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
      showApi: '/tender/td/projectmanagement/filerecordinfo/show'
    };
  },
  methods: {
    /**
     * @description 获取表单数据
     * @author lvzhiyuan
     * @date 2019/11/18
     */
    async getFormData (id) {
      this.isShow = true;
      try {
        const { data } = await this.$http.get(this.showApi, { id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`src-components-file-back-up-show-getFormData error: ${e}`);
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
