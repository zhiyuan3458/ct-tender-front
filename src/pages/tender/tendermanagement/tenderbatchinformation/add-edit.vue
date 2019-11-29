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
          <el-form-item class="one-row el-form-item-title" label="招标项目信息"></el-form-item>
          <el-form-item class="one-row" label="项目名称" prop="projectName" :rules="[$validate.RequiredChange]">
            <el-select v-model="formData.projectName" filterable :disabled="showType === 'view'">
              <el-option v-for="item in projectNameOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招标项目名称" prop="name" :rules="[$validate.Required]">
            <el-input maxlength="200" v-model="formData.name" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="招标项目编号" prop="code">
            <span>{{ formData.code }}</span>
          </el-form-item>
          <el-form-item class="row-two" label="招标方式" prop="tenderWay" :rules="[$validate.RequiredChange]">
            <dictionary-comp
              v-model="formData.tenderWay" code="tenderWay" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="招标组织形式" prop="tenderOrganizeForm" :rules="[$validate.RequiredChange]">
            <dictionary-comp
              v-model="formData.tenderOrganizeForm" code="tenderOrganizeForm" type="select" :readonly="showType === 'view'" @change="handleChangeTenderOrganizeForm">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="资格审查方式" prop="qualificationReviewWay" :rules="[$validate.RequiredChange]">
            <dictionary-comp
              v-model="formData.qualificationReviewWay" code="qualificationReviewWay" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="评标委员会选择中标人方式" prop="bidderChooseWay">
            <dictionary-comp
              v-model="formData.bidderChooseWay" code="bidderChooseWay" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row contract-price" label="招标项目合同总金额" prop="contractPrice">
            <dictionary-comp class="contract-price-select"
                             v-model="formData.regCapitalCurrency" code="regCapitalCurrency" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" class="contract-price-item" v-model.number="formData.contractPrice" :disabled="showType === 'view'"></el-input>
            <span class="clearance"></span>
            <dictionary-comp class="contract-price-select"
                             v-model="formData.contractMoneyUnit" code="moneyUnit" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="监督部门名称" prop="superviserName">
            <el-input v-model="formData.superviserName" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="监督部门组织机构代码" prop="superviserOrganizationCode">
            <el-input maxlength="9" v-model="formData.superviserOrganizationCode" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="审核部门名称" prop="approverName">
            <el-input maxlength="100" v-model="formData.approverName" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="审核部门组织机构代码" prop="approverOrganizationCode">
            <el-input maxlength="9" v-model="formData.approverOrganizationCode" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标内容与范围及招标方案说明" prop="tenderContent">
            <el-input maxlength="100" class="one-row" type="textarea" v-model="formData.tenderContent" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="工作任务计划" prop="workPlan">
            <el-input class="one-row" type="textarea" v-model="formData.workPlan" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="项目团队成员组成与职责分工" prop="responsibilityDivision">
            <el-input class="one-row" type="textarea" v-model="formData.responsibilityDivision" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="相关附件">
            <uploader v-model="formData.attachmentId" :disabled="showType === 'view'"></uploader>
          </el-form-item>
          <!-- 招标组织形式选择是委托代理时隐藏 -->
          <el-form-item class="one-row el-form-item-title" label="招标代理信息" v-if="formData.tenderOrganizeForm === '2'"></el-form-item>
          <el-form-item class="row-two" label="招标代理机构名称" prop="tenderAgencyName" v-if="formData.tenderOrganizeForm === '2'">
            <el-select v-model="formData.tenderAgencyName" filterable :disabled="showType === 'view'">
              <el-option v-for="item in tenderAgencyNameOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="row-three" label="招标项目代理收费金额" prop="agencyPrice" v-if="formData.tenderOrganizeForm === '2'">
            <dictionary-comp
              v-model="formData.regCapitalCurrency" code="regCapitalCurrency" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" v-model.number="formData.agencyPrice" :disabled="showType === 'view'"></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.agencyMoneyUnit" code="moneyUnit" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理权限" prop="agencyPermission" v-if="formData.tenderOrganizeForm === '2'">
            <el-input class="one-row" type="textarea" v-model="formData.agencyPermission" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理内容与范围" prop="agencyContent" v-if="formData.tenderOrganizeForm === '2'">
            <el-input class="one-row" type="textarea" v-model="formData.agencyContent" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理机构项目负责人信息" prop="agencyPrincipal" v-if="formData.tenderOrganizeForm === '2'">
            <el-input class="one-row" type="textarea" v-model="formData.agencyPrincipal" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="招标代理机构意见" prop="accpetStatus" v-if="formData.tenderOrganizeForm === '2'">
            <el-input class="one-row" type="textarea" v-model="formData.accpetStatus" :disabled="showType === 'view'"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSave" v-if="showType !== 'view'">保 存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import { tenderEdit, findAll, save, findTenderAgency } from 'src/api/tender/tendermanagement/tenderbatchinformation';
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader/index';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      projectNameOptions: [],
      tenderAgencyNameOptions: [],
      formData: {},
      isShow: false
    };
  },
  props: {
    /* 显示类型 */
    showType: {
      type: String
    }
  },
  mixins: [addEditMixin],
  created () {
    this.getProjectNameOptions();
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
     * @description 选择招标组织形式时触发
     * @author lizipei
     * @date 2019/11/13
     */
    handleChangeTenderOrganizeForm () {
      if (this.formData.tenderOrganizeForm !== '2') {
        this.$set(this.formData, 'tenderAgencyName', '');
        this.$set(this.formData, 'agencyPrice', '');
        this.$set(this.formData, 'agencyMoneyUnit', '');
        this.$set(this.formData, 'agencyPermission', '');
        this.$set(this.formData, 'agencyContent', '');
        this.$set(this.formData, 'agencyPrincipal', '');
        this.$set(this.formData, 'accpetStatus', '');
      }
    },
    /**
     * @description 获取所有项目名称信息
     * @author lizipei
     * @date 2019/11/12
     */
    async getProjectNameOptions () {
      try {
        const { data } = await findAll();
        if (data.code === process.env.ERR_OK) {
          this.projectNameOptions = data.data;
        }
      } catch (e) {
        console.log(`getProjectNameOptions-error: ${e}`);
      }
    },
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
      try {
        const { data } = await tenderEdit({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`getFormData-error: ${e}`);
      }
    },
    /**
     * @description 保存
     * @author lizipei
     * @date 2019/11/11
     */
    handleSave () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await save(this.formData);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.isShow = false;
              this.$emit('return', 'refresh');
            }
          } catch (e) {
            console.log(`handleSave-error: ${e}`);
          }
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
    .contract-price {
      /deep/ .el-form-item__content {
        display: flex;
        .contract-price-item {
          width: 12.8%;
        }
        .contract-price-select {
          width: 12.6% !important;
        }
      }
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
