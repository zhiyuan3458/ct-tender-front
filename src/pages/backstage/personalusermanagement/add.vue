<template>
  <el-dialog
    title=""
    :visible.sync="isShow"
    :close-on-click-modal="false"
    width="50%"

  >
    <div class="table">
      <el-form class="clearfix" ref="addForm" :model="formData" label-width="100px">
        <el-form-item class="one-row" label="企业名称" prop="companyName" :rules="[$validate.Required]">
          <el-input style="width: 100%;" maxlength="100" v-model="formData.companyName"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userAccount" :rules="[$validate.UserName, $validate.ValidateUserAccount]">
          <el-input maxlength="20" v-model="formData.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-input v-model="currentRoleBy.currentRoleByTypeName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rules.pass">
          <el-input maxlength="20" type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass"  :rules="rules.checkPass">
          <el-input maxlength="20" type="password" v-model="formData.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" :rules="$validate.Required">
          <el-input maxlength="100" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="telephone" :rules="[$validate.Required,$validate.Mobile]">
          <el-input maxlength="11" v-model="formData.telephone"></el-input>
        </el-form-item>
      </el-form>
    </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isShow = false">取 消</el-button>
    <el-button type="primary" @click="handleSave">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
import { save } from 'src/api/personalUserManagement';
export default {
  data () {
    /**
     * @description 验证密码是否为空
     * @author lvzhiyuan
     * @date 2019/9/19
     */
    const validatePass = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]+$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入数字或者字母!'));
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.addForm.validateField('checkPass');
        }
        callback();
      }
    };
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
      currentRoleBy: {},
      formData: {
        companyName: '',
        userAccount: '',
        currentRoleByTypeName: '',
        password: '',
        checkPass: '',
        name: '',
        telephone: ''
      },
      disabled: true,
      rules: {
        pass: [
          { required: true, message: '8-20位数字或字母，区分大小写', trigger: 'blur' },
          { min: 8, message: '8-20位数字或字母，区分大小写', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '8-20位数字或字母，区分大小写', trigger: 'blur' },
          { min: 8, message: '8-20位数字或字母，区分大小写', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    /**
     * @description 初始化
     * @author lvzhiyuan
     * @date 2019/10/1
     */
    handleAdd (val) {
      this.isShow = true;
      this.currentRoleBy = val;
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate();
        this.$refs.addForm.resetFields();
      });
    },
    handleSave () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          try {
            this.formData.userType = this.currentRoleBy.currentRoleByType;
            const { data } = await save(this.formData);
            if (data.code === process.env.ERR_OPERATE_OK) {
              setTimeout(() => {
                this.isShow = false;
                this.$emit('save');
              }, 1000);
            }
          } catch (e) {
            console.log(`personalUserManagement-add-save error: ${e}`);
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
/deep/.el-dialog{
  .el-form-item {
    width: 50%;
    float: left;
  }
  .one-row {
    width: 100%;
  }
  .dialog-footer {
    width: 100%;
    text-align: center;
  }
}
</style>
