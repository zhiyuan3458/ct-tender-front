export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'sectionName', label: '标段名称' },
        { prop: 'bidderName', label: '投标人名称' },
        { prop: 'submitDate', label: '提交时间' },
        { prop: 'replyDate', label: '答复时间' },
        { prop: 'clarificationStatus', label: '状态' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
