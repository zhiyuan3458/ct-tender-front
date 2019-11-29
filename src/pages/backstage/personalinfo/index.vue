<template>
  <div class="personalInfo list-container">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="table">
        <el-form ref="personalInfoForm" :model="userInfoData" label-width="80px">
          <el-row type="flex" class="row-bg":gutter="20">
            <el-col :span="12">
              <el-form-item label="用户名">
                <el-input v-model="userInfoData.userAccount" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位名称">
                <el-input v-model="userInfoData.companyName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg":gutter="20">
            <el-col :span="12">

              <el-form-item label="姓名" prop="name" :rules="$validate.Required">
                <el-input maxlength="100" v-model="userInfoData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机" prop="telephone" :rules="[$validate.Required,$validate.Mobile]">
                <el-input maxlength="11" v-model="userInfoData.telephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg":gutter="20">
            <el-col :span="12">

              <el-form-item label="电话" prop="officeTel" :rules="[$validate.Phone]">
                <el-input maxlength="11" v-model="userInfoData.officeTel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">

              <el-form-item label="电子邮箱" prop="email" :rules="[$validate.Email]">
                <el-input v-model="userInfoData.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <bottom-tool-bar
        @save="saveFn"
        :is-show-return="false"
      ></bottom-tool-bar>
    </div>
</template>

<script>
import { edit, save } from 'src/api/registered/registered';
import bottomToolBar from 'src/components/bottom-tool-bar';
export default {
  name: '/backstage/personalinfo',
  data () {
    return {
      userInfoData: {}
    };
  },
  components: {
    bottomToolBar
  },
  watch: {
  },
  created () {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo () {
      try {
        const { data } = await edit();
        if (data.code === process.env.ERR_OK) {
          this.userInfoData = data.data;
        }
      } catch (e) {
        console.log(`personalInfo-getUserInfo error: ${e}`);
      }
    },
    async saveFn () {
      this.$refs.personalInfoForm.validate(async (valid) => {
        if (valid) {
          try {
            const { company, ...params } = this.userInfoData;
            const { data } = await save(params);
            if (data.code === process.env.ERR_OK) {
              this.userInfoData = data.data;
            }
          } catch (e) {
            console.log(`personalInfo-saveFn error: ${e}`);
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
