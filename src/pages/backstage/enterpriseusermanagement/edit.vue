<template>
  <!--    编辑-->
  <el-dialog
    title=""
    :visible.sync="isShow"
    :before-close="handleClose"
    :close-on-click-modal="false"
    width="60%"
  >
    <div class="table">
      <el-form ref="editForm" :model="formData" label-width="80px"  >
        <el-form-item label="用户名">
          <el-input v-model="formData.userAccount" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <dictionary-comp
            v-model="formData.companyType"
            code="companyType"
            readonly
          >
          </dictionary-comp>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formData.companyName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-input v-model="formData.userStatus" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rules.pass">
          <el-input maxlength="20" type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :rules="rules.checkPass">
          <el-input maxlength="20" type="password" v-model="formData.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="formData.name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formData.telephone" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.officeTel" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="formData.email" :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleSave">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import { edit, save } from 'src/api/enterpriseUserManagement';
import dictionaryComp from 'src/components/dictionary-component';
export default {
  components: {
    dictionaryComp
  },
  data () {
    /**
     * @description 验证密码是否和确认密码不一致
     * @author lvzhiyuan
     * @date 2019/9/19
     */
    const validatePass2 = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]+$/;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入数字或者字母!'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isShow: false,
      formData: {},
      disabled: true,
      rules: {
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 8, message: '密码不能少于8位！', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { min: 8, message: '密码不能少于8位！', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    /**
     * @description 清楚表单数据
     * @author wenruihuan
     * 2019/9/18
     */
    handleClose () {
      this.$refs.editForm.clearValidate();
      this.$refs.editForm.resetFields();
      this.isShow = false;
    },
    /**
     * @description 获取编辑的信息
     * @author lvzhiyuan
     * @date 2019/10/1
     */
    async getFormData (id) {
      this.isShow = true;
      try {
        const { data } = await edit({ id });
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
          this.formData.companyType = data.data.company.companyType;
        }
      } catch (e) {
        console.log(`enterpriseUserManagement-edit error: ${e}`);
      }
    },
    /**
     * @description 保存新增个人用户信息接口
     * @author wenruihuan
     * 2019/9/18
     */
    handleSave () {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          try {
            const { company, operateBtns, ...params } = this.formData;
            const { data } = await save(params);
            if (data.code === process.env.ERR_OPERATE_OK) {
              setTimeout(() => {
                this.isShow = false;
                this.$emit('save');
                this.handleClose();
              }, 1000);
            }
          } catch (e) {
            console.log(`enterpriseUserManagement-edit-save error: ${e}`);
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
  /deep/.el-form{
    display: flex;
    flex-wrap: wrap;
    .el-form-item{
      width: 50%;
    }
  }
</style>
