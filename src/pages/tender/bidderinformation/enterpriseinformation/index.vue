<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>投标人信息库</el-breadcrumb-item>
            <el-breadcrumb-item>企业信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div class="bidderinformation">
      <el-tabs v-model="selected">
        <el-tab-pane  @click="tabPage('基本信息')" label="基本信息" name="基本信息"></el-tab-pane>
        <el-tab-pane @click="tabPage('人员信息')" label="人员信息" name="人员信息"></el-tab-pane>
        <el-tab-pane @click="tabPage('资质信息')" label="资质信息" name="资质信息"></el-tab-pane>
        <el-tab-pane @click="tabPage('财务信息')" label="财务信息" name="财务信息"></el-tab-pane>
        <el-tab-pane @click="tabPage('奖惩信息')" label="奖惩信息" name="奖惩信息"></el-tab-pane>
        <el-tab-pane @click="tabPage('企业信息变更历史')" label="企业信息变更历史" name="企业信息变更历史"></el-tab-pane>
      </el-tabs>
      <basic-info @setAuditStatus="setAuditStatus"  v-if="'基本信息' === selected">基本信息</basic-info>
      <personnel-information :params="params" v-if="'人员信息' === selected">人员信息</personnel-information>
      <qualification-information :params="params" v-if="'资质信息' === selected">资质信息</qualification-information>
      <financial-information :params="params" v-if="'财务信息' === selected">财务信息</financial-information>
      <rewards-punish  :params="params" v-if="'奖惩信息' === selected">奖惩信息</rewards-punish>
      <history :params="params" v-if="'企业信息变更历史' === selected">企业信息变更历史</history>
    </div>
  </div>
</template>

<script>
// 投标人信息
import basicInfo from 'src/pages/tender/bidderinformation/enterpriseinformation/basicinfo';
import personnelInformation from 'src/pages/tender/bidderinformation/enterpriseinformation/personnelinformation';
import rewardsPunish from 'src/pages/tender/bidderinformation/enterpriseinformation/rewardspunishments';
import qualificationInformation from 'src/pages/tender/bidderinformation/enterpriseinformation/qualificationinformation';
import financialInformation from 'src/pages/tender/bidderinformation/enterpriseinformation/financialinformation';
import history from 'src/pages/tender/bidderinformation/enterpriseinformation/history';
export default {
  name: '/tender/bidderinformation/enterpriseinformation',
  data () {
    return {
      formData: {},
      params: {
        auditStatus: ''
      },
      selected: '基本信息'
    };
  },
  components: {
    basicInfo,
    personnelInformation,
    qualificationInformation,
    financialInformation,
    history,
    rewardsPunish
  },
  created () {
  },
  methods: {
    /**
     * @description 获取审核状态
     * @author wenruihuan
     * 2019/11/4
     */
    setAuditStatus (val) {
      this.params.auditStatus = val;
    },
    /**
     * @页面之间的切换
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
  .bidderinformation{
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
  }
</style>
