export default {
  data () {
    return {
      listConfig: {
        height: 0,
        isShowBtn: true // 是否显示列表的操作栏
      },
      listColumn: [
        { prop: 'name', label: '招标项目名称' },
        { prop: 'code', label: '招标项目编号' },
        { prop: 'sectionNames', label: '标段划分' },
        { prop: 'qualificationReviewWay', label: '资格审查方式' },
        { prop: 'issueNoticeDateStr', label: '公告发布时间' }
      ],
      tableBtns: [
        { value: 'register', name: '登记', color: '#44C1B9' }
      ]
    };
  }
};
