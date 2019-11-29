<template>
  <div class="list-container">
    <div class="box-container-fix">
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
      <div class="form-container form-container-in-page">
        <el-form :model="formData" ref="ctForm" label-width="180px">
          <el-form-item
            class="row-two"
            v-for="item in formItemList"
            :key="item.id"
            :label="item.label"
            :prop="item.key"
            :rules="item.isValidate ? [$validate.RequiredChange] : []"
          >
            <el-date-picker
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="formData[item.key]"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <bottom-tool-bar
        @save="handleSave"
        :isShowSave="true"
        :isShowEdit="false"
        :isShowSubmit="false"
        :isShowReturn="false"
      ></bottom-tool-bar>
    </div>
  </div>
</template>
<script>
import bottomToolBar from 'src/components/bottom-tool-bar/index';
import { edit, save } from 'src/api/tender/tendermanagement/datetimemanagement';
export default {
  components: {
    bottomToolBar
  },
  data () {
    return {
      formData: {}
    };
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
    this.getFormData();
  },
  methods: {
    async getFormData () {
      try {
        const params = {
          tenderBatchInfoId: this.tenderBatchInfoId,
          processType: this.type !== '2' ? '1' : '2'
        };
        const { data } = await edit(params);
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`type:${this.type}-getFormData-error: ${e}`);
      }
    },
    async handleSave () {
      try {
        const params = {
          tenderBatchInfoId: this.tenderBatchInfoId,
          processType: this.type !== '2' ? '1' : '2',
          tenderTimeManager: this.formData
        };
        const { data } = await save(params);
        if (data.code === process.env.ERR_OPERATE_OK) {
          this.getFormData();
        }
      } catch (e) {
        console.log(`type:${this.type}-handleSave-error: ${e}`);
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
