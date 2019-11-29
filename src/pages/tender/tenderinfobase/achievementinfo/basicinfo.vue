<template>
  <div class="bidderinformation">
    <div class="table">
      <el-form :model="formData" ref="ctForm" label-width="200px">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName"  :rules="[$validate.Required]">
              <el-input maxlength="200" v-model="formData.projectName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目编号" prop="projectCode"  :rules="[$validate.Required]">
              <el-input maxlength="16" v-model="formData.projectCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="项目所在行政区">
              <dictionary-comp
                code="province"
                v-model="formData.administrativeRegion"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类型">
              <dictionary-comp
                code="projectType"
                v-model="formData.projectType"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="项目建设性质">
              <dictionary-comp
                code="constructionNature"
                v-model="formData.constructionNature"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="技术等级">
              <dictionary-comp
                code="techLevel"
                v-model="formData.techLevel"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="承包类型">
              <dictionary-comp
                code="contractType"
                v-model="formData.contractType"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目建设单位" prop="constructionDept">
              <el-input maxlength="100" v-model="formData.constructionDept" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="标段名称" prop="sectionName">
              <el-input maxlength="200" v-model="formData.sectionName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标段编号" prop="sectionCode">
              <el-input maxlength="30" v-model="formData.sectionCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="标段类型">
              <dictionary-comp
                code="sectionType"
                v-model="formData.sectionType"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="row-three">
            <el-form-item label="注册资金" prop="regCapital">
              <dictionary-comp
                v-model="formData.regCapitalCurrency"
                code="regCapitalCurrency"
                type="select"
                :readonly="disabled"
              >
              </dictionary-comp>
              <span class="clearance"></span>
              <el-input maxlength="20" type="number" v-model="formData.contractPrice" :disabled="disabled"></el-input>
              <span class="clearance"></span>
              <dictionary-comp
                v-model="formData.contractMoneyUnit"
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
            <el-form-item label="标段开始桩号" prop="startPileNo">
              <el-input maxlength="50" v-model="formData.startPileNo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标段结束桩号" prop="endPileNo">
              <el-input maxlength="50" v-model="formData.endPileNo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="开工日期" prop="startDate">
              <el-date-picker
                :disabled="disabled"
                v-model="formData.startDate"
                type="date"
                placeholder="开工日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交工日期" prop="acceptanceDate">
              <el-date-picker
                :disabled="disabled"
                v-model="formData.acceptanceDate"
                type="date"
                placeholder="交工日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="竣工日期" prop="endDate">
              <el-date-picker
                :disabled="disabled"
                v-model="formData.endDate"
                type="date"
                placeholder="竣工日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中标通知书日期" prop="bidNoticeDate">
              <el-date-picker
                :disabled="disabled"
                v-model="formData.bidNoticeDate"
                type="date"
                placeholder="中标通知书日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12" class="row-two">
            <el-form-item label="所在行政区" prop="endQuality">
              <dictionary-comp
                v-model="formData.endQuality"
                code="endQuality"
                type="select"
                :readonly="disabled"
              >
              </dictionary-comp>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="交工验收得分" prop="acceptanceScore">
              <el-input maxlength="10" v-model.number="formData.acceptanceScore" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <bottom-tool-bar
      @save="saveFn"
      @return="returnFn"
      @submit="submitFn"
      :isShowSave="!disabled"
      :isShowSubmit="!disabled"
    ></bottom-tool-bar>
  </div>

<!--  v-if="formData.auditStatus !== '待审核'"-->
</template>

<script>
// 投标人信息
import { achievementinfoSave, achievementinfoEdit, achievementinfoSubmit } from 'src/api/tender/bidderinformation/achievementinfo';
import dictionaryComp from 'src/components/dictionary-component/index';
import bottomToolBar from 'src/components/bottom-tool-bar/index';
export default {
  name: 'bidderinformation',
  data () {
    return {
      formData: {},
      disabled: false
    };
  },
  props: {
    params: {}
  },
  components: {
    bottomToolBar,
    dictionaryComp
  },
  created () {
    this.disabled = this.params.operation;
    if (this.params.personnelId) {
      this.getCompanyInfo();
    }
  },
  methods: {
    /**
       * @编辑单个人员信息
     * @author wenruihuan
       * 2019/10/25
       */
    async getCompanyInfo () {
      try {
        const { data } = await achievementinfoEdit({ id: this.params.personnelId });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`bidderinformation-achievementinfo-getCompanyInfo error: ${e}`);
      }
    },
    /**
     * @保存其他业绩基本信息
     * @author wenruihuan
     * 2019/11/08
     */
    saveFn () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const params = { ...this.formData, personnelId: this.params.personnelId };
            const { data } = await achievementinfoSave(params);
            if (data.code === process.env.ERR_OK) {
              this.disabled = true;
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          return false;
        }
      });
    },
    /**
     * @返回列表页
     * @author wenruihuan
     * 2019/10/28
     */
    returnFn () {
      this.$router.go(-1);
    },
    /**
     * @提交数据，与保存不一样，保存类似于保存草稿
     * @author wenruihuan
     * 2019/10/28
     */
    async submitFn () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const params = { ...this.formData, personnelId: this.params.personnelId };
            const { data } = await achievementinfoSubmit(params);
            if (data.code === process.env.ERR_OK) {
              this.disabled = true;
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .bidderinformation{
    margin-bottom: 50px;
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
