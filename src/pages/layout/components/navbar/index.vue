<template>
<nav class="site-navbar">
    <div class="top">
      <div class="site-navbar__header">
        <h1 class="site-navbar__brand">
          <a class="site-navbar__brand-lg" >广州市交通系统工程建设电子招投标交易平台</a>
          <span class="" style="font-size: 14px;" >{{ userInfo.titleRolename }}</span>
        </h1>
      </div>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
        <span class="welcome">
          <span><i class="el-icon-user-solid"></i> 欢迎：</span>
          <span class="company" :title="userInfo.companyName">{{ userInfo.companyName }}</span>
          <span :title="userInfo.name">{{ userInfo.name }}</span>
        </span>
        <span style="line-height: 52px">今天是：{{date}}</span>
        <span class="log-out" @click="logoutHandle()"><i class="el-icon-switch-button" style="color: red;margin-right:2px;"></i>退出</span>
      </el-menu>
    </div>
  <div class="bottom">
    <ul>
      <li>
        <router-link to="/"><i class="el-icon-s-home"></i>首页</router-link>
        <router-link to="/"><i class="el-icon-alarm-clock"></i>待办事项</router-link>
        <router-link to="/"><i class="el-icon-s-order"></i>政策法规</router-link>
        <router-link to="/"><i class="el-icon-message-solid"></i>通知公告</router-link>
        <router-link to="/"><i class="el-icon-chat-dot-square"></i>问题解答</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import { getFirstPageUserInfo } from 'src/api/common';
import { logout } from 'src/api/login';
import { removeToken } from 'src/common/js/cookie';
export default {
  data () {
    return {
      userInfo: {},
      date: new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日' + this.getWeek(),
      updatePassowrdVisible: false
    };
  },
  created () {
    this.getFirstPageUserInfo();
  },
  methods: {
    getWeek () {
      let week = new Date().getDay();
      if (week === 0) {
        week = '星期日';
      } else if (week === 1) {
        week = '星期一';
      } else if (week === 2) {
        week = '星期二';
      } else if (week === 3) {
        week = '星期三';
      } else if (week === 4) {
        week = '星期四';
      } else if (week === 5) {
        week = '星期五';
      } else if (week === 6) {
        week = '星期六';
      }
      return week;
    },
    /**
     * @description 获取头部登陆人角色信息
     * @author lvzhiyuan
     * @date 2019/10/21
     */
    async getFirstPageUserInfo () {
      try {
        const { data } = await getFirstPageUserInfo();
        if (data.code === process.env.ERR_OK) {
          this.userInfo = data.data;
        }
      } catch (e) {
        console.log(`navbar-getFirstPageUserInfo error: ${e}`);
      }
    },
    /**
     * @退出
     * @author wenruihuan
     * 2019/10/22
     */
    logoutHandle () {
      this.$confirm('确定登出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await logout();
        if (data.code === process.env.ERR_OK) {
          removeToken();
          setTimeout(() => {
            this.$router.replace('/login');
          }, 500);
        }
      }).catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.site-navbar{
  .el-menu {
    background: inherit;
  }
  .top{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .role-name {
      font-size: 14px;
      letter-spacing: 1px;
    }
    .site-navbar__menu--right{
      border-bottom: 0;
      line-height: 30px;
      display: flex;
      .welcome {
        line-height: 52px;
        margin-right: 14px;
        display: flex;
        .company {
          margin-right: 5px;
        }
        span{
          display: inline-block;
          max-width: 280px;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 52px;
          overflow: hidden;
        }
      }
      .log-out {
        display: inline-block;
        margin-left: 10px;
        line-height: 52px;
        cursor: pointer;
        &:hover {
          color: greenyellow;
          transition: .8s;
        }
        .el-icon-switch-button {
          display: inline-block;
          color: red;
          font-size: 17px;
          margin-right: 3px;
        }
      }
    }
  }
  .bottom{
    ul{
      li{
        a{
          color: #fff;
          margin-right: 25px;
          i{
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
