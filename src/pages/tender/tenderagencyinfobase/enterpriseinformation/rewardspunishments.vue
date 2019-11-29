<template>
  <div class="Informationbase">
    <div class="info-tips" v-if="params.auditStatus === '待审核'">信息审核中</div>
    <div class="item">
      <div>
        <el-table :data="recognitionData" style="width: 100%" ref="table">
          <el-table-column align="center" prop="typeOfObject" label="奖惩对象类型">
            <template slot-scope="scope">
              <p>{{ rewardPunishmentObjectList.find(m => m.displayValue === scope.row.typeOfObject)
                ? rewardPunishmentObjectList.find(m => m.displayValue === scope.row.typeOfObject).displayName
                : scope.row.typeOfObject }}
              </p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="typeOfRewardPunishment" label="奖惩类型">
            <template slot-scope="scope">
              <p>{{ rewardPunishmentList.find(m => m.displayValue === scope.row.typeOfRewardPunishment)
                ? rewardPunishmentList.find(m => m.displayValue === scope.row.typeOfRewardPunishment).displayName
                : scope.row.typeOfRewardPunishment }}
              </p>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="dateOfRewardPunishment" label="奖惩时间"></el-table-column>
          <el-table-column align="center" prop="contentOfRewardPunishment" label="奖惩内容"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompanyRewardPunishmentList } from 'src/api/company';
import { getDictionaryValue } from 'src/api/common';
import listMixin from 'src/mixins/list';
export default {
  name: 'tenderagencyinfobase',
  props: {
    params: {
      auditStatus: ''
    }
  },
  mixins: [listMixin],
  data () {
    return {
      recognitionData: [],
      rewardPunishmentObjectList: [], // 奖惩对象类型
      rewardPunishmentList: [] // 奖惩类型
    };
  },
  created () {
    this.getCompanyRewardPunishmentList();
    this.getRewardPunishmentObjectList();
    this.getRewardPunishmentList();
  },
  methods: {
    /**
     * @description 获取企业其他奖惩信息列表
     * @author lizipei
     * @date 2019/10/28
     */
    async getCompanyRewardPunishmentList () {
      try {
        const { data } = await getCompanyRewardPunishmentList();
        this.recognitionData = data.data || [];
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 获取奖惩对象类型数据字段
     * @author lizipei
     * @date 2019/10/28
     */
    async getRewardPunishmentObjectList () {
      try {
        const { data } = await getDictionaryValue({ value: 'typeOfObject' });
        this.rewardPunishmentObjectList = data.data || [];
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 获取奖惩类型数据字段
     * @author lizipei
     * @date 2019/10/28
     */
    async getRewardPunishmentList () {
      try {
        const { data } = await getDictionaryValue({ value: 'typeOfRewardPunishment' });
        this.rewardPunishmentList = data.data || [];
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .bidderinformation{
    .title{
      font-size: 24px;
      margin: 20px auto;
    }
  }
</style>
