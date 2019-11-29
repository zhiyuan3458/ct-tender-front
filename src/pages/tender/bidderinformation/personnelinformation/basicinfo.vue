<template>
  <div class="bidderinformation">
    <div class="table">
      <el-form :model="formData" ref="ctForm" label-width="200px">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" :rules="[$validate.Required]">
              <el-input maxlength="100" v-model="formData.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" :rules="[$validate.Required]">
              <dictionary-comp
                code="sex"
                v-model="formData.sex"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="身份证号码" prop="identityCode" :rules="[$validate.Required]">
              <el-input maxlength="18" v-model="formData.identityCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :rules="[$validate.Required]" label="出生日期" prop="birthDate">
              <el-date-picker
                :disabled="disabled"
                :rules="[$validate.Required]"
                v-model="formData.birthDate"
                type="date"
                placeholder="出生日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="职务" prop="position">
              <el-input maxlength="50" v-model="formData.position" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否在职" prop="isWork">
              <dictionary-comp
                code="yesNo"
                v-model="formData.isWork"
                :readonly="disabled"
              ></dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="技术职称" prop="techTitle">
              <el-input maxlength="50" v-model="formData.techTitle" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="从事本专业起始日期" prop="startWorkDate" :rules="[$validate.Required]">
              <el-date-picker
                :rules="[$validate.Required]"
                :disabled="disabled"
                v-model="formData.startWorkDate"
                type="date"
                placeholder="从事本专业起始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="从业年限" prop="workYears" :rules="[$validate.Required]">
              <el-input maxlength="2" v-model.number="formData.workYears" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="row-two">
            <el-form-item label="所在行政区" prop="regAddress">
              <dictionary-comp
                v-model="formData.administrativeRegionProvince"
                code="regProvince"
                type="select"
                :readonly="disabled"
                @change="getRegCity"
              >
              </dictionary-comp>
              <span class="clearance"></span>
              <el-select :disabled="disabled" v-model="formData.administrativeRegion" placeholder="请选择">
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
        <el-row type="flex" class="row-bg">
          <el-col>
            <el-form-item label="从业经历" prop="workExperience" :rules="[$validate.Required]">
              <el-input maxlength="100" v-model="formData.workExperience" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="telephone" :rules="[$validate.Required]">
              <el-input maxlength="50" v-model="formData.telephone" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮政编码" prop="postalCode" :rules="[$validate.Required]">
              <el-input maxlength="6" v-model="formData.postalCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="通讯地址" prop="address">
              <el-input maxlength="50" v-model="formData.address" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="第一学历" prop="firstDegree">
              <dictionary-comp
                v-model="formData.firstDegree"
                code="degree"
                type="select"
                :readonly="disabled"
              >
              </dictionary-comp>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="第一学历所学专业" prop="specialtyOfFirstDegree" :rules="[$validate.Required]">
              <el-input maxlength="30" v-model="formData.specialtyOfFirstDegree" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第一学历毕业时间" prop="graduateDateOfFirstDegree" :rules="[$validate.Required]">
              <el-date-picker
                :rules="[$validate.Required]"
                :disabled="disabled"
                v-model="formData.graduateDateOfFirstDegree"
                type="date"
                placeholder="第一学历毕业时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="最高学历" prop="highestDegree" :rules="[$validate.Required]">
              <el-input maxlength="50" v-model="formData.highestDegree" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最高学历毕业院校" prop="graduateSchoolOfHighestDegree" :rules="[$validate.Required]">
              <el-input maxlength="100" v-model="formData.graduateSchoolOfHighestDegree" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <el-col :span="12">
            <el-form-item label="最高学历所学专业" prop="specialtyOfHighestDegree" :rules="[$validate.Required]">
              <el-input maxlength="30" v-model="formData.specialtyOfHighestDegree" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最高学历毕业时间" prop="graduateDateOfHighestDegree" :rules="[$validate.Required]">
              <el-date-picker
                :rules="[$validate.Required]"
                :disabled="disabled"
                v-model="formData.graduateDateOfHighestDegree"
                type="date"
                placeholder="最高学历毕业时间">
              </el-date-picker>
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
      :isShowEdit="false"
      :isShowSubmit="!disabled"
    ></bottom-tool-bar>
  </div>

<!--  v-if="formData.auditStatus !== '待审核'"-->
</template>

<script>
// 投标人信息
import { basicinfoEdit, basicinfoSave, basicinfoSubmit } from 'src/api/tender/personnelinformation';
import dictionaryComp from 'src/components/dictionary-component/index';
import bottomToolBar from 'src/components/bottom-tool-bar/index';
import { city } from 'src/api/backstage/dictionary';
export default {
  name: 'bidderinformation',
  data () {
    return {
      formData: {},
      industryCode: '建筑业',
      disabled: false,
      regCityList: [], // 市级列表
      rules: {
        organizationCode: [
          { required: true, message: '请输入10位组织机构代码', trigger: 'blur' },
          { min: 10, max: 10, message: '请输入10位组织机构代码', trigger: 'blur' }
        ]
      }
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
        const { data } = await basicinfoEdit({ id: this.params.personnelId });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
          const res = await city({ provinceCode: this.formData.administrativeRegionProvince });
          const data1 = res.data;
          if (data1.code === process.env.ERR_OK) {
            this.regCityList = data1.data;
          }
        }
      } catch (e) {
        console.log(`bidderinformation-personnelinformation-basicinfo-getCompanyInfo error: ${e}`);
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
            const params = { ...this.formData, personnelId: this.params.personnelId };
            const { data } = await basicinfoSave(params);
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
     * @description 获取市级信息
     * @author wenruihuan
     * 2019/10/28
     */
    async getRegCity (provinceCode) {
      try {
        const { data } = await city({ provinceCode });
        if (data.code === process.env.ERR_OK) {
          this.regCityList = data.data;
          this.formData.administrativeRegion = this.regCityList[0].displayValue;
        }
      } catch (e) {
        console.log(`tender-bidderinformation-personnelinformation-basicinfo-getRegCity error: ${e}`);
      }
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
            // this.formData.personnelId = this.params.personnelId;
            const params = { ...this.formData, personnelId: this.params.personnelId };
            const { data } = await basicinfoSubmit(params);
            if (data.code === process.env.ERR_OK) {
              this.disabled = true;
            }
          } catch (e) {
            console.log(`src/pages/tender/bidderinformation/personnelinformation/basicinfo-submitFn error: ${e}`);
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
