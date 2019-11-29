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
          <el-form-item label="企业名称" prop="companyName">
            <el-input v-model="formData.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="企业类型" prop="companyType">
            <dictionary-comp
              v-model="formData.companyType"
              code="companyType"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="国别/地区" prop="companyType">
            <dictionary-comp
              v-model="formData.countryRegion"
              code="countryRegion"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="注册地址" prop="regAddress">
            <dictionary-comp
              v-model="formData.regProvince"
              code="regProvince"
              type="select"
              :readonly="true"
              @changeRow="getRegCity"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <el-select :disabled="true" v-model="formData.regCity" placeholder="请选择">
              <el-option
                v-for="item in regCityList"
                :key="item.displayValue"
                :label="item.displayName"
                :value="item.displayValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="one-row" label="注册地址详情" prop="regAddressDetails">
            <el-input v-model="regAddressDetails" disabled></el-input>
          </el-form-item>
          <el-form-item label="法定代表人姓名" prop="legalPerson">
            <el-input v-model="formData.legalPerson" disabled></el-input>
          </el-form-item>
          <el-form-item label="法定代表人身份证号">
            <el-input v-model="formData.identityCardOfLegalPerson" disabled></el-input>
          </el-form-item>
          <el-form-item label="成立日期">
            <el-input v-model="formData.establishDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="营业执照号">
            <uploader v-model="formData.licenseCode" disabled></uploader>
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            <el-input v-model="formData.socialCreditCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="组织机构代码">
            <el-input v-model="formData.organizationCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="营业执照附件">
            <uploader v-model="formData.attachmentIdOfLicense" disabled></uploader>
          </el-form-item>
          <el-form-item label="企业经济类型">
            <dictionary-comp
              v-model="formData.economicType"
              readonly
            ></dictionary-comp>
          </el-form-item>
          <el-form-item label="企业资质类型">
            <dictionary-comp
              code="companyQualificationType"
              readonly
            ></dictionary-comp>
          </el-form-item>
          <el-form-item label="注册资金" prop="regCapital">
            <el-input v-model="formData.regCapital" disabled></el-input>
          </el-form-item>
          <el-form-item label="行业类型" prop="regCapitalCurrency">
            <dictionary-comp
              code="industryCode"
              v-model="formData.regCapitalCurrency"
              readonly
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="基本帐户开户银行">
            <el-input v-model="formData.bankName" disabled></el-input>
          </el-form-item>
          <el-form-item label="基本开户账户">
            <el-input v-model="formData.bankAccount" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="基本帐户开户许可证明">
            <uploader v-model="formData.attachmentIdOfBankAccountLicense" disabled></uploader>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="linkPerson">
            <el-input v-model="formData.linkPerson" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="linkMobile">
            <el-input v-model="formData.linkMobile" disabled></el-input>
          </el-form-item>
          <el-form-item label="企业电话" prop="telephone">
            <el-input v-model="formData.telephone" disabled></el-input>
          </el-form-item>
          <el-form-item label="企业传真" prop="fax">
            <el-input v-model="formData.fax" disabled></el-input>
          </el-form-item>
          <el-form-item label="企业邮编" prop="postalCode">
            <el-input v-model="formData.postalCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="企业网址" prop="netAddress">
            <el-input v-model="formData.netAddress" disabled></el-input>
          </el-form-item>
          <el-form-item label="通讯地址" prop="address" class="one-row">
            <el-input v-model="formData.address" disabled></el-input>
          </el-form-item>
          <el-form-item label="提交人员:" prop="submitPerson">
            <el-input v-model="formData.submitPerson" disabled></el-input>
          </el-form-item>
          <el-form-item label="提交时间:" prop="submitDate">
            <el-input v-model="formData.submitDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核人员:" prop="auditPerson">
            <el-input v-model="formData.auditPerson" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核时间:" prop="auditDate">
            <el-input v-model="formData.auditDate" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="审核结果:" prop="auditResult" :rules="isShowSave ? [$validate.RequiredChange] : []">
            <dictionary-comp
              v-model="formData.auditResult"
              code="auditResult"
              type="select"
              :is-default="isShowSave"
              :readonly="!isShowSave"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row" label="审核意见:" prop="auditOpinion" :rules="[$validate.Required]" v-if="formData.auditResult === '不通过'">
            <el-input class="one-row" :disabled="!isShowSave" type="textarea" v-model="formData.auditOpinion"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" v-if="status === 'edit'" @click="saveFn">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { edit, save } from 'src/api/company';
import addEditMixin from 'src/mixins/add-edit';
import { getDictionaryValue } from 'src/api/common';
import dictionaryComp from 'src/components/dictionary-component';
import { city } from 'src/api/backstage/dictionary';
import uploader from 'src/components/uploader';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      /* 市区表 */
      regCityList: [],
      countryRegionList: [], // 国家名称信息
      roleByTypeList: [],
      status: '',
      regAddress: '', //
      regAddressDetails: '', //
      formData: {
        auditResult: '',
        auditOpinion: ''
      },
      isShow: true,
      companyId: '' // 企业id,
    };
  },
  mixins: [addEditMixin],
  props: {
    isShowSave: {
      type: Boolean,
      default: false
    },
    node: {
      type: Object
    }
  },
  created () {
    this.dictionaryCountryRegion();
  },
  methods: {
    /**
     * @从数据字典中获取国家列表
     * @author wenruihuan
     * 2019/10/14
     */
    async dictionaryCountryRegion () {
      try {
        const { data } = await getDictionaryValue({ value: 'countryRegion' });
        if (data.code === process.env.ERR_OK) {
          this.countryRegionList = data.data;
        }
      } catch (e) {
        console.log(`backstage-company-dictionaryCountryRegion error: ${e}`);
      }
    },
    /**
     * @description 获取表单数据
     * @author lvzhiyuan
     * @date 2019/9/2
     */
    async getFormData (id, roleByTypeList, status) {
      this.isShow = true;
      try {
        this.companyId = id;
        this.roleByTypeList = roleByTypeList;
        this.status = status;
        const { data } = await edit({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
          this.regAddress = this.formData.regProvince;
          this.regAddressDetails = this.formData.regAddress;
          this.getRegCity({ displayValue: this.formData.regProvince });
        }
      } catch (e) {
        console.log(`backstage-company-getFormData error: ${e}`);
      }
    },
    /**
     * @description 保存表单数据
     * @author lvzhiyuan
     * @date 2019/9/2
     */
    saveFn () {
      try {
        this.$refs.ctForm.validate(async (valid) => {
          if (valid) {
            if (this.formData.auditResult === '不通过') {
              if (!this.formData.auditOpinion) {
                this.$message({
                  type: 'warning',
                  message: '请填写审核意见!'
                });
                return false;
              }
            }
            const params = {
              id: this.companyId,
              auditResult: this.formData.auditResult,
              auditOpinion: this.formData.auditOpinion
            };

            const { data } = await save(params);
            if (data.code === process.env.ERR_OPERATE_OK) {
              setTimeout(() => {
                this.isShow = false;
                this.$parent.getList();
              }, 2000);
            }
          } else {
            return false;
          }
        });
      } catch (e) {
        console.log(`backstage-company-getFormData error: ${e}`);
      }
    },
    /**
     * @description 获取市级信息
     * @author wenruihuan
     * 2019/10/28
     */
    async getRegCity (val) {
      try {
        const { data } = await city({ provinceCode: val.displayValue });
        if (data.code === process.env.ERR_OK) {
          this.regCityList = data.data;
          if (!this.formData.regCity) {
            this.formData.regCity = this.regCityList[0].displayValue;
          }
        }
      } catch (e) {
        console.log(`basicinfo-getRegCity error: ${e}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dialog{
  .el-form-item{
    width: 50%;
    float: left;
  }
  .dialog-footer{
    width: 100%;
    text-align: center;
  }
}
.add-edit-container {
  padding-bottom: 0;
  background-color: white;
  /deep/.el-form-item__content{
    /*width: 100%;*/
  }
  /deep/.el-select{
    width: 100%;
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
