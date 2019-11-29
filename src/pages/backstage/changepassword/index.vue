<template>
  <div class="personalInfo list-container">
    <div class="box-container nav-container">
      <div class="box-header address-header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-s-home"></i>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>密码修改</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="table">
      <el-form ref="ruleForm" :rules="rules" :model="formData" label-width="100px">
        <el-row type="flex" class="row-bg" :gutter="30">
          <el-col :span="8">
            <el-form-item label="原密码" :rules="rules.oldPassword" prop="oldPassword" >
              <el-input maxlength="20" placeholder="请输入原密码" v-model="formData.oldPassword" type="password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="30">
          <el-col :span="8">
            <el-form-item label="新密码" :rules="rules.pass" prop="password" >
              <el-input maxlength="20" placeholder="请输入新密码" v-model="formData.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="30">
          <el-col :span="8">
            <el-form-item label="确认密码" prop="checkPass" :rules="rules.checkPass">
              <el-input maxlength="20" placeholder="请再次输入密码" v-model="formData.checkPass" type="password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <bottom-tool-bar
      @save="saveFn('ruleForm')"
      :is-show-return="false"
    ></bottom-tool-bar>
  </div>
</template>

<script>
import { checkAndChangePassword } from 'src/api/registered/registered';
import bottomToolBar from 'src/components/bottom-tool-bar';
export default {
  name: '/backstage/changepassword',
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
        if (this.formData.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
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
      formData: {
        oldPassword: '',
        password: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { required: true, message: '8-20位数字或字母，区分大小写', trigger: 'blur' },
          { min: 8, message: '8-20位数字或字母，区分大小写', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        oldPassword: [
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
  components: {
    bottomToolBar
  },
  watch: {
  },
  created () {
  },
  methods: {
    /**
     * @验证并修改密码接口
     * @author wenruihuan
     * 2019/10/22
     */
    async saveFn (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const params = { ...this.formData };
            await checkAndChangePassword(params);
          } catch (e) {
            console.log(`backstage-changepassword saveFn error: ${e}`);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .personalInfo{
    .table{
      border-radius: 5px 5px  0 0 ;
      background: #fff;
      padding: 30px 0;
    }
    .bottom-tool-bar{
      position: static;
      margin: 0;
      background: #fff;
      border-radius: 0 0 5px 5px;
    }
  }
</style>
