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
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="formData.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目编号" prop="code">
            <el-input maxlength="17" v-model="formData.code" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="项目所在行政区域" prop="regAddress">
            <dictionary-comp
              v-model="formData.administrativeRegion"
              code="Regprovince"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.administrativeRegionProvince"
              code="RegCity"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="项目行业分类" prop="regCapitalCurrency">
              <el-select v-model="industryCode" disabled>
              </el-select>
              <span class="clearance"></span>
            <dictionary-comp
              code="industryCode"
              v-model="formData.industryCode"
              readonly
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="项目业主单位" prop="ownerName">
            <el-input v-model="formData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目法人" prop="legalPerson">
            <el-input v-model="formData.legalPerson" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contactor">
            <el-input v-model="formData.contactor" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contactInformation">
            <el-input v-model="formData.contactInformation" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目审批单位" prop="approvalDept">
            <el-input v-model="formData.approvalDept" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目审批文号" prop="approvalNo">
            <el-input v-model="formData.approvalNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目审批文件名称" prop="approvalFileName">
            <el-input v-model="formData.approvalFileName" disabled></el-input>
          </el-form-item>
          <el-form-item label="立项批复文号" prop="projectApprovalNo">
            <el-input v-model="formData.projectApprovalNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="初步设计批复文号" prop="designApprovalNo">
            <el-input v-model="formData.designApprovalNo" disabled></el-input>
          </el-form-item>
          <el-form-item label="施工图批复文号" prop="constructionDrawApprovalNo">
            <el-input v-model="formData.constructionDrawApprovalNo" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="项目地址" prop="address">
            <el-input class="one-row" disabled v-model="formData.address"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="项目地址" prop="address">
            <el-input class="one-row" disabled v-model="formData.address"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="资金来源" prop="fundSource">
            <el-input class="one-row" disabled type="textarea" v-model="formData.fundSource"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="项目规模" prop="projectScale">
            <el-input class="one-row" disabled type="textarea" v-model="formData.projectScale"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件" prop="projectScale">
            <uploader v-model="formData.attachmentId" disabled></uploader>
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
import { projectInfoJson } from 'src/api/tender/bidderprojectinformation';
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
      regAddress: '', //
      regAddressDetails: '', //
      fileList: [],
      formData: {},
      isShow: false
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
        const { data } = await projectInfoJson({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
          this.regAddress = this.formData.regProvince;
          this.getFileList(this.formData.attachmentId);
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
