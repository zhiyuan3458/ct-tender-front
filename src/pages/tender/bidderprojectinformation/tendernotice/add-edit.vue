<template>
  <!--    编辑-->
  <el-dialog
    title=""
    :visible.sync="isShow"
    :close-on-click-modal="false"
    width="900px"
  >
    <div class="add-edit-container">
      <div class="form-container">
        <el-form :model="formData" ref="ctForm" label-width="150px">
          <el-form-item label="招标人名称" prop="projectName" class="one-row">
            <el-input v-model="formData.projectName" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="formData.projectName" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目编号" prop="projectCode">
            <el-input maxlength="17" v-model="formData.projectCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目名称" prop="name">
            <el-input maxlength="17" v-model="formData.tenderBatchName" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目编号" prop="code">
            <el-input maxlength="17" v-model="formData.tenderBatchCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="公告性质" prop="noticeNature">
            <dictionary-comp
              v-model="formData.noticeNature"
              code="noticeNature"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="公告类型" prop="noticeType">
            <dictionary-comp
              v-model="formData.noticeType"
              code="noticeType"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="公告发布开始时间" prop="issueStartDate">
            <el-input maxlength="17" v-model="formData.issueStartDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="公告发布结束时间" prop="issueEndDate">
            <el-input maxlength="17" v-model="formData.issueEndDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="公告发布媒体" class="one-row" prop="issueMedia">
            <el-input maxlength="17" v-model="formData.issueMedia" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标文件获取开始时间" prop="fileAcquireStartDate">
            <el-input maxlength="17" v-model="formData.fileAcquireStartDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标文件获取截止时间" prop="fileAcquireEndDate">
            <el-input maxlength="17" v-model="formData.fileAcquireEndDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标文件获取方法" class="one-row" prop="fileAcquireWay">
            <el-input maxlength="17" v-model="formData.fileAcquireWay" disabled></el-input>
          </el-form-item>
          <el-form-item label="投标文件递交开始时间" prop="fileSubmitStartDate">
            <el-input maxlength="17" v-model="formData.fileSubmitStartDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="投标文件递交截止时间" prop="fileSubmitEndDate">
            <el-input maxlength="17" v-model="formData.fileSubmitEndDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="投标文件递交方法" class="one-row" prop="fileSubmitWay">
            <el-input maxlength="17" v-model="formData.fileSubmitWay" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件" prop="projectScale">
            <uploader v-model="formData.attachmentId" disabled ></uploader>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">返回</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import { tendernoticeInfoJson } from 'src/api/tender/bidderprojectinformation';
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      industryCode: '建筑业',
      fileList: [],
      formData: {},
      isShow: true
    };
  },
  mixins: [addEditMixin],
  methods: {
    /**
     * @description 获取表单数据
     * @author lvzhiyuan
     * @date 2019/9/2
     */
    async getFormData (id) {
      this.isShow = true;
      try {
        const { data } = await tendernoticeInfoJson({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`company-getFormData error: ${e}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-edit-container {
  padding-bottom: 0;
  background-color: white;
  /deep/.el-form-item__content{
    /*width: 100%;*/
  }
  /deep/.el-form{
    display: flex;
    flex-wrap: wrap;
    .el-form-item{
      width: 50%;
    }
  }
  /deep/.el-select{
    width: 100%;
  }
  .el-form-item-title{
    /deep/.el-form-item__label{
      font-size: 16px;
      color: #1E7CF1;
    }
  }
  .down-list{
    p{
      cursor: pointer;
    }
  }
  .row-two{
    /deep/.el-form-item__content{
      display: flex;
      .el-select{
        width: 100%;
      }
    }
  }
  .row-three{
    /deep/.el-form-item__content{
      display: flex;
      .el-select{
      }
    }
  }
  .clearance{
    display: block;
    margin: 0 2px;
  }
  .form-container{
    margin: 0 auto;
    position: relative;
    height: 50vh;
    min-width: 400px;
    overflow-y: auto;
    .one-row{
      width: 100%;
    }
  }
  .tool-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 20px 20px 0;
    box-sizing: border-box;
    align-items: center;
    border-radius: 0 0 3px 3px;
    text-align: right;
  }
}
</style>
