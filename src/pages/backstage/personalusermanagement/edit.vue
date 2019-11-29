<template>
  <el-dialog
    title=""
    :visible.sync="isShow"
    :close-on-click-modal="false"
    width="50%"
  >
    <div class="table">
      <el-form class="clearfix" ref="editForm" :model="formData" label-width="100px">
        <el-form-item class="one-row" label="企业名称" prop="companyName">
          <el-input maxlength="100" v-model="formData.companyName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userAccount">
          <el-input maxlength="20" v-model="formData.userAccount" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-input v-model="currentRoleBy.currentRoleByTypeName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rules.pass">
          <el-input maxlength="20"  type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass"  :rules="rules.checkPass">
          <el-input maxlength="20"  type="password" v-model="formData.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input maxlength="100" v-model="formData.name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="telephone">
          <el-input maxlength="11" v-model="formData.telephone" :disabled="disabled"></el-input>
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
import { edit, save } from 'src/api/personalUserManagement/index';
export default {
  data () {
    /**
     * @description 验证密码是否为空
     * @author lvzhiyuan
     * @date 2019/9/19
     */
    const validatePass = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(value)) {
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else {
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
      if (!reg.test(value)) {
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else if (value === '') {
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isShow: false,
      formData: {},
      currentRoleBy: {},
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
     * @description 编辑
     * @author lvzhiyuan
     * @date 2019/10/21
     */
    async handleEdit (id, val) {
      this.currentRoleBy = val;
      this.isShow = true;
      this.$nextTick(() => {
        this.$refs.editForm.clearValidate();
        this.$refs.editForm.resetFields();
      });
      const { data } = await edit({ id });
      try {
        if (data.code === process.env.ERR_OK) {
          this.formData = data.data;
        }
      } catch (e) {
        console.log(`personalUserManagement-edit error: ${e}`);
      }
    },
    /**
     * @description 保存
     * @author lvzhiyuan
     * @date 2019/10/21
     */
    handleSave () {
      this.$refs.editForm.validate(async (valid) => {
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
            console.log(`personalUserManagement-edit-save error: ${e}`);
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
