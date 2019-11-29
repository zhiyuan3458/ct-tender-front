<template>
  <div class="add-edit-container">
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" label-width="150px">
        <el-form-item class="one-row" label="选择标段" prop="sectionIds" :rules="[$validate.Required]">
          <el-radio-group v-model="formData.sectionIds">
            <el-radio label="1">1</el-radio>
            <el-radio label="2">2</el-radio>
            <el-radio label="3">3</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="one-row" label="补遗书类型" prop="addendumType">
          <dictionary-comp
            v-model="formData.addendumType"
            code="addendumType"
            type="select"
            :readonly="true"
          >
          </dictionary-comp>
        </el-form-item>
        <el-form-item label="版本号" prop="companyType">
          <el-input maxlength="10" v-model="formData.versionsShow" disabled></el-input>
        </el-form-item>
        <el-form-item class="row-two" label="发布时间" prop="regAddress">
          <el-date-picker
            v-model="formData.issueDate"
            type="date"
            placeholder="发布时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="one-row" label="补遗书标题" prop="addendumTitle">
          <el-input v-model="formData.addendumTitle" disabled></el-input>
        </el-form-item>
        <el-form-item class="one-row" label="补遗书内容" prop="addendumContent">
          <el-input type="textarea" v-model="formData.addendumContent" disabled></el-input>
        </el-form-item>
        <el-form-item label="补遗书附件">
          <uploader v-model="formData.attachmentId" ></uploader>
        </el-form-item>
      </el-form>
    </div>
    <div class="tool-container">
      <el-button @click="cancelFn">取消</el-button>
      <el-button type="primary" v-if="status !== 'view'" @click="saveFn">保存</el-button>
    </div>
  </div>
</template>
<script>
import uploader from 'src/components/uploader/index';
import { findByTenderBatch } from 'src/api/tender/tendermanagement/issuetenderfileaddendum';
export default {
  data () {
    return {
      formData: {},
      isShow: false,
      tenderBatchInfoId: '',
      sectionIdList: []
    };
  },
  components: {
    uploader
  },
  props: {
    title: {
      type: String,
      default: '' // 面包屑标题
    },
    formItemList: {
      type: Array,
      default () {
        return [];
      }
    },
    type: {
      type: String,
      default: '' // 1是资格后审-招标， 2是资格预审-资审，3是资格预审-招标
    }
  },
  created () {
    this.getTenderBatchList();
    // this.getFormData();
  },
  methods: {
    /**
     * @description 取消按钮触发
     * @author wenruihuan
     * 2019/11/26
     */
    cancelFn () {
      this.$parent.handleClose();
    },
    /**
     * @description 获取所有标段信息
     * @author wenruihuan
     * 2019/11/26
     */
    async getTenderBatchList () {
      try {
        const { data } = await findByTenderBatch({ tenderBatchInfoId: this.tenderBatchInfoId });
        if (data.code === process.env.ERR_OK) {
          this.sectionIdList = data.data;
        }
      } catch (e) {
        console.log(`type:${this.type}-getFormData-error: ${e}`);
      }
    },
    async getFormData () {
      try {
        // const params = {
        //   tenderBatchInfoId: this.tenderBatchInfoId,
        //   processType: this.type !== '2' ? '1' : '2'
        // };
        // const { data } = await edit(params);
        // if (data.code === process.env.ERR_OK) {
        //   this.formData = data.data;
        // }
      } catch (e) {
        console.log(`type:${this.type}-getFormData-error: ${e}`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .index-edit-container {
    background: #fff;
    padding: 20px;
    .form-container {
      margin: 0 auto;
      position: relative;
      overflow-y: auto;

      /deep/ .el-form {
        display: flex;
        flex-wrap: wrap;
      }

      .info-tips {
        text-align: center;
        line-height: 35px;
        color: red;
        font-size: 18px;
        margin-bottom: 20px;
      }

      .clearance {
        display: block;
        margin: 0 2px;
      }

      .one-row {
        width: 100%;
      }

      .row-two {
        width: 50%;

        /deep/ .el-form-item__content {
          display: flex;

          .el-select {
            width: 100%;
          }

          .el-date-editor {
            width: 100%;
          }
        }
      }

      .reset-label {
        /deep/ .el-form-item__label {
          line-height: 18px;
        }
      }
    }

    .form-container-in-page {
      height: calc(100vh - 185px);
      padding-bottom: 52px;
      min-width: 400px;
    }
  }
</style>
