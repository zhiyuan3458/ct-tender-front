<template>
  <div class="list-container">
    <div class="box-container-fix" v-if="!isInDialog">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>发标</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div class="index-edit-container">
      <div class="form-container" :class="!isInDialog ? 'form-container-in-page' : ''">
        <div class="info-tips" v-if="tipsLabel" @click="showResult">{{ tipsLabel }}</div>
        <el-form :model="formData" ref="ctForm" label-width="180px">
          <el-form-item class="one-row" label="招标人名称" prop="ownerName">
            <el-input maxlength="100" v-model="formData.ownerName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="招标项目名称" prop="tenderBatchName">
            <el-input maxlength="200" v-model="formData.tenderBatchName" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="招标项目编号" prop="tenderBatchCode">
            <el-input maxlength="200" v-model="formData.tenderBatchCode" disabled></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="公告类型" prop="noticeType">
            <dictionary-comp
              v-model="formData.noticeType" code="noticeType" type="select" :readonly="true">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="公告性质" prop="noticeNature">
            <dictionary-comp
              v-model="formData.noticeNature" code="noticeNature" type="select" :readonly="true">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="公告发布时间" prop="issueStartDate" :rules="[$validate.RequiredChange]">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.issueStartDate" type="datetime" :disabled="!isEdit">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="row-two" label="公告结束时间" prop="issueEndDate" :rules="[$validate.RequiredChange]">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.issueEndDate" type="datetime" :disabled="!isEdit">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="one-row" label="公告发布媒体" prop="issueMedia" :rules="[$validate.Required]">
            <el-input maxlength="1000" class="one-row" type="textarea" v-model="formData.issueMedia" :disabled="!isEdit"></el-input>
          </el-form-item>
          <el-form-item class="row-two reset-label" :label="`${getFileLabel}文件获取开始时间`" prop="fileAcquireStartDate" :rules="[$validate.RequiredChange]">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.fileAcquireStartDate" type="datetime" :disabled="!isEdit">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="row-two reset-label" :label="`${getFileLabel}文件获取截止时间`" prop="fileAcquireEndDate">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.fileAcquireEndDate" type="datetime" :disabled="!isEdit">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="one-row reset-label" :label="`${getFileLabel}文件获取方法`" prop="fileAcquireWay" :rules="[$validate.Required]">
            <el-input class="one-row" type="textarea" v-model="formData.fileAcquireWay" :disabled="!isEdit"></el-input>
          </el-form-item>
          <el-form-item class="row-two reset-label" :label="`${sendFileLabel}文件递交开始时间`" prop="fileSubmitStartDate" :rules="[$validate.RequiredChange]">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.fileSubmitStartDate" type="datetime" :disabled="!isEdit">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="row-two reset-label" :label="`${sendFileLabel}文件递交截止时间`" prop="fileSubmitEndDate" :rules="[$validate.RequiredChange]">
            <el-date-picker
              format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.fileSubmitEndDate" type="datetime" :disabled="!isEdit">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="one-row reset-label" :label="`${sendFileLabel}文件递交方法`" prop="fileSubmitWay" :rules="[$validate.Required]">
            <el-input class="one-row" type="textarea" v-model="formData.fileSubmitWay" :disabled="!isEdit"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件" prop="attachmentId">
            <uploader v-model="formData.attachmentId" :disabled="true"></uploader>
          </el-form-item>
        </el-form>
      </div>
      <bottom-tool-bar
        v-if="isEdit && !isInDialog"
        @submit="handleSubmit"
        :isShowSave="false"
        :isShowEdit="false"
        :isShowSubmit="true"
        :isShowReturn="false"
      ></bottom-tool-bar>
      <div class="tool-container" v-if="isInDialog">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" v-if="isEdit">提 交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader/index';
import bottomToolBar from 'src/components/bottom-tool-bar/index';
import { edit, submit } from 'src/api/tender/tendermanagement/noticepublish';

export default {
  components: {
    dictionaryComp,
    uploader,
    bottomToolBar
  },
  data () {
    return {
      formData: {
        noticeType: this.type, // 1是招标公告发布， 2是发布资格预审公告
        noticeNature: this.isInDialog ? '2' : '1' // 1是正常公告，2是更正公告
      }
    };
  },
  props: {
    tenderBatchInfoId: { // 招标项目id
      type: String,
      default: ''
    },
    title: { // 面包屑标题
      type: String,
      default: ''
    },
    isView: { // 是否为仅查看状态
      type: Boolean,
      default: false
    },
    isInDialog: {
      type: Boolean,
      default: false // 是否为弹窗
    },
    rowId: {
      type: String,
      default: '' // 补充公告id, 弹窗的编辑和查看状态用到
    },
    type: {
      type: String,
      default: '' // 1是招标公告发布， 2是发布资格预审公告
    }
  },
  computed: {
    getFileLabel () {
      return this.type === '1' ? '招标' : this.type === '2' ? '资格预审' : '';
    },
    sendFileLabel () {
      return this.type === '1' ? '招标' : this.type === '2' ? '资格预审申请' : '';
    },
    tipsLabel () {
      let label = '';
      const status = this.formData.auditStatus;
      if (status === '待审核') {
        label = '审核中';
      } else if (status === '审核通过') {
        const result = this.formData.auditResult;
        label = result === '通过' ? '审核通过' : '审核不通过，不通过原因';
      }
      return label;
    },
    isEdit () {
      if (this.isView) {
        return false;
      } else {
        return !this.tipsLabel || this.tipsLabel === '审核不通过，不通过原因';
      }
    }
  },
  created () {
    this.getFormData();
  },
  methods: {
    /**
     * @description 获取表单数据
     * @author lizipei
     * @date 2019/11/18
     */
    async getFormData () {
      try {
        const params = {
          tenderBatchInfoId: this.tenderBatchInfoId,
          noticeType: this.type, // 1表示招标公告, 2表示资格预审公告, 9表示其他
          noticeNature: this.isInDialog ? '2' : '1' // 1表示正常公告, 2表示更正公告, 9表示其他
        };
        if (this.isInDialog && this.rowId) {
          params.id = this.rowId;
        }
        const { data } = await edit(params);
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`getFormData-error: ${e}`);
      }
    },
    /**
     * @description 显示不通过原因
     * @author lizipei
     * @date 2019/11/19
     */
    showResult () {
      if (this.tipsLabel === '审核不通过，不通过原因') {
        this.$alert(this.formData.auditOpinion, '不通过原因');
      }
    },
    /**
     * @description 点击提交触发
     * @author lizipei
     * @date 2019/11/18
     */
    handleSubmit () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const params = {
              tenderBatchInfoId: this.tenderBatchInfoId,
              tenderNotice: this.formData
            };
            const { data } = await submit(params);
            if (data.code === process.env.ERR_OPERATE_OK) {
              if (this.isInDialog) {
                this.$emit('close', 'refresh');
              } else {
                this.getFormData();
              }
            }
          } catch (e) {
            console.log(`handleSubmit-error: ${e}`);
          }
        }
      });
    },
    handleCancel () {
      this.$emit('close');
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
      /deep/.el-form{
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
      .one-row{
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
