<template>
  <div class="verification-code-btn" ref="verificationCode">
    <span v-show="sendAuthCode" :class="isPhoneState ? 'auth_text auth_text_blue' : 'auth_text' "  @click="sendMessage">获取验证码</span>
    <span v-show="!sendAuthCode" class="auth_text">重新发送（{{authTime}}）</span>
  </div>
</template>

<script>
export default {
  name: 'verificationCodeBtn',
  props: {
    params: {
      seconds: 0
    }
  },
  data () {
    return {
      authTime: this.params.seconds,
      isPhoneState: false,
      sendAuthCode: true,
      authTimetimer: true
    };
  },
  created () {
  },
  methods: {
    /**
     * @开启验证码按钮倒计时
     * @author wenruihuan
     * 2019/10/24
     */
    getAuthCode () {
      const oldTime = this.authTime;
      this.sendAuthCode = false;
      this.authTimetimer = setInterval(() => {
        this.authTime--;
        if (this.authTime <= 0) {
          this.sendAuthCode = true;
          this.authTime = oldTime;
          clearInterval(this.authTimetimer);
        }
      }, 1000);
    },
    sendMessage () {
      this.$emit('sendMessage');
    },
    /**
     * @手机号码验证状态时，改变按钮状态
     * @author wenruihuan
     * 2019/10/24
     */
    getPhoneState (val) {
      this.isPhoneState = val;
    }
  }
};
</script>

<style lang="scss" scoped>
  .verification-code-btn{
    span{
      display: inline-block;
      line-height: 46px;
      height: 46px;
      background: #909399;
      color: #fff;
      font-size: 12px;
      border-radius: 0px 5px 5px 0;
      position: absolute;
      padding: 0 10px;
      right: 0;
      top: 0;
    }
    .auth_text_blue{
      cursor: pointer;
      background: #409EFF;
    }
  }
</style>
