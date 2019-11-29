<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标信息库</el-breadcrumb-item>
            <el-breadcrumb-item>业绩信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div class="box-container ">
      <el-tabs v-model="selected">
        <el-tab-pane  @click="tabPage('基本信息')" label="基本信息" name="基本信息"></el-tab-pane>
        <el-tab-pane @click="tabPage('项目人员信息')" label="项目人员信息" name="项目人员信息"></el-tab-pane>
        <el-tab-pane @click="tabPage('项目分专业信息')" label="项目分专业信息" name="项目分专业信息"></el-tab-pane>
      </el-tabs>
      <basic-info :params="params" v-if="'基本信息' === selected"></basic-info>
      <project @setPersonnelId="setPersonnelId" :params="params" v-if="'项目人员信息' === selected"></project>
      <rewards-punish @setPersonnelId="setPersonnelId" :params="params" v-if="'项目分专业信息' === selected"></rewards-punish>
    </div>
  </div>
</template>

<script>
// 投标代理信息库
import basicInfo from 'src/pages/tender/bidderinformation/achievementinfo/basicinfo';
import project from 'src/pages/tender/bidderinformation/achievementinfo/projectpersonnelinformation';
import rewardsPunish from 'src/pages/tender/bidderinformation/personnelinformation/rewardspunishments';
export default {
  name: 'tenderagencyinfobase',
  data () {
    return {
      formData: {},
      params: {
        otherAchievementId: '',
        operation: {
          type: Boolean,
          default: false
        }
      },
      selected: '基本信息'
    };
  },
  components: {
    basicInfo,
    rewardsPunish,
    project
  },
  created () {
    this.params.otherAchievementId = this.$route.query.otherAchievementId;
    if (this.$route.query.operation === 'view') {
      this.params.operation = true;
    } else if (this.$route.query.operation === 'edit') {
      this.params.operation = false;
    };
  },
  methods: {
    setPersonnelId (val) {
      this.params.otherAchievementId = val;
    },
    /**
       * @description 页面之间的切换
       * @author wenruihuan
       * 2019/10/27
       */
    tabPage (val) {
      this.selected = val;
    }
  }
};
</script>

<style scoped lang="scss">
  .tenderagencyinfobase{
    background: #fff;
    padding: 20px;
  }
  .list-container{
    .table-container{
      .box-header{
        padding: 0;
        border-bottom: 0;
        height: 25px;
        line-height: 25px;
        position: relative;
        span{
          display: inline-block;
          line-height: 25px;
          margin-top: 5px;
          border-bottom: 1px solid #1E7CF1;
        }
        button{
          position: absolute;
          right: 0;
          top: 10px;
        }
      }
      .box-body{
        padding: 20px 0
      }
      .box-body{
        padding: 20px 0;
        .name{
          margin-right: 10px;
        }
      }
    }
    .box-container{
      /deep/.el-tabs{
        padding: 0 10px;
      }
    }
  }
  .bidderinformation{
    padding: 0 10px;
  }
</style>
