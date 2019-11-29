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
          <el-form-item class="one-row" label="招标项目名称" prop="tenderBatchName" :rules="[$validate.RequiredChange]">
            <el-select v-model="formData.tenderBatchName" filterable :disabled="showType === 'view'">
              <el-option v-for="item in tenderBatchNameOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="row-two" label="标段名称" prop="name" :rules="[$validate.Required]">
            <el-input maxlength="200" v-model="formData.name" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="标段编号" prop="code">
            <span>{{ formData.code }}</span>
          </el-form-item>
          <el-form-item class="row-two" label="招标类型" prop="tenderType" :rules="[$validate.RequiredChange]">
            <dictionary-comp
              v-model="formData.tenderType" code="tenderType" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="标段类型" prop="sectionProjectType" :rules="[$validate.RequiredChange]">
            <dictionary-comp
              v-model="formData.sectionProjectType" code="sectionProjectType" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="评审方式" prop="reviewWay" :rules="[$validate.RequiredChange]">
            <dictionary-comp
              v-model="formData.reviewWay" code="reviewWay" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item label="标段合同估算价" class="row-three" prop="contractReckonPrice" :rules="[$validate.Required]">
            <dictionary-comp
              v-model="formData.regCapitalCurrency" code="regCapitalCurrency" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
            <span class="clearance"></span>
            <el-input maxlength="20" v-model.number="formData.contractReckonPrice" :disabled="showType === 'view'"></el-input>
            <span class="clearance"></span>
            <dictionary-comp
              v-model="formData.contractReckonMoneyUnit" code="moneyUnit" type="select" :readonly="showType === 'view'">
            </dictionary-comp>
          </el-form-item>
          <el-form-item class="row-two" label="施工长度(Km）" prop="constructLength" :rules="[$validate.Required]">
            <el-input maxlength="20" v-model="formData.constructLength" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="row-two" label="起讫桩号" prop="startAndEndPileNo" :rules="[$validate.Required]">
            <el-input maxlength="200" v-model="formData.startAndEndPileNo" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="标段内容" prop="sectionContent" :rules="[$validate.Required]">
            <el-input type="textarea" v-model="formData.sectionContent" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="投标人资格条件" prop="bidQualification">
            <el-input class="one-row" type="textarea" v-model="formData.bidQualification" :disabled="showType === 'view'"></el-input>
          </el-form-item>
          <el-form-item class="one-row" label="附件" prop="projectScale">
            <uploader v-model="formData.attachmentId" :disabled="showType === 'view'"></uploader>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-container">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSave" v-if="showType !== 'view'">保 存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import dictionaryComp from 'src/components/dictionary-component';
import uploader from 'src/components/uploader/index';
import { tenderEdit, findAll, save } from 'src/api/tender/tendermanagement/section';
export default {
  components: {
    dictionaryComp,
    uploader
  },
  data () {
    return {
      tenderBatchNameOptions: [],
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
  created () {
    this.getTenderBatchNameOptions();
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
     * @date 2019/11/12
     */
    async getTenderBatchNameOptions () {
      try {
        const { data } = await findAll();
        if (data.code === process.env.ERR_OK) {
          this.tenderBatchNameOptions = data.data;
        }
      } catch (e) {
        console.log(`getTenderBatchNameOptions-error: ${e}`);
      }
    },
    /**
     * @description 获取表单数据
     * @author lvzhiyuan
     * @date 2019/9/2
     */
    async getFormData (id) {
      this.isShow = true;
      try {
        const { data } = await tenderEdit({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
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
          try {
            const { data } = await save(this.formData);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.isShow = false;
              this.$emit('return', 'refresh');
            }
          } catch (e) {
            console.log(`handleSave-error: ${e}`);
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
