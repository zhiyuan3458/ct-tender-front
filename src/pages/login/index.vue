<template>
  <div class="login-container" @keydown.229="() => { return false; }" @keydown.13.prevent="submitForm">
    <div class="login_box">
      <div class="left">
        <img class="banner" src="./img/banner.png" alt="">
      </div>
      <div class="right">
        <div class="title">
          <p>广州市交通系统工程建设电子招投标</p>
          <p>交易平台</p>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleChangeTab">
          <el-tab-pane label="账号登录" name="account">
            <div class="account-box">
              <el-form :model="ruleForm" ref="ruleForm">
                <el-form-item label="" prop="userAccount">
                  <el-input class="login-input" v-model="ruleForm.userAccount">
                    <template slot="prepend">用户名</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                  <el-input class="login-input pwd-input" type="password" v-model="ruleForm.password" autocomplete="off">
                    <template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;码</template>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="CA登录" name="ca">
           <div class="ca-box">
             <el-form :model="caForm" ref="caForm">
               <p class="ca-tip">插入CA进行登录</p>
               <el-form-item label="" prop="caCode">
                 <el-input class="login-input" type="password" v-model="caForm.caCode" autocomplete="off">
                   <template slot="prepend">PIN码</template>
                 </el-input>
               </el-form-item>
             </el-form>
           </div>
          </el-tab-pane>
        </el-tabs>
        <p class="error-msg">{{ errorMsg }}</p>
        <div class="tool-container">
          <el-button class="login-btn" type="primary" @click="submitForm">登录</el-button>
          <div class="text">
            <p class="register-text">
              <router-link to="/registered">立即注册</router-link>
            </p>
            <p class="forget-password-text">
              <router-link to="/findPassword">忘记密码</router-link>
            </p>
          </div>
        </div>
        <div class="tip-container">
          <p class="tips">服务热线：020-39185477 9:00~12:00 14:00~17:00</p>
        </div>
      </div>
      <div class="footer">
        Copyright© 2012-2019 技术支持: <span class="company">广州穗路交通科技有限公司 </span>
      </div>
    </div>
  </div>
</template>

<script>
import { setTokenInCookie, setGetTokenTime, setExpiredTime } from 'src/common/js/cookie';
import { login, caLogin } from 'src/api/login';
import { checkkey, checkPin } from 'src/common/js/ca';
import { resetObj } from 'src/common/js/utils';

export default {
  name: 'login',
  data () {
    return {
      /* 错误提示信息 */
      errorMsg: '',
      flag: false,
      activeName: 'account',
      ruleForm: {},
      caForm: {}
    };
  },
  methods: {
    /**
     * @description 切换tab页
     * @author lvzhiyuan
     * @date 2019/10/18
     */
    handleChangeTab () {
      resetObj(this.ruleForm);
      resetObj(this.caForm);
      this.errorMsg = '';
    },
    /**
     * @description 普通登录
     * @author lvzhiyuan
     * @date 2019/10/14
     */
    submitForm () {
      if (this.activeName === 'account') {
        if (!this.ruleForm.userAccount && !this.ruleForm.password) {
          this.errorMsg = '请输入用户名和密码';
          return false;
        } else if (!this.ruleForm.userAccount) {
          this.errorMsg = '请输入用户名';
          return false;
        } else if (!this.ruleForm.password) {
          this.errorMsg = '请输入密码';
          return false;
        }
        const params = {
          grant_type: 'password',
          client_id: 'browser',
          client_secret: 'browser',
          username: this.ruleForm.userAccount,
          password: this.ruleForm.password
        };
        this.accountLogin(params);
      } else {
        this.caLogin();
      }
    },
    /**
     * @description 账户登录
     * @author lvzhiyuan
     * @date 2019/10/16
     */
    async accountLogin (params) {
      try {
        const { data } = await login(params);
        if (data.code === process.env.ERR_OK) {
          const token = {
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token
          };
          setTokenInCookie(token);
          setGetTokenTime();
          /* 把后台获取到的超时时间设置下（此时单位秒） */
          setExpiredTime(Number(data.data.expires_in));
          this.$router.push('/');
        } else {
          this.errorMsg = data.msg;
        }
      } catch (e) {
        console.log(`login-accountLogin error: ${e}`);
      }
    },
    /**
     * @description ca登录
     * @author lvzhiyuan
     * @date 2019/10/16
     */
    async caLogin () {
      const flag = checkkey();
      if (!flag) {
        this.errorMsg = '请插入CA';
        return false;
      }
      const pin = checkPin(this.caForm.caCode);
      if (!this.caForm.caCode && !pin.flag) {
        this.errorMsg = '请输入正确的密码';
        return false;
      } else {
        const params = {
          grant_type: 'ca',
          client_id: 'browser',
          client_secret: 'browser',
          ca_code: pin.code
        };
        try {
          const { data } = await caLogin(params);
          if (data.code === process.env.ERR_OK) {
            this.errorMsg = '';
            const token = {
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token
            };
            setTokenInCookie(token);
            setGetTokenTime();
            /* 把后台获取到的超时时间设置下（此时单位秒） */
            setExpiredTime(Number(data.data.expires_in));
            this.$router.push('/');
          } else {
            this.errorMsg = data.msg;
          }
        } catch (e) {
          console.log(`calogin error: ${e}`);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
$tab-color: #999999;
$tab-active-color: #409EFF;
.login-container {
  position: relative;
  width: 100%;
  min-height: 100%;
  background: #F5F5F5;
  overflow-y: auto;
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
  .login_box {
    width: 900px;
    height: 622px;
    background-color: #fff;
    position: absolute;
    top: 47%;
    left: 50%;
    margin-left: -450px;
    margin-top: -300px;
    border-radius:4px;
    box-shadow: 0px 4px 10px 0px rgba(39,41,46,0.1), 0px 2px 15px 0px rgba(39,41,46,0.1);
    .left {
      width: 390px;
      height: 622px;
      background-color: #393939;
      float: left;
      border-radius: 8px 0 0 8px;
      img.banner {
        min-width: 100%;
        height: auto;
      }
    }
    .right {
      width: 510px;
      height: 622px;
      float: left;
      padding: 50px 70px 50px 80px;
      text-align: center;
      background: white;
      .title {
        text-align: center;
        line-height: 35px;
        color: #0090DB;
        margin-bottom: 15px;
        font-size: 18px;
        font-weight: 700;
        font-family: 'Microsoft YaHei';
      }
      .login-input {
        height: 46px;
        /deep/ input {
          height: 46px;
        }
      }
      /deep/ .el-tabs__content {
        height: 161px;
      }
      .account-box {
        padding-top: 25px;
        .pwd-input {
          /deep/ .el-input-group__prepend {
            padding: 0 19px;
          }
        }
      }
      .ca-box {
        .ca-tip {
          padding: 42px 0 31px 0;
          color: #666666;
          font-size: 14px;
        }
      }
      .tool-container {
        .login-btn {
          display: block;
          height: 55px;
          width: 360px;
          background-color: #008eff;
          color: #fff;
          text-align: center;
          line-height: 35px;
          font-size: 18px;
          border-radius: 3px;
          margin-top: 30px;
        }
        .text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          color: #0090DB;
          cursor: pointer;
          a {
            color: #0090DB;
          }
        }
      }
      .tip-container {
        padding: 22% 0;
        .tips {
          color: #9C9C9C;
          text-align: center;
        }
      }
    }
    .footer {
      width: 100%;
      display: inline-block;
      text-align: center;
      margin-top: 23px;
      color: #999999;
      background: #F5F5F5;
      .company {
        color: #0090DB;
      }
    }
    .error-msg {
      display: inline-block;
      color: red;
      vertical-align: middle;
    }
  }
}
</style>
