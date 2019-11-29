<template>
  <!--  编辑/查看  -->
  <el-dialog
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
          <el-form-item label="标段名称" prop="name">
            <el-input maxlength="17" v-model="formData.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="标段编号" prop="code">
            <el-input maxlength="17" v-model="formData.code" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="项目业主单位" prop="ownerName">
            <el-input maxlength="17" v-model="formData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="招标类型" prop="tenderType">
            <dictionary-comp
              v-model="formData.tenderType"
              code="tenderType"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="标段类型" prop="sectionProjectType">
            <dictionary-comp
              v-model="formData.sectionProjectType"
              code="sectionProjectType"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="评审方式" prop="regAddress">
            <dictionary-comp
              v-model="formData.reviewWay"
              code="reviewWay"
              type="select"
              :readonly="true"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="标段合同估算价" class="row-three" prop="regAddress">
            <dictionary-comp
              v-model="formData.regCapitalCurrency"
              code="regCapitalCurrency"
              type="select"
              readonly="false"
              @changeRow="getRegCapitalCurrency"
            >
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" type="number" v-model="formData.contractReckonPrice" disabled></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.contractReckonMoneyUnit"
              code="moneyUnit"
              type="select"
              readonly="false"
            >
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="施工长度(Km）" prop="constructLength">
            <el-input v-model="formData.constructLength" disabled></el-input>
          </el-form-item>
          <el-form-item label="起讫桩号" prop="startAndEndPileNo">
            <el-input v-model="formData.startAndEndPileNo" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="标段内容" prop="sectionContent">
            <el-input disabled type="textarea" v-model="formData.sectionContent"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="投标人资格条件" prop="bidQualification">
            <el-input class="one-row" disabled type="textarea" v-model="formData.bidQualification"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="相关附件" prop="projectScale">
            <uploader v-model="formData.projectScale" disabled></uploader>
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
import { bidstagesProjectInfoJson } from 'src/api/tender/bidderprojectinformation';
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      regAddress: '',
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
        const { data } = await bidstagesProjectInfoJson({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
          this.regAddress = this.formData.regProvince;
        }
      } catch (e) {
        console.log(`src/pages/tender/bidderprojectinformation/bidstagesinformation-getFormData error: ${e}`);
      }
    }
  }
};
</script>
