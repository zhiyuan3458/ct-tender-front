export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'projectCode', label: '项目编号' },
        { prop: 'name', label: '招标项目名称' },
        { prop: 'code', label: '招标项目编号' },
        { prop: 'ownerName', label: '招标人名称' },
        { prop: 'issueNoticeDate', label: '公告发布时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
