export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'projectName', label: '招标项目名称' },
        { prop: 'projectCode', label: '招标项目编号' },
        { prop: 'tenderBatchName', label: '登记标段' },
        { prop: 'tenderBatchCode', label: '资格审查方式' },
        { prop: 'name', label: '登记状态' },
        { prop: 'code', label: '登记时间' },
        { prop: 'ownerName', label: '招标项目阶段' }
      ],
      tableBtns: [
        { value: 'audit', name: '资审', color: '#409EFF' },
        { value: 'bidder', name: '投标', color: '#409EFF' }
      ]
    };
  }
};
