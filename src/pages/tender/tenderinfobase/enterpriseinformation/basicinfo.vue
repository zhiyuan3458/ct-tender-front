<template>
  <div class="bidderinformation">
    <div class="info-tips" v-if="formData.auditStatus === '待审核'">信息审核中</div>
    <div v-if="formData.companyCategory === '事业单位'"  class="table">
      <el-form :model="formData" ref="ctForm" label-width="200px">
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位名称:" prop="auditName" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.auditName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位编号:" prop="code" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.code" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="12">
            <el-form-item label="国别/地区:" prop="companyType" :rules="isRequired ? [$validate.Required] : ''">
              <dictionary-comp
                v-model="formData.countryRegion"
                code="countryRegion"
                type="select"
                :readonly="disabled"
              >
              </dictionary-comp>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="row-two">
            <el-form-item label="注册地址:" prop="regAddress" :rules="isRequired ? [$validate.Required] : ''">
              <dictionary-comp
                v-model="formData.regProvince"
                code="regProvince"
                type="select"
                :readonly="disabled"
                @change="getRegCity"
              >
              </dictionary-comp>
              <span class="clearance"></span>
              <el-select :disabled="disabled" v-model="formData.regCity" placeholder="请选择">
                <el-option
                  v-for="item in regCityList"
                  :key="item.displayValue"
                  :readonly="disabled"
                  :label="item.displayName"
                  :value="item.displayValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col>
            <el-form-item label="注册地址详情:" prop="regAddress" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.regAddress" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="12">
            <el-form-item label="法定代表人姓名:" prop="legalPerson" :rules="isRequired ? [$validate.Required] : ''">
              <el-input v-model="formData.legalPerson" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位资质类型:" :rules="isRequired ? [$validate.Required] : ''">
              <dictionary-comp
                code="companyQualificationType"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col>
            <el-form-item label="备注:" prop="memo">
              <el-input maxlength="1000" type="textarea" v-model="formData.memo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div v-else class="table">
      <el-form :model="formData" ref="ctForm" label-width="200px">
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业名称:" prop="auditName" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.auditName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业曾用名:" prop="beforeName">
              <el-input maxlength="100" v-model="formData.beforeName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业编号:" prop="code" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.code" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业简称:" prop="shortName">
              <el-input maxlength="20" v-model="formData.shortName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="12">
            <el-form-item label="国别/地区:" prop="companyType" :rules="isRequired ? [$validate.Required] : ''">
              <dictionary-comp
                v-model="formData.countryRegion"
                code="countryRegion"
                type="select"
                :readonly="disabled"
              >
              </dictionary-comp>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="row-two">
            <el-form-item label="注册地址:" prop="regAddress">
              <dictionary-comp
                v-model="formData.regProvince"
                code="regProvince"
                type="select"
                :readonly="disabled"
                @change="getRegCity"
              >
              </dictionary-comp>
              <span class="clearance"></span>
              <el-select :disabled="disabled" v-model="formData.regCity" placeholder="请选择">
                <el-option
                  v-for="item in regCityList"
                  :key="item.displayValue"
                  :readonly="disabled"
                  :label="item.displayName"
                  :value="item.displayValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col>
            <el-form-item label="注册地址详情:" prop="regAddress" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.regAddress" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="12">
            <el-form-item label="法定代表人姓名:" prop="legalPerson" :rules="isRequired ? [$validate.Required] : ''">
              <el-input v-model="formData.legalPerson" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人身份证号:" prop="identityCardOfLegalPerson" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="18" v-model="formData.identityCardOfLegalPerson" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col>
            <el-form-item label="证件类型:" prop="certificateType" :rules="isRequired ? [$validate.Required] : ''">
              <dictionary-comp
                type="radio"
                v-model="formData.certificateType"
                code="certificateType"
                :readonly="disabled"
              >
              </dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg" v-if="formData.certificateType === '1'">
          <el-col :span="12">
            <el-form-item label="统一社会信用代码:" prop="socialCreditCode" :rules="isRequired ? [$validate.Required, $validate.MaxEighteenth] : ''">
              <el-input maxlength="18" v-model="formData.socialCreditCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码证扫描件:" prop="attachmentIdOfSocialCredit" :rules="isRequired ? [$validate.RequiredChange] : ''">
              <uploader v-model="formData.attachmentIdOfSocialCredit" :disabled="disabled" :is-validate="!disabled"></uploader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg" v-if="formData.certificateType === '0'">
          <el-col :span="12">
            <el-form-item label="组织机构代码:" prop="organizationCode">
              <el-input v-model="formData.organizationCode" :disabled="disabled" :rules="isRequired ? [$validate.Required] : ''"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织机构代码证扫描件:" prop="attachmentIdOfOrganization" :rules="isRequired ? [$validate.RequiredChange] : ''">
              <uploader v-model="formData.attachmentIdOfOrganization" :disabled="disabled" :is-validate="!disabled"></uploader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg" v-if="formData.certificateType === '0'">
          <el-col :span="12">
            <el-form-item label="营业执照号:" prop="licenseCode" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="50" v-model="formData.licenseCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照附件:" prop="attachmentIdOfLicense" :rules="isRequired ? [$validate.RequiredChange] : ''">
              <uploader v-model="formData.attachmentIdOfLicense" :disabled="disabled" :is-validate="!disabled"></uploader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg" v-if="formData.certificateType === '0'">
          <el-col :span="12">
            <el-form-item label="税务登记号:" prop="taxRegCertificateCode" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="50" v-model="formData.taxRegCertificateCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税务登记证扫描件:" prop="attachmentIdOfTaxRegCertificate" :rules="isRequired ? [$validate.RequiredChange] : ''">
              <uploader v-model="formData.attachmentIdOfTaxRegCertificate" :disabled="disabled" :is-validate="!disabled"></uploader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="安全生产许可证编号:" prop="safetyCertificateCode">
              <el-input maxlength="50" v-model="formData.safetyCertificateCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全生产许可证扫描件:" prop="attachmentIdOfSafetyCertificate">
              <uploader v-model="formData.attachmentIdOfSafetyCertificate" :disabled="disabled"></uploader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="社保登记证编号:" prop="socialSecurityCode">
              <el-input maxlength="50" v-model="formData.socialSecurityCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="社保登记证扫描件:" prop="attachmentIdOfSocialSecurity">
              <uploader v-model="formData.attachmentIdOfSocialSecurity" :disabled="disabled"></uploader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="成立日期:" prop="establishDate" :rules="isRequired ? [$validate.Required] : ''">
              <el-date-picker
                :rules="isRequired ? [$validate.Required] : ''"
                :disabled="disabled"
                v-model="formData.establishDate"
                type="date"
                placeholder="成立日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="row-two">
            <el-form-item label="行业类型" prop="industryCode" :rules="isRequired ? [$validate.Required] : ''">
              <el-select v-model="industryCode" disabled>
              </el-select>
              <span class="clearance"></span>
              <dictionary-comp
                code="industryCode"
                v-model="formData.industryCode"
                :readonly="disabled"
              >
              </dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="企业经济类型:" :rules="isRequired ? [$validate.Required] : ''">
              <dictionary-comp
                code="companyEconomicType"
                v-model="formData.companyEconomicType"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业资质类型:" :rules="isRequired ? [$validate.Required] : ''">
              <dictionary-comp
                code="companyQualificationType"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12" class="row-three">
            <el-form-item label="注册资金:" prop="regCapital">
              <dictionary-comp
                v-model="formData.regCapitalCurrency"
                code="regCapitalCurrency"
                type="select"
                :readonly="disabled"
                @changeRow="getRegCapitalCurrency"
              >
              </dictionary-comp>
              <span class="clearance"></span>
              <el-input maxlength="20" type="number" v-model="formData.regCapital" :disabled="disabled"></el-input>
              <span class="clearance"></span>
              <dictionary-comp
                v-model="formData.regCapitalUnit"
                @changeRow="getMoneyUnit"
                code="moneyUnit"
                type="select"
                :readonly="disabled"
              >
              </dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="基本帐户开户银行:" prop="bankName" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.bankName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基本开户账户:" prop="bankAccount" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="50" v-model="formData.bankAccount" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col>
            <el-form-item label="基本帐户开户许可证明" prop="attachmentIdOfBankAccountLicense" :rules="isRequired ? [$validate.RequiredChange] : ''">
              <uploader v-model="formData.attachmentIdOfBankAccountLicense" :disabled="disabled" :is-validate="!disabled"></uploader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="联系人姓名:" prop="linkPerson" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.linkPerson" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话:" prop="linkMobile" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="50" v-model="formData.linkMobile" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="企业电话:" prop="telephone" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="50" v-model="formData.telephone" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业传真:" prop="fax">
              <el-input maxlength="20" v-model="formData.fax" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="企业邮编:" prop="postalCode" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="6" v-model="formData.postalCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业邮箱" prop="email" :rules="isRequired ? [$validate.Required, $validate.Email] : ''">
              <el-input maxlength="100" v-model="formData.email" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col>
            <el-form-item label="通讯地址:" prop="address" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="100" v-model="formData.address" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="开票抬头:" prop="billingUp">
              <el-input maxlength="100" v-model="formData.billingUp" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="taxpayerIdentificationCode">
              <el-input maxlength="18" v-model="formData.taxpayerIdentificationCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="开票电话:" prop="billingPhone">
              <el-input maxlength="50" v-model="formData.billingPhone" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票地址" prop="billingAddress">
              <el-input maxlength="100" v-model="formData.billingAddress" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="开票户行:" prop="billingBankName">
              <el-input maxlength="100" v-model="formData.billingBankName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票户行账号" prop="billingBankAccount">
              <el-input maxlength="100" v-model="formData.billingBankAccount" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col>
            <el-form-item label="经营范围:" prop="businessScope" :rules="isRequired ? [$validate.Required] : ''">
              <el-input maxlength="1000" type="textarea" v-model="formData.businessScope" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col>
            <el-form-item label="资产构成情况及投资关联企业情况:" prop="relatedCompanyInfo">
              <el-input maxlength="1000" type="textarea" v-model="formData.relatedCompanyInfo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col>
            <el-form-item label="备注:" prop="memo">
              <el-input maxlength="1000" type="textarea" v-model="formData.memo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <bottom-tool-bar
      @save="saveFn"
      v-if="formData.auditStatus !== '待审核' && !isJump"
      @return="returnFn"
      @submit="submitFn"
      @edit="editFn"
      :isShowSave="!disabled"
      :isShowEdit="disabled"
      :isShowSubmit="disabled"
      :is-show-return="!disabled"
    ></bottom-tool-bar>
  </div>
</template>

<script>
// 投标代理信息库
import { edit, save, submit } from 'src/api/tender/bidderinformation/basicinfo';
import { show } from 'src/api/tender/tenderagencyinfobase';
import { city } from 'src/api/backstage/dictionary';
import dictionaryComp from 'src/components/dictionary-component/index';
import bottomToolBar from 'src/components/bottom-tool-bar/index';
import uploader from 'src/components/uploader/index';
export default {
  name: 'tenderagencyinfobase',
  data () {
    return {
      industryCode: '建筑业',
      formData: {},
      disabled: true,
      regCityList: []
    };
  },
  components: {
    bottomToolBar,
    dictionaryComp,
    uploader
  },
  props: {
    // 判断是否从历史页面跳转过来
    isJump: {
      type: Boolean,
      default: false
    },
    // 是否显示小红星和编辑操作栏
    isRequired: {
      type: Boolean,
      default: true
    },
    // 历史id
    historyId: {
      type: String,
      default: ''
    }
  },
  watch: {
    historyId: {
      handler (value) {
        this.getHistoryInfo();
      }
    }
  },
  created () {
    if (this.isRequired) {
      this.getCompanyInfo();
    } else {
      this.getHistoryInfo();
    }
  },
  methods: {
    /**
     * @description 获取市级信息
     * @author wenruihuan
     * 2019/10/28
     */
    async getRegCity (provinceCode) {
      try {
        const { data } = await city({ provinceCode });
        if (data.code === process.env.ERR_OK) {
          this.regCityList = data.data;
          this.formData.regCity = this.regCityList[0].displayValue;
        }
      } catch (e) {
        console.log(`tender-tenderinfobase-enterpriseinformation-basicinfo-getRegCity error: ${e}`);
      }
    },
    /**
     * @description 获取公司基本信息
     * @author wenruihuan
     * 2019/10/25
     */
    async getCompanyInfo () {
      try {
        const { data } = await edit();
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
          this.$emit('setAuditStatus', data.data.auditStatus);
          const res = await city({ provinceCode: this.formData.regProvince });
          const data1 = res.data;
          if (data1.code === process.env.ERR_OK) {
            this.regCityList = data1.data;
          }
        }
      } catch (e) {
        console.log(`tender-tenderinfobase-enterpriseinformation-basicinfo-getCompanyinfo error: ${e}`);
      }
    },
    /**
     * @description 获取历史信息
     * @author lizipei
     * @date 2019/10/28
     */
    async getHistoryInfo () {
      try {
        const { data } = await show({ id: this.historyId });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
          this.formData.auditName = this.formData.name;
        }
      } catch (e) {
        console.log(`tender-tenderinfobase-enterpriseinformation-basicinfo-getHistoryInfo error: ${e}`);
      }
    },
    /**
     * @description 保存企业基本信息接口
     * @author wenruihuan
     * 2019/10/28
     */
    saveFn () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const params = { ...this.formData };
            const { data } = await save(params);
            if (data.code === process.env.ERR_OK) {
              this.disabled = true;
            }
          } catch (e) {
            console.log(`tender-tenderinfobase-enterpriseinformation-basicinfo-saveFn error: ${e}`);
          }
        } else {
          return false;
        }
      });
    },
    /**
     * @description 取消编辑，返回不可选中状态
     * @author wenruihuan
     * 2019/10/28
     */
    returnFn () {
      this.disabled = true;
      this.clearValidate();
    },
    /**
     * @提交数据，与保存不一样，保存类似于保存草稿
     * @author wenruihuan
     * 2019/10/28
     */
    submitFn () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const params = { ...this.formData };
            const { data } = await submit(params);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.disabled = true;
              this.getCompanyInfo();
            }
          } catch (e) {
            console.log(`tender-tenderinfobase-enterpriseinformation-basicinfo-submitFn error: ${e}`);
          }
        } else {
          this.clearValidate();
          this.$message.warning('数据不完整，请重新编辑!');
          return false;
        }
      });
    },
    /**
     * @description 进入编辑状态
     * @author wenruihuan
     * 2019/10/28
     */
    editFn () {
      this.disabled = false;
      this.clearValidate();
    },
    /**
     * @description 进入编辑页时清除上传组件的验证
     * @author lvzhiyuan
     * @date 2019/11/8
     */
    clearValidate () {
      this.$nextTick(() => {
        this.$refs.ctForm.clearValidate();
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .bidderinformation{
    margin-bottom: 20px;
    .info-tips{
      text-align: center;
      line-height: 35px;
      color: red;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .clearance{
      display: block;
      margin: 0 2px;
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
  }
</style>
