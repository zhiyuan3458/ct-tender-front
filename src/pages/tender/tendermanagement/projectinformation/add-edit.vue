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
          <el-form-item label="项目名称" prop="name" :rules="[$validate.Required]">
            <el-input maxlength="200" v-model="formData.name" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="项目编号" prop="code">
            <span>{{ formData.code }}</span>
          </el-form-item>
          <el-form-item class="row-two" label="项目所在行政区域" prop="administrativeRegionProvince" :rules="[$validate.RequiredChange]">
            <dictionary-comp
              v-model="formData.administrativeRegionProvince" code="province" type="select" :readonly="showType === 'view'" @change="handleChangeProvince">
            </dictionary-comp>
            <span class="clearance"></span>
<!--            <dictionary-comp-->
<!--              v-model="formData.administrativeRegion" code="city" type="select" :readonly="showType === 'view'">-->
<!--            </dictionary-comp>-->
            <el-select v-model="formData.administrativeRegion">
              <el-option
                v-for="item in cityOptions" :key="item.id" :label="item.displayName" :value="item.displayValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="row-two" label="项目行业分类" prop="industryCode" :rules="[$validate.RequiredChange]">
              <el-select :value="`建筑业`" :disabled="showType === 'view'"></el-select>
              <span class="clearance"></span>
              <dictionary-comp
                v-model="formData.industryCode" code="industryCode" type="select" :readonly="showType === 'view'">
              </dictionary-comp>
          </el-form-item>
          <el-form-item label="项目业主单位" prop="ownerName" :rules="[$validate.Required]">
            <el-input v-model="formData.ownerName" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="项目法人" prop="legalPerson" :rules="[$validate.Required]">
            <el-input maxlength="100" v-model="formData.legalPerson" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contactor" :rules="[$validate.Required]">
            <el-input maxlength="100" v-model="formData.contactor" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contactInformation" :rules="[$validate.Required]">
            <el-input maxlength="100" v-model="formData.contactInformation" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="项目审批单位" prop="approvalDept">
            <el-input maxlength="100" v-model="formData.approvalDept" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="项目审批文号" prop="approvalNo">
            <el-input maxlength="100" v-model="formData.approvalNo" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="项目审批文件名称" prop="approvalFileName">
            <el-input maxlength="100" v-model="formData.approvalFileName" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="立项批复文号" prop="projectApprovalNo">
            <el-input maxlength="100" v-model="formData.projectApprovalNo" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="初步设计批复文号" prop="designApprovalNo">
            <el-input maxlength="100" v-model="formData.designApprovalNo" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item label="施工图批复文号" prop="constructionDrawApprovalNo">
            <el-input maxlength="100" v-model="formData.constructionDrawApprovalNo" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="项目地址" prop="address" :rules="[$validate.Required]">
            <el-input maxlength="200" class="one-row" v-model="formData.address" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="资金来源" prop="fundSource" :rules="[$validate.Required]">
            <el-input maxlength="1000" class="one-row" type="textarea" v-model="formData.fundSource" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="项目规模" prop="projectScale" :rules="[$validate.Required]">
            <el-input maxlength="1000" class="one-row" type="textarea" v-model="formData.projectScale" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件">
            <uploader v-model="formData.attachmentId" :disabled="showType === 'view'"></uploader>
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
import { tenderEdit, save } from 'src/api/tender/tendermanagement/projectinformation';
import { city } from 'src/api/backstage/dictionary';
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader/index';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      cityOptions: [],
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
     * @description 根据省份获取城市
     * @author lizipei
     * @date 2019/11/13
     */
    async handleChangeProvince (code) {
      try {
        const { data } = await city({ provinceCode: code });
        if (data.code === process.env.ERR_OK) {
          this.cityOptions = data.data;
          if (this.cityOptions.length > 0) {
            this.$set(this.formData, 'administrativeRegion', this.cityOptions[0].displayValue);
          } else {
            this.$set(this.formData, 'administrativeRegion', '');
          }
        }
      } catch (e) {
        console.log(`handleChangeProvince-error: ${e}`);
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
        console.log(`getFormData error: ${e}`);
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
