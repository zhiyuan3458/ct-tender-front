<template>
  <div class="Informationbase">
    <div class="info-tips" v-if="params.auditStatus === '待审核'">信息审核中</div>
    <div class="title">企业主要人员信息</div>
    <el-form :model="mainData" ref="ctForm" label-width="200px">
      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="法定代表人" prop="legalPerson">
            <el-input maxlength="100" v-model="mainData.legalPerson" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法定代表人身份证号" prop="identityCardOfLegalPerson">
            <el-input maxlength="18" v-model="mainData.identityCardOfLegalPerson" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="法定代表人职称" prop="titleOfLegalPerson">
            <el-input maxlength="50" v-model="mainData.titleOfLegalPerson" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法定代表人联系电话" prop="telephoneOfLegalPerson">
            <el-input maxlength="50" v-model="mainData.telephoneOfLegalPerson" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="企业负责人" prop="principal">
            <el-input maxlength="100" v-model="mainData.principal" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业负责人身份证号" prop="identityCardOfPrincipal">
            <el-input maxlength="18" v-model="mainData.identityCardOfPrincipal" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="企业负责人职称" prop="titleOfPrincipal">
            <el-input maxlength="50" v-model="mainData.titleOfPrincipal" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业负责人联系电话" prop="telephoneOfPrincipal">
            <el-input maxlength="50" v-model="mainData.telephoneOfPrincipal" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="技术负责人" prop="techDirector">
            <el-input maxlength="100" v-model="mainData.techDirector" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="技术负责人身份证号" prop="identityCardOfTechDirector">
            <el-input maxlength="18" v-model="mainData.identityCardOfTechDirector" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="技术负责人职称" prop="titleOfTechDirector">
            <el-input maxlength="50" v-model="mainData.titleOfTechDirector" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="技术负责人联系电话" prop="telephoneOfTechDirector">
            <el-input maxlength="50" v-model="mainData.telephoneOfTechDirector" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="安全生产负责人" prop="safetyProducer">
            <el-input maxlength="100" v-model="mainData.safetyProducer" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="安全生产负责人身份证号" prop="identityCardOfSafetyProducer">
            <el-input maxlength="18" v-model="mainData.identityCardOfSafetyProducer" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="安全生产负责人职称" prop="titleOfSafetyProducer">
            <el-input maxlength="50" v-model="mainData.titleOfSafetyProducer" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="安全生产负责人联系电话" prop="telephoneOfSafetyProducer">
            <el-input maxlength="50" v-model="mainData.telephoneOfSafetyProducer" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="总经济师" prop="economist">
            <el-input maxlength="100" v-model="mainData.economist" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总经济师身份证号" prop="identityCardOfEconomist">
            <el-input maxlength="18" v-model="mainData.identityCardOfEconomist" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="总经济师职称" prop="titleOfSafetyEconomist">
            <el-input maxlength="50" v-model="mainData.titleOfSafetyEconomist" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总经济师联系电话" prop="telephoneOfEconomist">
            <el-input maxlength="50" v-model="mainData.telephoneOfEconomist" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="title">企业统计人员信息</div>

    <el-form :model="mainData" ref="ctForm" label-width="200px">
      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="总人数" prop="employeeNum">
            <el-input v-model.number="mainData.employeeNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管理人员人数" prop="managerNum">
            <el-input v-model.number="mainData.managerNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="项目经理人数" prop="projectManagerNum">
            <el-input v-model.number="mainData.projectManagerNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目总工人数" prop="projectChiefNum">
            <el-input v-model.number="mainData.projectChiefNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="一级建造师人数" prop="firstConstructorNum">
            <el-input v-model.number="mainData.firstConstructorNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二级建造师人数" prop="secondConstructorNum">
            <el-input v-model.number="mainData.secondConstructorNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="专职安全员人数" prop="securityNum">
            <el-input v-model.number="mainData.securityNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现场管理人员人数" prop="siteManagerNum">
            <el-input v-model.number="mainData.siteManagerNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="监理人员人数" prop="supervisorNum">
            <el-input v-model.number="mainData.supervisorNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="监理工程师人数" prop="superEngineerNum">
            <el-input v-model.number="mainData.superEngineerNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="专业监理工程师人数" prop="profSuperEngineerNum">
            <el-input v-model.number="mainData.profSuperEngineerNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="持证试验检测工程师人数" prop="certifiedInspectEngineerNum">
            <el-input v-model.number="mainData.certifiedInspectEngineerNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="持证试验检测员人数" prop="certifiedInspectorNum">
            <el-input v-model.number="mainData.certifiedInspectorNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高级职称人数" prop="seniorTitleNum">
            <el-input v-model.number="mainData.seniorTitleNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="中级职称人数" prop="middleTitleNum">
            <el-input v-model.number="mainData.middleTitleNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="初级职称人数" prop="juniorTitleNum">
            <el-input v-model.number="mainData.juniorTitleNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="row-bg">
        <el-col :span="12">
          <el-form-item label="技工人数" prop="mechanicNum">
            <el-input v-model.number="mainData.mechanicNum" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <bottom-tool-bar
      v-if="params.auditStatus !== '待审核'"
      @save="saveFn"
      @return="returnFn"
      @edit="editFn"
      :isShowSave="!disabled"
      :isShowEdit="disabled"
      :is-show-return="!disabled"
    ></bottom-tool-bar>
  </div>
</template>

<script>
// 投标人信息
import bottomToolBar from 'src/components/bottom-tool-bar/index';
import { edit, save } from 'src/api/tender/bidderinformation/personnelinformation';
export default {
  name: 'bidderinformation',
  props: {
    params: {
      auditStatus: ''
    }
  },
  data () {
    return {
      mainData: {},
      disabled: true
    };
  },
  components: {
    bottomToolBar
  },
  created () {
    this.companystaff();
  },
  methods: {
    /**
     * @获取人员基本信息
     * @author wenruihuan
     * 2019/10/25
     */
    async companystaff () {
      try {
        const { data } = await edit();
        if (data.code === process.env.ERR_OK) {
          this.mainData = data.data;
        }
      } catch (e) {
        console.log(`bidderinformation-personnelinformation-getCompanyinfo error: ${e}`);
      }
    },

    /**
     * @保存企业基本信息接口
     * @author wenruihuan
     * 2019/10/28
     */
    saveFn () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const params = { ...this.mainData };
            const { data } = await save(params);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.disabled = true;
            }
          } catch (e) {
            ;
          }
        }
      });
    },
    /**
     * @取消编辑，返回不可选中状态
     * @author wenruihuan
     * 2019/10/28
     */
    returnFn () {
      this.disabled = true;
    },
    /**
     * @进入编辑状态
     * @author wenruihuan
     * 2019/10/28
     */
    editFn () {
      this.disabled = false;
    }
  }
};
</script>
