<template>
  <div class="Informationbase">
    <div class="info-tips" v-if="params.auditStatus === '待审核'">信息审核中</div>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="title">{{ item.tableTitle }}</div>
      <div>
        <el-table :data="item.tableData" style="width: 100%" :ref="`table${item.id}`">
          <el-table-column v-for="col in item.tableColumn" :key="col.id" align="center" :prop="col.prop" :label="col.label">
            <template slot-scope="scope">
              <p>{{ formatDictionary(scope.row[col.prop], col.prop) }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCompanyCommendationList, getCompanyCreditEvaluationList, getCompanyCrimeList,
  getCompanyCriticismList, getCompanyPunishmentList, getCompanyQualityProductionList,
  getCompanyRewardList, getCompanyRewardPunishmentList
} from 'src/api/company';
import { getDictionaryValue } from 'src/api/common';
export default {
  name: 'bidderinformation',
  props: {
    params: {
      auditStatus: ''
    }
  },
  data () {
    return {
      list: [
        {
          id: 1,
          code: 'CompanyReward',
          tableTitle: '企业奖励信息',
          tableColumn: [
            { id: 1, prop: 'yearOfAward', label: '奖项年度' },
            { id: 2, prop: 'name', label: '奖项名称' },
            { id: 3, prop: 'level', label: '奖项类别' },
            { id: 4, prop: 'awardLevel', label: '获奖等级' },
            { id: 5, prop: 'rankOfCompany', label: '企业排名' },
            { id: 6, prop: 'certificateCode', label: '证书编号' },
            { id: 7, prop: 'numberOfAward', label: '奖项文号' },
            { id: 8, prop: 'participationAttribute', label: '参建属性' },
            { id: 9, prop: 'issueDept', label: '发布单位' },
            { id: 10, prop: 'issueDate', label: '发布日期' },
            { id: 11, prop: 'contentOfAward', label: '奖项内容' }
          ],
          tableData: [],
          fn: getCompanyRewardList
        },
        {
          id: 2,
          code: 'CompanyCommendationList',
          tableTitle: '企业表彰信息',
          tableColumn: [
            { id: 1, prop: 'yearOfCommendation', label: '表彰年度' },
            { id: 2, prop: 'name', label: '表彰名称' },
            { id: 3, prop: 'level', label: '表彰类别' },
            { id: 4, prop: 'certificateCode', label: '证书编号' },
            { id: 5, prop: 'numberOfCommendation', label: '表彰文号' },
            { id: 6, prop: 'certificateCode', label: '证书编号' },
            { id: 7, prop: 'participationAttribute', label: '参建属性' },
            { id: 8, prop: 'issueDept', label: '发布单位' },
            { id: 9, prop: 'issueDate', label: '发布日期' },
            { id: 10, prop: 'contentOfCommendation', label: '表彰内容' }
          ],
          tableData: [],
          fn: getCompanyCommendationList
        },
        {
          id: 3,
          code: 'CompanyPunishmentList',
          tableTitle: '企业行政处罚信息',
          tableColumn: [
            { id: 1, prop: 'titleOfPunishment', label: '行政处罚标题' },
            { id: 2, prop: 'level', label: '行政处罚类别' },
            { id: 3, prop: 'performanceCode', label: '不良(失信)行为代码' },
            { id: 4, prop: 'deductionScore', label: '扣分分值' },
            { id: 5, prop: 'numberOfPunishment', label: '处罚文号' },
            { id: 6, prop: 'punishDept', label: '处罚单位' },
            { id: 7, prop: 'punishDate', label: '处罚日期' },
            { id: 8, prop: 'contentOfPunishment', label: '处罚内容' },
            { id: 9, prop: 'expireDate', label: '失效日期' },
            { id: 10, prop: 'cancelDate', label: '撤销日期' },
            { id: 11, prop: 'cancelDept', label: '撤销单位' }
          ],
          tableData: [],
          fn: getCompanyPunishmentList
        },
        {
          id: 4,
          code: 'CompanyCriticismList',
          tableTitle: '企业通报批评信息',
          tableColumn: [
            { id: 1, prop: 'titleOfCriticism', label: '通报批评标题' },
            { id: 2, prop: 'level', label: '通报批评类别' },
            { id: 3, prop: 'performanceCode', label: '不良(失信)行为代码' },
            { id: 4, prop: 'deductionScore', label: '扣分分值' },
            { id: 5, prop: 'numberOfCriticism', label: '通报批评文号' },
            { id: 6, prop: 'contentOfCriticism', label: '通报批评内容' },
            { id: 7, prop: 'criticismDept', label: '通报单位' },
            { id: 8, prop: 'criticismDate', label: '通报日期' },
            { id: 9, prop: 'validDate', label: '有效期至' },
            { id: 10, prop: 'cancelDate', label: '撤销日期' },
            { id: 11, prop: 'cancelDept', label: '撤销单位' }
          ],
          tableData: [],
          fn: getCompanyCriticismList
        },
        {
          id: 5,
          code: 'CompanyQualityProductionList',
          tableTitle: '企业工程质量和安全生产监管信息',
          tableColumn: [
            { id: 1, prop: 'title', label: '标题' },
            { id: 2, prop: 'issueDept', label: '公布单位' },
            { id: 3, prop: 'issueDate', label: '公布日期' },
            { id: 4, prop: 'validDate', label: '有效期至' },
            { id: 5, prop: 'content', label: '内容' },
            { id: 6, prop: 'cancelDate', label: '撤消日期' },
            { id: 7, prop: 'cancelReason', label: '撤消原因' }
          ],
          tableData: [],
          fn: getCompanyQualityProductionList
        },
        {
          id: 6,
          code: 'CompanyCrimeList',
          tableTitle: '企业违法犯罪行为信息',
          tableColumn: [
            { id: 1, prop: 'titleOfCrime', label: '违法犯罪行为标题' },
            { id: 2, prop: 'contentOfCrime', label: '违法犯罪内容' },
            { id: 3, prop: 'performanceCode', label: '不良(失信)行为代码' },
            { id: 4, prop: 'severityOfCrime', label: '违法犯罪严重程度' },
            { id: 5, prop: 'handleResult', label: '处理结果' },
            { id: 6, prop: 'identifyDept', label: '违法犯罪认定单位' },
            { id: 7, prop: 'executeDate', label: '违法犯罪执行日期' },
            { id: 8, prop: 'cancelDate', label: '撤销日期' }
          ],
          tableData: [],
          fn: getCompanyCrimeList
        },
        {
          id: 7,
          code: 'CompanyCreditEvaluationList',
          tableTitle: '企业信用评价信息',
          tableColumn: [
            { id: 1, prop: 'yearOfEvaluation', label: '评价年份' },
            { id: 2, prop: 'participationAttribute', label: '评价类型' },
            { id: 3, prop: 'evaluationLevel', label: '评价级别' },
            { id: 4, prop: 'administrativeRegion', label: '评价所在行政区划' },
            { id: 5, prop: 'evaluationOrganization', label: '评价机构' },
            { id: 6, prop: 'biddingScore', label: '投标行为得分' },
            { id: 7, prop: 'performanceScore', label: '履约行为得分' },
            { id: 8, prop: 'otherDeduction', label: '其他行为扣分' },
            { id: 9, prop: 'ministerialDeduction', label: '部级扣分' },
            { id: 10, prop: 'projectNum', label: '项目数' },
            { id: 11, prop: 'contractPrice', label: '合同价' },
            { id: 12, prop: 'totalScore', label: '总分' },
            { id: 13, prop: 'creditLevel', label: '信用等级' }
          ],
          tableData: [],
          fn: getCompanyCreditEvaluationList
        },
        {
          id: 8,
          code: 'CompanyRewardPunishmentList',
          tableTitle: '其他奖惩信息',
          tableColumn: [
            { id: 1, prop: 'dateOfRewardPunishment', label: '奖惩时间' },
            { id: 2, prop: 'typeOfObject', label: '奖惩对象类型' },
            { id: 3, prop: 'typeOfRewardPunishment', label: '奖惩类型' },
            { id: 4, prop: 'contentOfRewardPunishment', label: '奖惩内容' }
          ],
          tableData: [],
          fn: getCompanyRewardPunishmentList
        }
      ],
      dictionaryList: [
        { id: 1, name: '奖项类别/表彰类别/行政处罚类别/通报批评类别', code: 'level', list: [] },
        { id: 2, name: '获奖等级', code: 'awardLevel', list: [] },
        { id: 3, name: '参建属性/评价类型', code: 'participationAttribute', list: [] },
        { id: 4, name: '违法犯罪严重程度', code: 'severityOfCrime', list: [] },
        { id: 5, name: '评价级别', code: 'evaluationLevel', list: [] },
        { id: 6, name: '评价所在行政区划', code: 'administrativeRegion', list: [] },
        { id: 7, name: '奖惩对象类型', code: 'typeOfObject', list: [] },
        { id: 8, name: '奖惩类型', code: 'typeOfRewardPunishment', list: [] }
      ]
    };
  },
  created () {
    this.getList();
    this.getDictionaryList();
  },
  methods: {
    /**
     * @description 获取列表数据
     * @author lizipei
     * @date 2019/10/29
     */
    getList () {
      this.list.forEach((item) => {
        item.fn().then(({ data }) => {
          this.$set(item, 'tableData', data.data);
        }).catch(e => {
          console.log(`bidderinformation-${item.code} error: ${e}`);
        });
      });
    },
    /**
     * @description 获取数据字典
     * @author lizipei
     * @date 2019/10/29
     */
    getDictionaryList () {
      this.dictionaryList.forEach(async item => {
        if (!item.code) {
          return;
        }
        try {
          const { data } = await getDictionaryValue({ value: item.code });
          this.$set(item, 'list', data.data);
        } catch (e) {
          console.log(`bidderinformation-${item.code} error: ${e}`);
        }
      });
    },
    /**
     * @description 转换数据字典的值
     * @author lizipei
     * @date 2019/10/29
     */
    formatDictionary (value, code) {
      let result = value;
      // 如果是数据字典的字段才进行格式转换
      const item = this.dictionaryList.find(m => m.code === code);
      if (item) {
        const obj = item.list.find(m => m.displayValue === value);
        // 如果没找到对应的转换值则显示原来的返回值
        result = obj && obj.displayName ? obj.displayName : value;
      }
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
  .bidderinformation{
    .title {
      font-size: 14px;
      margin: 20px auto;
      border-bottom: 2px solid #409EFF;
      display: inline-block;
      line-height: 30px;
    }
  }
</style>
