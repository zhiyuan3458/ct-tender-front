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
          <el-form-item label="招标项目信息" class="one-row el-form-item-title" prop="projectName">
          </el-form-item>
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="formData.projectName" disabled></el-input>
          </el-form-item>
          <el-form-item label="项目编号" prop="projectCode">
            <el-input maxlength="17" v-model="formData.projectCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目名称" prop="name">
            <el-input maxlength="17" v-model="formData.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目编号" prop="code">
            <el-input maxlength="17" v-model="formData.code" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标方式" prop="tenderWay">
            <dictionary-comp
              v-model="formData.tenderWay"
              code="tenderWay"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="招标组织形式" prop="tenderOrganizeForm">
            <dictionary-comp
              v-model="formData.tenderOrganizeForm"
              code="tenderOrganizeForm"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="资格审查方式" prop="qualificationReviewWay">
            <dictionary-comp
              v-model="formData.qualificationReviewWay"
              code="qualificationReviewWay"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="评标委员会选择中标人方式" prop="bidderChooseWay">
            <dictionary-comp
              v-model="formData.bidderChooseWay"
              code="bidderChooseWay"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="招标项目合同总金额" class="row-three">
            <dictionary-comp
              v-model="formData.regCapitalCurrency"
              code="regCapitalCurrency"
              type="select"
              readonly="false"
              @changeRow="getRegCapitalCurrency"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input type="number" v-model="formData.contractPrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.contractReckonMoneyUnit"
              code="moneyUnit"
              type="select"
              readonly="false"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="招标业主单位" prop="ownerName">
            <el-input maxlength="17" v-model="formData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="监督部门名称" prop="superviserName">
            <el-input maxlength="17" v-model="formData.superviserName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="监督部门组织机构代码" prop="superviserOrganizationCode">
            <el-input maxlength="17" v-model="formData.superviserOrganizationCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="审核部门名称" prop="approverName">
            <el-input maxlength="17" v-model="formData.approverName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="审核部门组织机构代码" prop="approverOrganizationCode">
            <el-input maxlength="17" v-model="formData.approverOrganizationCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标内容与范围及招标方案说明" prop="tenderContent">
            <el-input class="one-row" disabled type="textarea" v-model="formData.tenderContent"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="工作任务计划" prop="workPlan">
            <el-input class="one-row" disabled type="textarea" v-model="formData.workPlan"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="项目团队成员组成与职责分工" prop="responsibilityDivision">
            <el-input class="one-row" disabled type="textarea" v-model="formData.responsibilityDivision"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件" prop="projectScale">
            <uploader v-model="formData.attachmentId" disabled></uploader>
          </el-form-item>

          <el-form-item label="招标代理信息" class="one-row el-form-item-title" prop="projectName">
          </el-form-item>
          <el-form-item label="招标代理机构名称" prop="tenderAgencyName">
            <el-input maxlength="17" v-model="formData.tenderAgencyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目合同总金额" class="row-three">
            <dictionary-comp
              v-model="formData.regCapitalCurrency"
              code="regCapitalCurrency"
              type="select"
              readonly="false"
              @changeRow="getRegCapitalCurrency"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input type="number" v-model="formData.agencyPrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.agencyMoneyUnit"
              code="moneyUnit"
              type="select"
              readonly="false"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理权限" prop="agencyPermission">
            <el-input class="one-row" disabled type="textarea" v-model="formData.agencyPermission"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理内容与范围" prop="agencyContent">
            <el-input class="one-row" disabled type="textarea" v-model="formData.agencyContent"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理机构项目负责人信息" prop="agencyPrincipal">
            <el-input class="one-row" disabled type="textarea" v-model="formData.agencyPrincipal"></el-input>
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
import { tenderbatchinfoInfoJson } from 'src/api/tender/bidderprojectinformation';
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
        const { data } = await tenderbatchinfoInfoJson({ id });
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
