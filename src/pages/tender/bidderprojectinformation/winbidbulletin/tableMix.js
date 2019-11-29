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
        { prop: 'sectionName', label: '标段名称' },
        { prop: 'sectionCode', label: '标段编号' },
        { prop: 'ownerName', label: '招标人名称' },
        { prop: 'bidderName', label: '中标人名称' },
        { prop: 'createDate', label: '提交时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
