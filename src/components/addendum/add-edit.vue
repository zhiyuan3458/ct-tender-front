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
          <el-form-item class="one-row" label="选择标段" prop="sectionName" v-if="showType !== 'view'" :rules="showType ==='add' ? [$validate.Required] : ''">
            <el-checkbox-group v-model="formData.sectionIds">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="one-row" label="标段名称" prop="sectionName" v-if="showType === 'view'">
            <el-input v-model="formData.sectionName" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="补遗书类型" prop="addendumType" :rules="showType ==='add' ? [$validate.Required] : ''">
            <dictionary-comp v-model="formData.addendumType" code="addendumType" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="版本号" prop="versionsShow">
            <el-input v-model="formData.versionsShow" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="发布时间" prop="issueDate">
            <el-date-picker
              type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.issueDate" :disabled="showType === 'view'">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="one-row" label="补遗书标题" prop="addendumTitle" :rules="showType ==='add' ? [$validate.Required] : ''">
            <el-input maxlength="200" v-model="formData.addendumTitle" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="补遗书内容" prop="addendumContent" :rules="showType ==='add' ? [$validate.Required] : ''">
            <el-input type="textarea" v-model="formData.addendumContent" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="补遗书附件" prop="attachmentIdOfAddendum" :rules="showType ==='add' ? [$validate.Required] : ''">
            <uploader v-model="formData.attachmentIdOfAddendum" :disabled="showType === 'view'"></uploader>
          </el-form-item>
          <el-form-item class="one-row" label="补遗书回执附件" prop="attachmentIdOfReceipt" v-if="showType === 'view' && role !== 'issue'">
            <uploader v-model="formData.attachmentIdOfReceipt" :disabled="showType === 'view'"></uploader>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" v-if="showType === 'add' && role === 'issue'" @click="handleRelease('ctForm')">发布</el-button>
        <el-button type="primary" v-if="showType === 'view' && role !== 'issue'" @click="handleDownload">下载回执</el-button>
        <el-button type="primary" v-if="showType === 'view' && role !== 'issue'" @click="handleUpload">上传回执</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader/index';
import { show, findByTenderBatch, issue } from 'src/api/tender/biddermanagement/addendum';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      formData: {
        sectionIds: []
      },
      isShow: false
    };
  },
  props: {
    /* 显示类型 */
    showType: {
      type: String
    },
    /* 判断是发布人还是查看人 */
    role: {
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
     * @author lizipei
     * @date 2019/11/27
     */
    async getFormData (id) {
      this.isShow = true;
      this.getBatchList(id);
      try {
        const { data } = await show({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`getFormData-error: ${e}`);
      }
    },
    /**
     * @description 获取表单数据
     * @author lizipei
     * @date 2019/11/27
     */
    async getBatchList (tenderBatchInfoId) {
      try {
        const { data } = await findByTenderBatch({ tenderBatchInfoId });
        if (data.code === process.env.ERR_OK) {
          this.formData.sectionIds = data.data;
        }
      } catch (e) {
        console.log(`getFormData-error: ${e}`);
      }
    },
    /**
     * @description 发布补遗书信息
     * @author wenruihuan
     * 2019/11/28
     */
    async handleRelease (formName) {
      try {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { data } = await issue(this.formData);
            if (data.code === process.env.ERR_OK) {
              this.batchList = data.data;
            }
          }
        });
      } catch (e) {
        console.log(`getFormData-error: ${e}`);
      }
    },
    /**
     * @description 点击下载回执
     * @author lizipei
     * @date 2019/11/28
     */
    handleDownload () {
      console.log('download');
    },
    /**
     * @description 点击上传回执
     * @author lizipei
     * @date 2019/11/28
     */
    handleUpload () {
      console.log('upload');
    }
  }
};
</script>

<style lang="scss" scoped>
.add-edit-container {
  padding-bottom: 0;
  background-color: white;
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
      .el-date-editor {
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
    height: 45vh;
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
