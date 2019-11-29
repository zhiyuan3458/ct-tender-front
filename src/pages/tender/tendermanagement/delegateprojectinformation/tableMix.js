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
        { prop: 'tenderOrganizeForm', label: '招标组织形式' },
        { prop: 'qualificationReviewWay', label: '资格审查方式' },
        { prop: 'createDate', label: '创建时间' },
        { prop: 'accpetStatus', label: '委托状态' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
