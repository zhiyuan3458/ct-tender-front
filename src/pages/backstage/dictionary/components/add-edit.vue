<template>
    <div class="add-edit-container1">
        <div class="form-container">
                <el-form :model="formData" ref="ctForm" label-width="100px">
                    <el-row type="flex" class="row-bg":gutter="20">
                        <el-col :span="12">
                            <el-form-item label="编码值：" prop="value" :rules="[$validate.Required, validateCode]">
                                <el-input class="form-input" v-model="formData.value" :readonly="node.btnType === 'addItem' || node.btnType === 'editItem'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="名称：" prop="name" :rules="[$validate.Required]">
                                <el-input class="form-input" v-model="formData.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg":gutter="20">
                        <el-col :span="12">
                            <el-form-item label="类型：" prop="type">
                                <span>{{this.node.btnType === 'addCategory' ? '目录结构节点' : '数据内容节点'}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="隐藏值：" prop="displayValue">
                                <el-input class="form-input" v-model="formData.displayValue"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg":gutter="20">
                        <el-col :span="12">
                            <el-form-item label="显示名称：" prop="displayName">
                                <el-input class="form-input" v-model="formData.displayName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="有效：" prop="effectiveFlag">
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
        <bottom-tool-bar
            @save="saveFn"
            @return="returnFn"
        >
        </bottom-tool-bar>
    </div>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import bottomToolBar from 'src/components/bottom-tool-bar';
import colorPicker from 'src/components/color-picker';
import { edit, save } from 'src/api/backstage/dictionary';
import { ADD, ADD_CATEGORY, ADD_ITEM, EDIT_ITEM, EDIT } from '../constant';
import { isOnlyOneCode } from '../validate';
export default {
  components: {
    bottomToolBar,
    colorPicker
  },
  data () {
    return {
      parentId: '',
      formData: {
        value: '',
        color: '#000000',
        icon: '',
        name: '',
        displayValue: '',
        displayName: '',
        memo: '',
        effectiveFlag: '1'
      },
      validateCode: { validator: isOnlyOneCode, trigger: 'blur' }
    };
  },
  mixins: [addEditMixin],
  props: {
    node: {
      type: Object
    }
  },
  methods: {
    /**
         * @description 获取表单数据
         * @author lvzhiyuan
         * @date 2019/9/2
         */
    async getFormData () {
      try {
        const { data } = await edit({ id: this.node.id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data.entity;
        }
      } catch (e) {
        console.log(`dictionary-getFormData error: ${e}`);
      }
    },
    /**
         * @description 保存表单数据
         * @author lvzhiyuan
         * @date 2019/9/2
         */
    async saveFn () {
      try {
        const btnType = this.node.btnType;
        let res = null;
        switch (btnType) {
          case ADD: { const { id, ...obj1 } = this.formData; const obj = Object.assign({}, obj1, { parentId: this.node.id, type: '0' }); res = await save(obj); break; }
          case ADD_ITEM: { const { id, ...obj1 } = this.formData; const obj = Object.assign({}, obj1, { parentId: this.node.id, type: '0' }); res = await save(obj); break; }
          case ADD_CATEGORY: { const { id, ...obj1 } = this.formData; const obj = Object.assign({}, obj1, { parentId: this.node.id, type: '1' }); res = await save(obj); break; }
          default: { res = await save(this.formData); break; }
        }
        if (res.data.code === process.env.ERR_OPERATE_OK) {
          this.$emit('save');
        }
      } catch (e) {
        console.log(`dictionary-save error: ${e}`);
      }
    }
  },
  watch: {
    node: {
      handler (newVal, oldVal) {
        this.$nextTick(() => {
          this.$refs.ctForm.resetFields();
          this.$refs.ctForm.clearValidate();
        });
        const btnType = this.node.btnType;
        if (btnType === EDIT || btnType === EDIT_ITEM) {
          this.getFormData();
        } else if (btnType === ADD_ITEM) {
          this.parentId = this.node.id;
          this.formData = {
            value: newVal.code,
            color: '#000000',
            icon: '',
            name: newVal.name,
            displayValue: '',
            displayName: '',
            memo: '',
            effectiveFlag: '1'
          };
        } else {
          this.$set(this.formData, 'name', '');
          this.formData = {
            value: '',
            color: '#000000',
            icon: '',
            name: '',
            displayValue: '',
            displayName: '',
            memo: '',
            effectiveFlag: '1'
          };
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
