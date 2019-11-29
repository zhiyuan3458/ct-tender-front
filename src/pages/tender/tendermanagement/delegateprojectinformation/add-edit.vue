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
        <div class="info-tips" v-if="auditStatus === '已接受'">接受时间： {{ projectInfoData.acceptStatus }}</div>
        <el-form :model="projectInfoData" ref="ctForm" label-width="150px">
          <el-form-item class="one-row el-form-item-title" label="项目信息">
          </el-form-item>
          <el-form-item class="row-two" label="项目名称" prop="name">
            <el-input maxlength="200" v-model="projectInfoData.name" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="项目编号" prop="code">
            <span>{{ projectInfoData.code }}</span>
          </el-form-item>
          <el-form-item class="row-two" label="项目业主单位" prop="ownerName">
            <el-input v-model="projectInfoData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="项目所在行政区域" prop="administrativeRegionProvince">
            <dictionary-comp
              v-model="projectInfoData.administrativeRegionProvince" code="province" type="select" :readonly="true">
            </dictionary-comp>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="projectInfoData.administrativeRegion" code="city" type="select" :readonly="true">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="联系人" prop="contactor">
            <el-input maxlength="100" v-model="projectInfoData.contactor" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="联系方式" prop="contactInformation">
            <el-input maxlength="100" v-model="projectInfoData.contactInformation" disabled></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="tenderBatchInfo" ref="ctForm1" label-width="150px">
          <el-form-item class="one-row el-form-item-title" label="招标项目信息">
          </el-form-item>
          <el-form-item class="row-two" label="招标项目名称" prop="name">
            <el-input maxlength="200" v-model="tenderBatchInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="招标项目编号" prop="code">
            <span>{{ tenderBatchInfo.code }}</span>
          </el-form-item>
          <el-form-item class="row-two" label="招标方式" prop="tenderWay">
            <dictionary-comp
              v-model="tenderBatchInfo.tenderWay" code="tenderWay" type="select" :readonly="true">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="招标组织形式" prop="tenderOrganizeForm">
            <dictionary-comp
              v-model="tenderBatchInfo.tenderOrganizeForm" code="tenderOrganizeForm" type="select" :readonly="true">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="资格审查方式" prop="qualificationReviewWay">
            <dictionary-comp
              v-model="tenderBatchInfo.qualificationReviewWay" code="qualificationReviewWay" type="select" :readonly="true">
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="招标项目合同总金额" class="row-three" prop="contractReckonPrice">
            <dictionary-comp
              v-model="tenderBatchInfo.regCapitalCurrency" code="regCapitalCurrency" type="select" :readonly="true">
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" v-model.number="tenderBatchInfo.contractPrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="tenderBatchInfo.contractMoneyUnit" code="moneyUnit" type="select" :readonly="true">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row" label="招标内容与范围及招标方案说明" prop="tenderContent">
            <el-input maxlength="100" class="one-row" type="textarea" v-model="tenderBatchInfo.tenderContent" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="工作任务计划" prop="workPlan">
            <el-input class="one-row" type="textarea" v-model="tenderBatchInfo.workPlan" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="项目团队成员组成与职责分工" prop="responsibilityDivision">
            <el-input class="one-row" type="textarea" v-model="tenderBatchInfo.responsibilityDivision" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row el-form-item-title" label="标段信息">
          </el-form-item>
          <el-form-item class="one-row" label="">
            <el-table :data="sectionList" width="100%">
              <el-table-column type="index" align="center" label="序号"></el-table-column>
              <el-table-column label="标段名称" prop="name" min-width="60"></el-table-column>
              <el-table-column label="标段编号" prop="code" min-width="60"></el-table-column>
              <el-table-column label="招标类型" prop="tenderType" min-width="60"></el-table-column>
              <el-table-column label="标段类型" prop="sectionProjectType" min-width="60"></el-table-column>
              <el-table-column label="资格审查方式" prop="reviewWay" min-width="60"></el-table-column>
              <el-table-column label="施工长度(Km)" prop="constructLength" min-width="60"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item class="one-row el-form-item-title" label="招标代理信息">
          </el-form-item>
          <el-form-item class="row-two" label="招标代理机构名称" prop="tenderAgencyName">
            <el-select v-model="tenderBatchInfo.tenderAgencyName" filterable disabled>
              <el-option v-for="item in tenderAgencyNameOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招标项目代理收费金额" class="row-three" prop="agencyPrice">
            <dictionary-comp
              v-model="tenderBatchInfo.regCapitalCurrency" code="regCapitalCurrency" type="select" :readonly="true">
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" v-model.number="tenderBatchInfo.agencyPrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="tenderBatchInfo.agencyMoneyUnit" code="moneyUnit" type="select" :readonly="true">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理权限" prop="agencyPermission">
            <el-input class="one-row" type="textarea" v-model="tenderBatchInfo.agencyPermission" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理内容与范围" prop="agencyContent">
            <el-input class="one-row" type="textarea" v-model="tenderBatchInfo.agencyContent" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理机构项目负责人信息" prop="agencyPrincipal">
            <el-input class="one-row" type="textarea" v-model="tenderBatchInfo.agencyPrincipal" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="danger" @click="handleAccept('0')" v-if="auditStatus === '未接受'">拒 绝</el-button>
        <el-button type="primary" @click="handleAccept('1')" v-if="auditStatus === '未接受'">接 受</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import dictionaryComp from 'src/components/dictionary-component';
import { showProjectInfo, show, showSection, acceptOrReject } from 'src/api/tender/tendermanagement/delegateprojectinformation';
import { findTenderAgency } from 'src/api/tender/tendermanagement/tenderbatchinformation';

export default {
  components: {
    dictionaryComp
  },
  data () {
    return {
      projectInfoData: {},
      tenderBatchInfo: {},
      sectionList: [],
      tenderAgencyNameOptions: [],
      isShow: false,
      agencyId: ''
    };
  },
  props: {
    auditStatus: {
      type: String,
      default: ''
    }
  },
  mixins: [addEditMixin],
  created () {
    this.getTenderAgencyNameOptions();
  },
  watch: {
    isShow: {
      handler (newValue) {
        if (!newValue && this.$refs.ctForm) {
          this.$refs.ctForm.clearValidate();
        }
      }
    }
  },
  methods: {
    /**
     * @description 获取所有招标代理信息
     * @author lizipei
     * @date 2019/11/12
     */
    async getTenderAgencyNameOptions () {
      try {
        const { data } = await findTenderAgency();
        if (data.code === process.env.ERR_OK) {
          this.tenderAgencyNameOptions = data.data;
        }
      } catch (e) {
        console.log(`getTenderAgencyNameOptions-error: ${e}`);
      }
    },
    /**
     * @description 获取表单数据
     * @author lvzhiyuan
     * @date 2019/9/2
     */
    async getFormData (id) {
      this.isShow = true;
      this.agencyId = id;
      try {
        const { data: projectInfo } = await showProjectInfo({ projectInfoId: id });
        const { data: tenderBatchInfo } = await show({ id });
        const { data: sectionInfo } = await showSection({ tenderBatchInfoId: id });
        if (projectInfo.code === process.env.ERR_OK) {
          this.projectInfoData = projectInfo.data;
        }
        if (tenderBatchInfo.code === process.env.ERR_OK) {
          this.tenderBatchInfo = tenderBatchInfo.data;
        }
        if (sectionInfo.code === process.env.ERR_OK) {
          this.sectionList = sectionInfo.data;
        }
      } catch (e) {
        console.log(`getFormData error: ${e}`);
      }
    },
    /**
     * @description 保存
     * @author lizipei
     * @date 2019/11/11
     */
    handleAccept (type) {
      this.$refs.ctForm.validate((valid) => {
        if (valid) {
          this.$confirm(`确定${type === '0' ? '拒绝' : '接受'}此委托?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            try {
              const params = { id: this.agencyId, isAccept: type };
              const { data } = await acceptOrReject(params);
              if (data.code === process.env.ERR_OPERATE_OK) {
                this.isShow = false;
                this.$emit('return', 'refresh');
              }
            } catch (e) {
              console.log(`handleAccept-error: ${e}`);
            }
          });
        }
      });
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
  /deep/ .el-form-item__label {
    line-height: 18px;
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
