export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'projectCode', label: '项目编号' },
        { prop: 'tenderBatchName', label: '招标项目名称' },
        { prop: 'tenderBatchCode', label: '招标项目编号' },
        { prop: 'name', label: '招标组织形式' },
        { prop: 'code', label: '资格审查方式' },
        { prop: 'ownerName', label: '创建时间' }
      ],
      tableBtns: [
        { value: 'audit', name: '资审', color: '#409EFF' },
        { value: 'tender', name: '招标', color: '#409EFF' }
      ]
    };
  }
};
