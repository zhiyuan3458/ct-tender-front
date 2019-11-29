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
            <el-input maxlength="17" v-model="formData.tenderBatchName" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标项目编号" prop="tenderBatchCode">
            <el-input maxlength="17" v-model="formData.tenderBatchCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="标段名称" prop="sectionName">
            <el-input maxlength="17" v-model="formData.sectionName" disabled></el-input>
          </el-form-item>
          <el-form-item label="标段编号" prop="sectionCode">
            <el-input maxlength="17" v-model="formData.sectionCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="招标人名称" prop="ownerName">
            <el-input maxlength="17" v-model="formData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="中标人名称" prop="bidderName">
            <el-input maxlength="17" v-model="formData.bidderName" disabled></el-input>
          </el-form-item>
          <el-form-item label="中标价格" class="row-three" prop="bidPrice">
            <dictionary-comp
              v-model="formData.regCapitalCurrency"
              code="regCapitalCurrency"
              type="select"
              readonly="false"
              @changeRow="getRegCapitalCurrency"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" type="number" v-model="formData.bidPrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.contractReckonMoneyUnit"
              code="moneyUnit"
              type="select"
              readonly="false"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row" label="其他说明:" prop="otherMemo">
            <el-input class="one-row" type="textarea" v-model="formData.otherMemo" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件" prop="attachmentId">
            <uploader v-model="formData.attachmentId" disabled></uploader>
          </el-form-item>
          <el-form-item label="提交人员" prop="submitPerson">
            <el-input v-model="formData.submitPerson" disabled></el-input>
          </el-form-item>
          <el-form-item label="提交时间" prop="submitDate">
            <el-input v-model="formData.submitDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核人员" prop="auditPerson">
            <el-input v-model="formData.auditPerson" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核时间" prop="auditDate">
            <el-input v-model="formData.auditDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核结果" prop="contractDeadline">
            <dictionary-comp
              v-model="formData.auditResult"
              code="auditResult"
              type="select"
              :readonly="!isShowSave"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="审核状态" prop="auditStatus">
            <dictionary-comp
              v-model="formData.auditStatus"
              disabled
              code="auditStatus"
              type="select"
              readonly
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row" v-if="formData.auditResult !== '通过'" label="审核意见:" prop="auditOpinion" :rules="[$validate.Required]">
            <el-input class="one-row" :disabled="!isShowSave" type="textarea" v-model="formData.auditOpinion"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="handleClose">返回</el-button>
        <el-button v-if="isShowSave" type="primary" @click="submitFn">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import uploader from 'src/components/uploader';
import dictionaryComp from 'src/components/dictionary-component';
import { bidcandidatepublicityDetails, bidcandidatepublicitySubmit } from 'src/api/tender/projectmanagement';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      formData: {},
      isShow: true,
      isEdit: false,
      isShowSave: false
    };
  },
  mixins: [addEditMixin],
  methods: {
    /**
     * @description 清楚表单数据
     * @author wenruihuan
     * 2019/9/18
     */
    handleClose () {
      this.$refs.ctForm.clearValidate();
      this.$refs.ctForm.resetFields();
      this.isShow = false;
    },
    /**
     * @description 获取表单数据
     * @author lvzhiyuan
     * @date 2019/9/2
     */
    async getFormData (id, state) {
      if (state === 'view') {
        this.isShowSave = false;
      } else if (state === 'edit') {
        this.isShowSave = true;
      }
      this.isShow = true;
      try {
        const { data } = await bidcandidatepublicityDetails({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`company-getFormData error: ${e}`);
      }
    },
    /**
     * @description 提交
     * @author wenruihuan
     * @date 2019/11/18
     */
    async submitFn () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await await bidcandidatepublicitySubmit(this.formData);
            if (data.code === process.env.ERR_OPERATE_OK) {
              setTimeout(() => {
                this.isShow = false;
                this.$parent.getList();
              }, 2000);
            }
          } catch (e) {
            console.log(`src-components-file-back-up-add-submitFn error: ${e}`);
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
