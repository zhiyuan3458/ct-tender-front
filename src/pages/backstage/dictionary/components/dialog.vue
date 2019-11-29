<template>
  <el-dialog :visible.sync="visible">
    <div class="add-edit-container1">
      <div class="form-container">
        <el-form :model="formData" ref="ctForm" label-width="100px">
          <el-row type="flex" class="row-bg":gutter="20">
            <el-col :span="12">
              <el-form-item label="编码值：" prop="value">
                <el-input class="form-input" v-model="formData.value" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称：" prop="name">
                <el-input class="form-input" v-model="formData.name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg":gutter="20">
            <el-col :span="12">
              <el-form-item label="类型：" prop="type">
                <span>数据内容节点</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="隐藏值：" prop="displayValue" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.displayValue"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg":gutter="20">
            <el-col :span="12">
              <el-form-item label="显示名称：" prop="displayName" :rules="[$validate.Required]">
                <el-input class="form-input" v-model="formData.displayName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效：" prop="effectiveFlag" :rules="[$validate.RequiredChange]">
                <el-radio-group v-model="formData.effectiveFlag">
                  <el-radio label="1">有</el-radio>
                  <el-radio label="0">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg":gutter="20">
            <el-col :span="12">
              <el-form-item label="颜色：" prop="color">
                <color-picker v-model="formData.color"></color-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图标：" prop="icon">
                <el-input v-model="formData.icon"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <el-form-item label="备注：" prop="memo">
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="formData.memo">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import colorPicker from 'src/components/color-picker';
import { save } from 'src/api/backstage/dictionary';
export default {
  components: {
    colorPicker
  },
  data () {
    return {
      visible: false,
      parentId: '',
      formData: {
        value: '',
        color: '#000000',
        icon: '',
        name: '',
        displayValue: '',
        displayName: '',
        memo: '',
        effectiveFlag: '1',
        type: '0'
      }
    };
  },
  props: {
    /* 列表传过来的数据 */
    form: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    /**
     * @description 初始化表单数据
     * @author lvzhiyuan
     * @date 2019/9/28
     */
    init (form) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.ctForm.resetFields();
        this.$refs.ctForm.clearValidate();
        this.formData = form;
        Object.keys(form).forEach(item => {
          this.$set(this.formData, item, form[item]);
        });
        this.formData.id = form.id || '';
      });
    },
    /**
     * @description 保存表单数据
     * @author lvzhiyuan
     * @date 2019/9/28
     */
    handleSave () {
      this.$refs.ctForm.validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await save(this.formData);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.$emit('refresh-list');
              this.visible = false;
            }
          } catch (e) {
            console.log(`dictionary-list-save error: ${e}`);
          }
        } else {
          // this.$message({
          //   type: 'warning',
          //   message: this.$config.ERROR_MSG
          // });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
