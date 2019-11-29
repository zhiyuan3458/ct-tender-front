<template>
  <!--    编辑-->
  <el-dialog
    title=""
    :visible.sync="isShow"
    :close-on-click-modal="false"
    width="900px"
  >
    <div class="add-edit-container">
      <div class="form-container" :style="showType === 'add' ? 'height: 26vh' : ''">
        <el-form :model="formData" ref="ctForm" label-width="150px">
          <el-form-item class="one-row" label="选择标段" prop="sectionIds" :rules="[$validate.RequiredChange]" v-if="showType === 'add'">
            <el-checkbox-group v-model="formData.sectionIds">
              <el-checkbox v-for="item in sectionOptions" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="row-two" label="投标人名称" prop="bidderName">
            <el-input maxlength="100" v-model="formData.bidderName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="标段名称" prop="sectionName" v-if="showType !== 'add'">
            <el-input maxlength="100" v-model="formData.sectionName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="提交时间" prop="submitDate">
            <el-date-picker
              type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
              v-model="formData.submitDate" disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item class="row-two" label="回复时间" prop="replyDate" v-if="showType !== 'add'">
            <el-date-picker
              type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
              v-model="formData.replyDate" disabled>
            </el-date-picker>
          </el-form-item>
          <el-form-item class="one-row" label="澄清要求内容" prop="clarificationContent" :rules="showType === 'add' ? [$validate.Required] : ''">
            <el-input class="one-row" type="textarea" v-model="formData.clarificationContent" :disabled="showType !== 'add'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="澄清要求内容附件" prop="attachmentIdOfClarification" :rules="showType === 'add' ? [$validate.RequiredChange] : ''">
            <uploader v-model="formData.attachmentIdOfClarification" :disabled="showType !== 'add'" :isValidate="showType !== 'add'"></uploader>
          </el-form-item>
          <el-form-item class="one-row" label="回复内容" prop="replyContent" v-if="showType !== 'add'">
            <el-input class="one-row" type="textarea" v-model="formData.replyContent" disabled></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="回复内容附件" prop="attachmentIdOfReply" v-if="showType !== 'add'">
            <uploader v-model="formData.attachmentIdOfReply" disabled></uploader>
          </el-form-item>
          <el-form-item class="one-row" label="澄清文件回执附件" prop="attachmentOfReceipt" v-if="showType !== 'add'">
            <uploader v-model="formData.attachmentOfReceipt" disabled></uploader>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" v-if="showType === 'add'">提 交</el-button>
        <el-button type="primary" @click="handleDownload" v-if="showType !== 'add'">下载回执</el-button>
        <el-button type="primary" @click="handleUpload" v-if="showType !== 'add'">上传回执</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import uploader from 'src/components/uploader/index';
import { findByTenderBatch, edit, submit } from 'src/api/tender/biddermanagement/clarificationrequest';
export default {
  components: {
    uploader
  },
  data () {
    return {
      sectionOptions: [],
      formData: {
        sectionIds: [] // 一定要给数组，不然报错
      },
      isShow: false
    };
  },
  props: {
    /* 显示类型 */
    showType: {
      type: String
    },
    tenderBatchInfoId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '' // 1为招标文件类型, 2为资格预审文件类型
    }
  },
  mixins: [addEditMixin],
  created () {
    this.getSectionOptions();
  },
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
     * @description 获取所有招标项目名称信息
     * @author lizipei
     * @date 2019/11/27
     */
    async getSectionOptions () {
      try {
        const { data } = await findByTenderBatch({ tenderBatchInfoId: this.tenderBatchInfoId });
        if (data.code === process.env.ERR_OK) {
          this.sectionOptions = data.data;
        }
      } catch (e) {
        console.log(`getSectionOptions-error: ${e}`);
      }
    },
    /**
     * @description 获取表单数据
     * @author lizipei
     * @date 2019/11/27
     */
    async getFormData (id) {
      this.isShow = true;
      try {
        const { data } = await edit({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`getFormData-error: ${e}`);
      }
    },
    /**
     * @description 提交
     * @author lizipei
     * @date 2019/11/27
     */
    handleSubmit () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const params = Object.assign(this.formData, { fileType: this.type });
            const { data } = await submit(params);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.isShow = false;
              this.$emit('return', 'refresh');
            }
          } catch (e) {
            console.log(`handleSubmit-error: ${e}`);
          }
        }
      });
    },
    /**
     * @description 点击下载回执
     * @author lizipei
     * @date 2019/11/28
     */
    handleDownload () {
      console.log('download');
      const test = '';
      if (test !== '已回复') {
        this.$message.error('无法下载回执');
        return;
      }
      console.log('todo');
    },
    /**
     * @description 点击上传回执
     * @author lizipei
     * @date 2019/11/28
     */
    handleUpload () {
      console.log('upload');
      const test = '';
      if (test !== '已回复') {
        this.$message.error('无法上传回执');
        return;
      }
      console.log('todo');
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
