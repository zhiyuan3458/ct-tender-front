<template>
  <el-dialog
    title=""
    :visible.sync="isShow"
    :close-on-click-modal="false"
    width="900px"
  >
    <div class="add-edit-container">
      <div class="form-container">
        <p class="project-unit">投标单位名称: {{ showFormData.bidderName }}</p>
        <p class="project-info">
          <span>招标项目名称: {{ showFormData.tenderBatchName }}</span>
          <span>招标项目编号: {{ showFormData.tenderBatchCode }}</span>
        </p>
        <el-table :data="tableData">
          <el-table-column label="标段名称" prop="name" min-width="100"></el-table-column>
          <el-table-column label="标段编号" prop="code" min-width="100"></el-table-column>
          <el-table-column label="登记情况" min-width="100">
            <template slot-scope="scope">
              <el-select v-model="scope.row.regStaus" placeholder="请选择">
                <el-option
                  v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <el-form :model="formData" ref="ctForm">
          <div class="content-info">
            <el-form-item label="联系人姓名" prop="contactor" :rules="[$validate.Required]">
              <el-input maxlength="100" v-model="formData.contactor"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机" prop="telephone" :rules="[$validate.Required, $validate.Mobile]">
              <el-input maxlength="50" v-model="formData.telephone"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">返 回</el-button>
        <el-button type="primary" @click="handleSave">提 交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import { registerList, register } from 'src/api/tender/biddermanagement/projectinformation';

export default {
  data () {
    return {
      tenderBatchInfoId: '',
      showFormData: {
        bidderName: '',
        tenderBatchName: '',
        tenderBatchCode: ''
      },
      formData: {},
      tableData: [],
      isShow: false,
      selectOptions: [
        { id: 1, value: '参加', label: '参加' },
        { id: 2, value: '不参加', label: '不参加' }
      ]
    };
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
      this.tenderBatchInfoId = id;
      this.isShow = true;
      try {
        const { data } = await registerList({ tenderBatchInfoId: id });
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data;
          if (this.tableData.length > 0) {
            this.showFormData.bidderName = data.data[0].bidderName;
            this.showFormData.tenderBatchName = data.data[0].tenderBatchName;
            this.showFormData.tenderBatchCode = data.data[0].tenderBatchCode;
          }
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
          const params = {
            tenderBatchInfoId: this.tenderBatchInfoId,
            bidInformationGroup: this.tableData,
            contactor: this.formData.contactor,
            telephone: this.formData.telephone
          };
          const { data } = await register(params);
          if (data.code === process.env.ERR_OPERATE_OK) {
            this.isShow = false;
            this.$emit('return', 'refresh');
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
    .form-container{
      margin: 0 auto;
      position: relative;
      height: 50vh;
      min-width: 400px;
      overflow-y: auto;
      .project-unit, .project-info {
        font-size: 14px;
      }
      .project-info {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .content-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 18px;
        .el-form-item {
          display: inherit;
        }
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
