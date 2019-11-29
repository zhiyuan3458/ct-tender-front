<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标代理信息库</el-breadcrumb-item>
            <el-breadcrumb-item>人员信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div class="box-container ">
      <el-tabs v-model="selected">
        <el-tab-pane  @click="tabPage('基本信息')" label="基本信息" name="基本信息"></el-tab-pane>
        <el-tab-pane @click="tabPage('奖惩信息')" label="奖惩信息" name="奖惩信息"></el-tab-pane>
      </el-tabs>
      <basic-info :params="params" v-if="'基本信息' === selected"></basic-info>
      <rewards-punish :params="params" v-if="'奖惩信息' === selected">奖惩信息</rewards-punish>
    </div>
  </div>
</template>

<script>
// 投标人信息库
import basicInfo from 'src/pages/tender/tenderagencyinfobase/personnelinformation/basicinfo';
import rewardsPunish from 'src/pages/tender/tenderagencyinfobase/personnelinformation/rewardspunishments';
export default {
  name: 'tenderagencyinfobase',
  data () {
    return {
      formData: {},
      params: {
        personnelId: '',
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
    rewardsPunish
  },
  created () {
    this.params.personnelId = this.$route.query.personnelId;
    if (this.$route.query.operation === 'view') {
      this.params.operation = true;
    } else if (this.$route.query.operation === 'edit') {
      this.params.operation = false;
    };
  },
  methods: {
    setPersonnelId (val) {
      this.params.personnelId = val;
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
