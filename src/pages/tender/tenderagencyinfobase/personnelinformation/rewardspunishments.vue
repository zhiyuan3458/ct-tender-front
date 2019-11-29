<template>
  <div class="bidderinformation">
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
      <bottom-tool-bar
        @save="saveFn"
        @return="returnFn"
        @submit="submitFn"
        :isShowSave="false"
      ></bottom-tool-bar>
    </div>
  </div>
</template>

<script>
import { getPersonnelRewardPunishment } from 'src/api/tender/personnelinformation';
import { getDictionaryValue } from 'src/api/common';
import bottomToolBar from 'src/components/bottom-tool-bar/index';
export default {
  props: {
    params: {}
  },
  name: 'bidderinformation',
  data () {
    return {
      list: [
        {
          id: 7,
          code: 'PersonnelRewardPunishment',
          tableTitle: '其他奖惩信息',
          tableColumn: [
            { id: 1, prop: 'dateOfRewardPunishment', label: '奖惩时间' },
            { id: 2, prop: 'typeOfObject', label: '奖惩对象' },
            { id: 3, prop: 'typeOfRewardPunishment', label: '奖惩类型' },
            { id: 4, prop: 'contentOfRewardPunishment', label: '奖惩内容' }
          ],
          tableData: [],
          fn: getPersonnelRewardPunishment
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
  components: {
    bottomToolBar
  },
  created () {
    if (this.params.personnelId !== '') {
      this.getList();
      this.getDictionaryList();
    }
  },
  methods: {
    /**
     * @description 获取列表数据
     * @author lizipei
     * @date 2019/10/29
     */
    getList () {
      this.list.forEach((item) => {
        item.fn({ personnelId: this.params.personnelId }).then(({ data }) => {
          this.$set(item, 'tableData', data.data);
        }).catch(e => {
          console.log(`bidderinformation-${item.code} error: ${e}`);
        });
      });
    },
    /**
     * @返回列表页
     * @author wenruihuan
     * 2019/10/28
     */
    returnFn () {
      this.$router.go(-1);
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
          if (this.params.personnelId) {
            this.$emit('setPersonnelId', data.data.personnelId);
          };
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
    margin-bottom: 60px;
    .title {
      font-size: 14px;
      margin: 20px auto;
      border-bottom: 2px solid #409EFF;
      display: inline-block;
      line-height: 30px;
    }
  }
</style>
