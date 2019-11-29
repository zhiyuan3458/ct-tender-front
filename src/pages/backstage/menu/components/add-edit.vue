<template>
    <div class="add-edit-container1">
        <div class="form-container">
                <el-form :model="formData" ref="ctForm" label-width="150px">
                    <el-row type="flex" class="row-bg":gutter="20">
                        <el-col :span="12">
                            <el-form-item label="编码" prop="code" :rules="[$validate.Required]">
                                <el-input class="form-input" v-model="formData.code"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="名称" prop="name" :rules="[$validate.Required]">
                                <el-input class="form-input" v-model="formData.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg":gutter="20">
                        <el-col :span="12">
                            <el-form-item label="是否有效" prop="effectiveFlag" :rules="[$validate.RequiredChange]">
                                <dictionary-comp
                                  v-model="formData.effectiveFlag"
                                  code="yesNo"
                                  type="radio"
                                >
                                </dictionary-comp>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否为子系统" prop="systemFlag" :rules="[$validate.RequiredChange]">
                              <dictionary-comp
                                v-model="formData.systemFlag"
                                code="yesNo"
                                type="radio"
                              >
                              </dictionary-comp>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg":gutter="20">
                        <el-col :span="12">
                            <el-form-item label="是否为模块" prop="moduleFlag" :rules="[$validate.RequiredChange]">
                              <dictionary-comp
                                v-model="formData.moduleFlag"
                                code="yesNo"
                                type="radio"
                              >
                              </dictionary-comp>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="图标" prop="imgName">
                              <icon-select v-model="formData.imgName"></icon-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="row-bg">
                      <el-col :span="12">
                        <el-form-item label="路由" prop="frontRouter">
                          <el-input class="form-input" v-model="formData.frontRouter"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="组件路径" prop="frontFilePath">
                          <el-input class="form-input" v-model="formData.frontFilePath"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg">
                      <el-col :span="24">
                        <el-form-item label="(页面)权限操作按钮" prop="operateBtns">
                          <dictionary-comp
                            v-model="formData.operateBtns"
                            code="operateBtn"
                            type="checkbox"
                          >
                          </dictionary-comp>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                      <el-form-item label="modelType" prop="modelType" :rules="[$validate.RequiredChange]">
                        <dictionary-comp
                          v-model="formData.modelType"
                          code="modelType"
                          type="select"
                        >
                        </dictionary-comp>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="row-bg">
                    <el-col>
                      <el-form-item label="url" prop="url">
                        <el-input class="form-input" v-model="formData.url"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="row-bg">
                      <el-col :span="24">
                          <el-form-item label="备注" prop="memo">
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
            :is-show-return="false"
        >
        </bottom-tool-bar>
    </div>
</template>

<script>
import addEditMixin from 'src/mixins/add-edit';
import bottomToolBar from 'src/components/bottom-tool-bar';
import dictionaryComp from 'src/components/dictionary-component';
import iconSelect from 'src/components/icon-select';
import { edit, save } from 'src/api/backstage/menu';
import { ADD } from '../constant';
export default {
  components: {
    bottomToolBar,
    dictionaryComp,
    iconSelect
  },
  data () {
    return {
      formData: {
        code: '',
        name: '',
        imgName: '',
        url: '',
        frontRouter: '',
        systemFlag: '',
        moduleFlag: '',
        modelType: '',
        effectiveFlag: '',
        memo: '',
        operateBtns: '',
        frontFilePath: ''
      }
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
        console.log(`menu-getFormData error: ${e}`);
      }
    },
    /**
         * @description 保存表单数据
         * @author lvzhiyuan
         * @date 2019/9/2
         */
    saveFn () {
      try {
        const btnType = this.node.btnType;
        let res = null;
        this.$refs.ctForm.validate(async (valid) => {
          if (valid) {
            switch (btnType) {
              case ADD: { const obj = Object.assign({}, this.formData, { parentId: this.node.parentId }); res = await save(obj); break; }
              default: { res = await save(this.formData); break; }
            }
            if (res.data.code === process.env.ERR_OPERATE_OK) {
              this.$emit('save');
            }
          } else {
            // this.$message({
            //   message: this.$config.ERROR_MSG,
            //   type: 'warning'
            // });
            return false;
          }
        });
      } catch (e) {
        console.log(`menu-save error: ${e}`);
      }
    }
  },
  watch: {
    node: {
      handler (newVal) {
        this.$nextTick(() => {
          this.$refs.ctForm.resetFields();
          this.$refs.ctForm.clearValidate();
        });
        if (newVal.id) {
          this.getFormData({ id: newVal.id });
        } else {
          this.formData = {
            code: '',
            name: '',
            imgName: '',
            url: '',
            frontRouter: '',
            systemFlag: '',
            moduleFlag: '',
            modelType: '',
            effectiveFlag: '',
            memo: '',
            operateBtns: '',
            frontFilePath: ''
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
