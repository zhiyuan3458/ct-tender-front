<template>
  <!--    新增-->
  <el-dialog
    title=""
    :visible.sync="isShow"
    :before-close="handleClose"
    :close-on-click-modal="false"
    width="60%"
  >
    <div class="table">
      <el-form class="clearfix" ref="addForm" :model="formData" label-width="150px">
        <el-form-item label="企业名称" prop="companyName" :rules="[$validate.Required, $validate.ValidateExistCompanyName]">
          <el-input maxlength="100" v-model="formData.companyName"></el-input>
        </el-form-item>
<!--        <el-form-item label="用户名" prop="userAccount" :rules="[$validate.Required, $validate.FirstEnglish, $validate.MinSix, $validate.ValidateUserAccount, $validate.NotChinese]">-->
        <el-form-item label="用户名" prop="userAccount" :rules="[$validate.UserName, $validate.ValidateUserAccount]">
          <el-input maxlength="20" v-model="formData.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-input disabled v-model="currentRoleBy.currentRoleByTypeName"></el-input>
        </el-form-item>
        <el-form-item label="企业类别" prop="companyCategory">
          <dictionary-comp
            code="companyCategory"
            v-model="formData.companyCategory"
            type="select"
          >
          </dictionary-comp>
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="rules.pass">
          <el-input  maxlength="20" type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :rules="rules.checkPass">
          <el-input  maxlength="20" type="password" v-model="formData.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" :rules="$validate.Required">
          <el-input maxlength="100" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="telephone" :rules="[$validate.Required,$validate.Mobile]">
          <el-input maxlength="11" v-model="formData.telephone"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="socialCreditCode" :rules="[$validate.RightCompanyCertificateCode, $validate.CompanyCertificateCode]">
          <el-input maxlength="18" v-model="formData.socialCreditCode"></el-input>
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
import dictionaryComp from 'src/components/dictionary-component';
import { save } from 'src/api/enterpriseUserManagement';
export default {
  components: {
    dictionaryComp
  },
  data () {
    /**
     * @description 验证密码是否为空
     * @author lvzhiyuan
     * @date 2019/9/19
     */
    const validatePass = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]+$/;
      if (value === '') {
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else if (!reg.test(value)) {
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else {
        if (this.formData.checkPass !== '') {
          setTimeout(() => {
            this.$refs.addForm.validateField('checkPass');
          }, 20);
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
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else if (!reg.test(value)) {
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      currentRoleBy: {
        currentRoleByTypeName: ''
      },
      formData: {
        companyName: '',
        userAccount: '',
        companyCategory: '',
        password: '',
        checkPass: '',
        name: '',
        telephone: '',
        socialCreditCode: ''
      },
      isShow: false,
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
      this.currentRoleBy = val;
      this.isShow = true;
    },
    /**
     * @description 清楚表单数据
     * @author wenruihuan
     * 2019/9/18
     */
    handleClose () {
      this.$refs.addForm.clearValidate();
      this.$refs.addForm.resetFields();
      this.isShow = false;
    },
    /**
     * @description 保存新增个人用户信息接口
     * @author wenruihuan
     * 2019/9/18
     */
    handleSave () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          try {
            this.formData.companyType = this.currentRoleBy.currentRoleByType;
            const { data } = await save(this.formData);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.handleClose();
              this.$emit('save');
              this.handleClose();
            }
          } catch (e) {
            console.log(`enterpriseUserManagement-add-save error: ${e}`);
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
