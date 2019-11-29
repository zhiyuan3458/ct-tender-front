export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'ownerName', label: '招标人名称' },
        { prop: 'noticeType', label: '公告类型' },
        { prop: 'noticeNature', label: '公告性质' },
        { prop: 'submitDate', label: '提交时间' },
        { prop: 'auditDate', label: '审核时间' },
        { prop: 'auditStatus', label: '公告状态' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' },
        { value: 'edit', name: '编辑', color: '#409EFF' }
      ]
    };
  }
};
