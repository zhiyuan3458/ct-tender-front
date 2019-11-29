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
          <el-form-item class="row-two" label="项目名称" prop="projectName">
            <el-input maxlength="200" v-model="formData.projectName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="项目编号" prop="projectCode">
            <el-input maxlength="17" v-model="formData.projectCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="招标项目名称" prop="tenderBatchName">
            <el-input maxlength="20" v-model="formData.tenderBatchName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="招标项目编号" prop="tenderBatchCode">
            <el-input maxlength="100" v-model="formData.tenderBatchCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="文件标题" prop="fileTitle">
            <el-input maxlength="100" v-model="formData.fileTitle" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="文件类型" prop="fileType">
            <dictionary-comp
              v-model="formData.fileType" code="fileType" type="select" readonly>
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="文号" prop="fileNum">
            <el-input maxlength="100" v-model="formData.fileNum" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="发文流水号" prop="postFileNum">
            <el-input maxlength="100" v-model="formData.postFileNum" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="报文单位" prop="ownerName">
            <el-input maxlength="100" v-model="formData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="审核单位" prop="auditDept">
            <dictionary-comp
              v-model="formData.auditDept" code="auditDept" type="select" readonly>
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="one-row" label="文件附件" prop="attachmentIdOfFile">
            <uploader v-model="formData.attachmentIdOfFile" disabled></uploader>
          </el-form-item>
          <el-form-item class="one-row" label="备案意见" prop="recordOpinion">
            <el-input maxlength="200" type="textarea" v-model="formData.recordOpinion" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="备案意见附件" prop="attachmentIdOfOpinion">
            <uploader v-model="formData.attachmentIdOfOpinion" :disabled="showType === 'view'"></uploader>
          </el-form-item>
          <el-form-item class="row-two" label="提交人员" prop="submitPerson">
            <el-input maxlength="100" v-model="formData.submitPerson" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="提交时间" prop="submitDate">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.submitDate"
              type="datetime" disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item class="row-two" label="审核人员" prop="auditPerson">
            <el-input maxlength="100" v-model="formData.auditPerson" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="审核时间" prop="auditDate">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.auditDate"
              type="datetime" disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item class="row-two" label="备案方式" prop="recordWay">
            <dictionary-comp
              v-model="formData.recordWay" code="recordWay" type="select" readonly>
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="备案状态" prop="recordStatus">
            <dictionary-comp
              v-model="formData.recordStatus" code="recordStatus" type="select" readonly>
            </dictionary-comp>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSave" v-if="showType !== 'view'">备案成功</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader/index';
import { showOrEdit, audit } from 'src/api/tender/projectmanagement/filerecord';

export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
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
     * @description 获取表单数据
     * @author lvzhiyuan
     * @date 2019/9/2
     */
    async getFormData (id) {
      this.isShow = true;
      try {
        const { data } = await showOrEdit({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`src/pages/tender/projectmanagement/filerecord-getFormData error: ${e}`);
      }
    },
    /**
     * @description 备案成功
     * @author lizipei
     * @date 2019/11/11
     */
    handleSave () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await audit(this.formData);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.isShow = false;
              this.$emit('return', 'refresh');
            }
          } catch (e) {
            console.log(`src/pages/tender/projectmanagement/filerecord-handleSave-error: ${e}`);
          }
        }
      });
    }
  }
};
</script>
