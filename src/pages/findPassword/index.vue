<template>
  <div class="find-password-container">
<!--    <div class="main-title">广州市交通系统工程建设电子招投标交易平台</div>-->
    <div class="find-password-box">
      <div class="title">
        <p class="main-text">找回密码</p>
        <p class="sub-text" v-if="activeName !== 'second'">请输入您的用户名和手机号</p>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane class="find-password-content" label="手机找回密码" name="first">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
            <el-form-item label="用户名：" prop="userAccount" :rules="[$validate.Required, $validate.UserName]">
              <el-input class="find-password-input" maxlength="20" v-model="ruleForm.userAccount"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="telephone">
              <el-input class="find-password-input" maxlength="11" placeholder="手机号：" v-model="ruleForm.telephone"></el-input>
            </el-form-item>
            <el-form-item label="验证码：" class="message" prop="messageCode" :rules="$validate.Required">
              <el-input class="find-password-input" v-model="ruleForm.messageCode"></el-input>
              <verification-code-btn :params="params" ref="verification" @sendMessage="sendMessage('ruleForm')"></verification-code-btn>
            </el-form-item>
            <el-form-item label="新密码：" prop="password" :rules="rules.pass">
              <el-input class="find-password-input" maxlength="20" type="password" v-model="ruleForm.password" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="checkPass" :rules="rules.checkPass">
              <el-input class="find-password-input" maxlength="20" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <p class="error-msg" v-show="errorMsg">{{ errorMsg }}</p>
            <el-form-item>
              <el-button class="confirm_btn" type="primary" @click="submitForm('ruleForm')">完成</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane class="account-shensu" label="账号申诉" name="second">
          <p>
            <img class="img" src="./img/我的申诉.png" alt="">
          </p>
          <p>通过人工服务可同时找回用户名及密码。</p>
          <p>请下载 <span @click="getPublicUrl('8a7480576dfb33a0016dfb6ab4120002')" class="get-public-url">申请表</span>，填写完毕并盖章扫描后，</p>
          <p>发邮件至：</p>
          <p class="email">yehailian@ebidding.com</p>
          <p>(联系电话：<span class="telephone">020-37860671</span>)</p>
          <p>或</p>
          <p class="email">shixianhong@ebidding</p>
          <p>(联系电话：<span class="telephone">020-37861081</span>)</p>
        </el-tab-pane>
      </el-tabs>
      <div class="tip-container">
        <p class="tips">服务热线：020-39185477 9:00~12:00 14:00~17:00</p>
      </div>
      <div class="footer">
        Copyright© 2012-2019 技术支持: <span class="company">广州穗路交通科技有限公司 </span>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage, getPublicUrl } from 'src/api/registered/registered';
import { retrievePassword } from 'src/api/findPassword/findPassword';
import { gengerateRandom } from 'src/common/js/utils';
import verificationCodeBtn from 'src/components/verification-code-btn';
export default {
  name: 'findPassword',
  data () {
    const validatePass = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]+$/;
      if (value.trim() === '') {
        callback(new Error('* 非空选项'));
      } else if (!reg.test(value)) {
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          setTimeout(() => {
            this.$refs.ruleForm.validateField('checkPass');
          }, 20);
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]+$/;
      if (value.trim() === '') {
        callback(new Error('* 非空选项'));
      } else if (!reg.test(value)) {
        callback(new Error('8-20位数字或字母，区分大小写'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const telephone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入合法的手机号码'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        this.isPhoneState = reg.test(value);
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入合法的手机号码'));
        }
      }
    };
    return {
      errorMsg: '',
      activeName: 'first',
      test: '',
      telephone: '',
      validationState: false,
      validationData: '获取验证码',
      params: {
        seconds: 120
      },
      isPhoneState: false,
      ruleForm: {
        userAccount: '',
        telephone: '',
        messageCode: '',
        password: '',
        checkPass: ''
      },
      rules: {
        telephone: [
          { required: true, message: '* 非空选项', trigger: 'blur' },
          { validator: telephone, message: '请输入合法的手机号码', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '* 非空选项', trigger: 'blur' },
          { min: 8, message: '8-20位数字或字母，区分大小写！', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '* 非空选项', trigger: 'blur' },
          { min: 8, message: '8-20位数字或字母，区分大小写！', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    verificationCodeBtn
  },
  watch: {
    'ruleForm.telephone' (val) {
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
        if (valid !== '请输入合法的手机号码') {
          this.messageId = gengerateRandom();
          this.$refs.verification.getAuthCode();
          const params = {
            telephone: this.ruleForm.telephone,
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
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const params = {
              userAccount: this.ruleForm.userAccount,
              telephone: this.ruleForm.telephone,
              messageId: this.messageId,
              messageCode: this.ruleForm.messageCode,
              password: this.ruleForm.password
            };
            const { data } = await retrievePassword(params);
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.errorMsg = '';
              setTimeout(() => {
                this.$router.push('/login');
              }, 3000);
            } else {
              this.errorMsg = data.msg;
            }
          } catch (e) {
            console.log(`findPassword - retrievePassword error：${e}`);
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$bg-color: #F5F5F5;
$tab-color: #999999;
$tab-active-color: #409EFF;
$email-color: #FF8400;
$telephone-color: #0090DB;
$shensu-color: #666666;
.find-password-container {
  position: relative;
  width: 100%;
  min-height: 100%;
  background: $bg-color;
  overflow-y: auto;

  .main-title{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url("../../common/images/registered_title.png") no-repeat;
    background-size: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 3px;
    color: #fff;
  }
  /deep/.el-form-item__content{
    margin-left: 0;
  }
  .find-password-box {
    width: 900px;
    height: 672px;
    background-color: #fff;
    position: absolute;
    top: 47%;
    left: 50%;
    box-shadow:0px 4px 10px 0px rgba(39,41,46,0.1), 0px 2px 15px 0px rgba(39,41,46,0.1);
    margin-left: -450px;
    margin-top: -300px;
    border-radius: 4px;
    padding: 45px 0 29px 0;
   .title {
     height: 73px;
     margin-bottom: 9px;
     color: #666666;
     .main-text {
       font-size: 30px;
       text-align: center;
       font-weight: 500;
       margin-bottom: 19px;
     }
     .sub-text {
       text-align: center;
       font-size: 18px;
     }
   }
    /deep/ .el-tabs__nav {
      width: 100%;
      display: flex;

      .el-tabs__item {
        width: 50%;
        text-align: center;
        color: $tab-color;
        &.is-active {
          color: $tab-active-color;
        }
      }
    }
    .el-tabs {
      height: 84%;
    }
    /deep/ .el-tabs__header {
      width: 36%;
      margin: 0 auto;
      margin-bottom: 31px;
    }
    .find-password-content {
      width: 50%;
      margin: 10px auto 0 auto;
      position: relative;
      left: -50px;
    }
    /deep/ .el-form-item__label {
      line-height: 46px;
    }
    .find-password-input {
      height: 46px;
      /deep/ input {
        height: 46px;
      }
    }
    .tip-container {
      padding-bottom: 3%;
      .tips {
        color: #9C9C9C;
        font-size: 12px;
        text-align: center;
      }
    }
    .confirm_btn{
      height: 46px;
      background:#409EFF;
      border-radius:3px;
      width: 100%;
    }
    .error-msg {
      color: red;
    }
    .account-shensu {
      left: 0;
      text-align: center;
      .img {
        padding: 4px 0 26px 0;
      }
      p {
        color: $shensu-color;
        font-size: 18px;
        line-height: 2;
      }
      .email {
        color: $email-color;
      }
      .telephone {
        color: $telephone-color;
      }
    }
  }
  .get-public-url{
    color: $telephone-color;
    cursor: pointer;
    text-decoration: underline;
  }
  .footer {
    width: 100%;
    display: inline-block;
    text-align: center;
    margin: 20px 0;
    color: #999999;
    background: #F5F5F5;
    .company {
      color: #0090DB;
    }
  }
}
</style>
