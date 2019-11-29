<template>
  <div class="registered-container">
    <div class="content">
      <div class="main-content">
        <div class="tips">招标人和招标代理账号注册请下载<span class="application_form" @click="getPublicUrl('402862816df753af016df7547bb70000')">申请表</span>完成注册</div>
        <div class="table">
          <el-form ref="ruleForm" :rules="rules" :model="formData" label-width="120px">
            <el-form-item label="企业名称" prop="companyName" :rules="[$validate.Required, $validate.ValidateExistCompanyName]">
              <el-input class="register-input" maxlength="100" v-model="formData.companyName"></el-input>
            </el-form-item>
            <el-form-item label="企业类型">
              <el-input class="register-input" disabled v-model="companyTypeName"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <dictionary-comp
                class="certificateType-input"
                code="certificateType"
                v-model="formData.certificateType"
                type="select"
                @change="selectedClear"
              >
              </dictionary-comp>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="socialCreditCode" v-if ="formData.certificateType === '1'"  :rules="[$validate.Required, $validate.RightCompanyCertificateCode, $validate.CompanyCertificateCode]">
              <el-input class="register-input" maxlength="18" v-model="formData.socialCreditCode"></el-input>
            </el-form-item>
            <el-form-item label="组织机构代码" v-if ="formData.certificateType === '0'" prop="organizationCode" :rules="[$validate.Required, $validate.CompanyCertificateCode, $validate.OrganizationCode]">
              <el-input class="register-input" maxlength="9" v-model="formData.organizationCode"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userAccount" :rules="[$validate.Required, $validate.UserName, $validate.ValidateUserAccount]">
              <el-input class="register-input" maxlength="20" v-model="formData.userAccount"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="rules.pass">
              <el-input class="register-input" maxlength="20" type="password" v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" :rules="rules.checkPass">
              <el-input class="register-input" maxlength="20" type="password" v-model="formData.checkPass"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input class="register-input" maxlength="100" v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="telephone">
              <el-input class="register-input" maxlength="11" v-model="formData.telephone"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="messageCode" class="message" :rules="$validate.Required">
              <el-input class="register-input" v-model="formData.messageCode"></el-input>
              <verification-code-btn :params="params" ref="verification" @sendMessage="sendMessage('ruleForm')"></verification-code-btn>
            </el-form-item>
            <el-form-item class="agreement">
              <el-checkbox v-model="isAgree" name="type">我已阅读并接受</el-checkbox><span class="getUserAgreement" @click="getPublicUrl('8a7480576dfb33a0016dfb6095530000')">用户协议</span>
            </el-form-item>
            <div class="register-button-container">
              <div class="registered-button-wrapper">
                <el-button class="registered_btn" type="primary" size="medium" @click="registBidder('ruleForm')">立即注册</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <footer>
        <div class="footer">Copyright © 2012 - 2019 技术支持: <span class="company">广州穗路交通科技有限公司</span></div>
      </footer>
    </div>
  </div>
</template>

<script>
import dictionaryComp from 'src/components/dictionary-component';
import verificationCodeBtn from 'src/components/verification-code-btn';
import { sendMessage, registBidder, getPublicUrl } from 'src/api/registered/registered';
import { gengerateRandom } from 'src/common/js/utils';
export default {
  name: 'registered',
  components: {
    dictionaryComp,
    verificationCodeBtn
  },
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
    /**
     * @description 手机是否存在
     * @author lvzhiyuan
     * @date 2019/9/19
     */
    const validatetelephone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入合法的手机号码'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        this.isPhoneState = reg.test(value);
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      isAgree: false,
      isPhoneState: false, // 判断手机号是否合格
      params: {
        seconds: 120
      },
      formData: {
        messageCode: '',
        companyName: '',
        companyType: 'B',
        userAccount: '',
        certificateType: '1',
        socialCreditCode: '',
        organizationCode: '',
        telephone: '',
        password: '',
        checkPass: ''
      },
      companyTypeName: '投标单位',
      messageId: gengerateRandom(),
      rules: {
        name: [
          { required: true, message: '*非空选项', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '*非空选项', trigger: 'blur' },
          { min: 8, message: '8-20位数字或字母，区分大小写', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '*非空选项', trigger: 'blur' },
          { min: 8, message: '8-20位数字或字母，区分大小写', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '*非空选项', trigger: 'blur' },
          { validator: validatetelephone, trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    'formData.telephone' (val) {
      if (val.length === 11) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        this.isPhoneState = reg.test(val);
        if (this.isPhoneState) {
          this.$refs.verification.getPhoneState(true);
        } else {
          this.$refs.verification.getPhoneState(false);
        }
      }
    }
  },
  methods: {
    /**
     * @description证件类型切换时，验证信息清楚
     * @author wenruihuan
     * 2019/11/1
     */
    selectedClear () {
      this.$refs.ruleForm.clearValidate('organizationCode');
      this.$refs.ruleForm.clearValidate('socialCreditCode');
    },
    /**
     * @下载附件
     * @author wenruihuan
     * 2019/10/23
     */
    async getPublicUrl (id) {
      try {
        const { data } = await getPublicUrl({ id });
        if (data.code === process.env.ERR_OK) {
          window.location.href = data.data;
        }
      } catch (e) {
        console.log(`registered-getPublicUrl error: ${e}`);
      }
    },
    /**
     * @description
     * @author wenruihuan
     * 获取验证码
     * 2019/9/12
     */
    sendMessage (formName) {
      this.$refs[formName].validateField('telephone', async (valid) => {
        if (valid !== '*非空选项' && valid !== '请输入正确的手机号') {
          this.messageId = gengerateRandom();
          this.$refs.verification.getAuthCode();
          const params = {
            telephone: this.formData.telephone,
            messageId: this.messageId
          };
          try {
            await sendMessage(params);
          } catch (e) {
            console.log(`error: ${e}`);
          }
        }
      });
    },
    /**
     * @description 注册
     * @author wenruihuan
     * @date 2019/9/19
     */
    registBidder (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.isAgree) {
            const params = { ...this.formData, messageId: this.messageId };
            if (this.formData.certificateType === '1') {
              params.socialCreditCode = this.formData.socialCreditCode;
            } else {
              params.organizationCode = this.formData.organizationCode;
            }
            try {
              const { data } = await registBidder(params);
              if (data.code === process.env.ERR_OPERATE_OK) {
                setTimeout(() => {
                  this.$router.push('/login');
                }, 3000);
              }
            } catch (e) {
              console.log(`registBidder error: ${e}`);
            }
          } else {
            this.$alert('请阅读用户协议，并勾选确认!', '提示');
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.registered-container {
  background: #F5F5F5;
  height: 100vh;
  text-align: center;
  overflow-y: auto;
  .content{
    width: 1000px;
    margin: 0 auto;
    padding: 10px 0;
    .main-content {
      border: 1px solid #fff;
      border-radius: 4px;
      box-shadow: 0px 4px 10px 0px rgba(39,41,46,0.1), 0px 2px 15px 0px rgba(39,41,46,0.1);
    }
    .tips{
      padding: 5% 0;
      background: #fff;
      text-align: center;
      font-size: 22px;
      color: #333333;
      width: 1000px;
      .application_form{
        color: red;
        cursor: pointer;
      }
    }
    .table{
      background: #fff;
      width: 1000px;
      margin: 0 auto;
      .el-form-item {
        margin-left: 19%;
        /deep/ .el-form-item__label {
          line-height: 46px;
        }
        /deep/ .el-form-item__content {
          width: 53%;
          .register-input {
            height: 46px;
            input {
              height: 46px;
            }
          }
          .certificateType-input {
            height: 46px;
            input {
              height: 46px;
            }
          }
        }
      }
      /deep/.el-form-item__label{
        font-size: 12px;
        color: #333;
      }
      /deep/.el-select{
        width: 100%;
      }
      .message {
        /deep/.el-form-item__content{
          display: flex;
        }
        button{
          margin-left: 5px;
        }
      }
      .register-button-container {
        border: none;
        width: 1000px;
        margin: 0 auto;
        padding: 0 40px;
        .registered-button-wrapper {
          padding: 20px;
        }
      }
    }
    .agreement {
      text-align: left;
      .getUserAgreement{
        color: #409EFF;
        cursor: pointer;
      }
    }
  }
  .registered_btn{
    background: #409EFF;
    border-radius:3px;
    width: 185px;
  }
  footer{
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .footer {
    width: 100%;
    display: inline-block;
    text-align: center;
    padding-top: 23px;
    color: #999999;
    .company {
      color: #0090DB;
    }
  }
}
</style>
