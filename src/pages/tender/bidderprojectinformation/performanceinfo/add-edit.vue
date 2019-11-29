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
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="formData.projectName" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目编号" prop="projectCode">
            <el-input maxlength="17" v-model="formData.projectCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目名称" prop="tenderBatchName">
            <el-input maxlength="17" v-model="formData.tenderProjectName" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目编号" prop="tenderBatchCode">
            <el-input maxlength="17" v-model="formData.tenderProjectCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="标段名称" prop="sectionName">
            <el-input maxlength="17" v-model="formData.sectionName" disabled></el-input>
          </el-form-item>
          <el-form-item label="标段编号" prop="sectionCode">
            <el-input maxlength="17" v-model="formData.sectionCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="招标人名称" prop="tenderName">
            <el-input maxlength="17" v-model="formData.tendererName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="中标人名称" prop="bidderName">
            <el-input maxlength="17" v-model="formData.bidderName" disabled></el-input>
          </el-form-item>
          <el-form-item label="合同金额" class="row-three" prop="regAddress">
            <dictionary-comp
              v-model="formData.regCapitalCurrency"
              code="regCapitalCurrency"
              type="select"
              readonly="false"
              @changeRow="getRegCapitalCurrency"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" type="number" v-model="formData.contractPrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.contractReckonMoneyUnit"
              code="moneyUnit"
              type="select"
              readonly="false"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="合同结算金额" class="row-three" prop="regAddress">
            <dictionary-comp
              v-model="formData.regCapitalCurrency"
              code="regCapitalCurrency"
              type="select"
              readonly="false"
              @changeRow="getRegCapitalCurrency"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" type="number" v-model="formData.settlePrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.contractReckonMoneyUnit"
              code="moneyUnit"
              type="select"
              readonly="false"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="合同期限（天）" prop="contractDeadline">
            <el-input v-model="formData.contractDeadline" disabled></el-input>
          </el-form-item>
          <el-form-item label="实际履约期限（天）" prop="actualDeadline">
            <el-input v-model="formData.actualDeadline" disabled></el-input>
          </el-form-item>
          <el-form-item label="合同签署时间" prop="signDate">
            <el-input v-model="formData.signDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="合同完成时间" prop="endContractDate">
            <el-input v-model="formData.endContractDate" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件" prop="projectScale">
            <uploader v-model="formData.attachmentId" disabled></uploader>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取 消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import { downloadFile } from 'src/common/js/utils';
import { performanceinfoInfoJson } from 'src/api/tender/bidderprojectinformation';
import { getFileList, downFile } from 'src/api/tender/bidderinformation/performanceinformation';
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
        const { data } = await performanceinfoInfoJson({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
          this.regAddress = this.formData.regProvince;
          this.getFileList(this.formData.attachmentId);
        }
      } catch (e) {
        console.log(`company-getFormData error: ${e}`);
      }
    },
    /**
     * @description 获取附件列表
     * @author wenruihuan
     * 2019/11/6
     */
    async getFileList (id) {
      try {
        const { data } = await getFileList({ attachmentId: id });
        console.log('data');
        console.log(data);
        if (data.code === process.env.ERR_OK) {
          this.fileList = data.data;
        }
      } catch (e) {
        console.log(`bidderprojectinformation-projectinformation getFileList-error: ${e}`);
      }
    },
    /**
     * @description 获取当前列附件列表
     * @author wenruihuan
     * 2019/11/6
     */
    async handleDown (id, originalFileName) {
      try {
        const { data } = await downFile({ id: id });
        console.log(data);
        downloadFile(data, originalFileName);
      } catch (e) {
        console.log(`bidderinformation-performanceinformation handleDown error: ${e}`);
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
