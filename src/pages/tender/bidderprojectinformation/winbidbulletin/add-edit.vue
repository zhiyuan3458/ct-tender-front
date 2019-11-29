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
          <el-form-item label="标段编号" prop="code">
            <el-input maxlength="17" v-model="formData.sectionCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="招标人名称" prop="ownerName">
            <el-input maxlength="17" v-model="formData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="中标人名称" prop="ownerName">
            <el-input maxlength="17" v-model="formData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="通知书类型" prop="bulletinType">
            <dictionary-comp
              v-model="formData.bulletinType"
              code="bulletinType"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="通知书编号" prop="ownerName">
            <el-input maxlength="17" v-model="formData.bulletinCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="中标价格" class="row-three">
            <dictionary-comp
              v-model="formData.regCapitalCurrency"
              code="regCapitalCurrency"
              type="select"
              readonly="false"
              @changeRow="getRegCapitalCurrency"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input type="number" v-model="formData.bidPrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.contractReckonMoneyUnit"
              code="moneyUnit"
              type="select"
              readonly="false"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="发出时间" prop="ownerName">
            <el-input maxlength="17" v-model="formData.issueDate" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件" prop="attachmentId">
            <uploader v-model="formData.attachmentId" disabled></uploader>
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
import { winbidbulletinInfoJson } from 'src/api/tender/bidderprojectinformation';
import dictionaryComp from 'src/components/dictionary-component';
export default {
  components: {
    dictionaryComp
  },
  data () {
    return {
      industryCode: '建筑业',
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
        const { data } = await winbidbulletinInfoJson({ id });
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
