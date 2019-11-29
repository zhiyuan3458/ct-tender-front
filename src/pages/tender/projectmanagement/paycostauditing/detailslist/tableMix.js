export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'tenderBatchName', label: '招标项目名称' },
        { prop: 'tenderBatchCode', label: '招标项目编号' },
        { prop: 'bidderName', label: '投标人名称' },
        { prop: 'payWay', label: '缴费方式' },
        { prop: 'auditStatus', label: '缴费状态' },
        { prop: 'submitDate', label: '提交时间' },
        { prop: 'auditDate', label: '审核时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' },
        { value: 'edit', name: '编辑', color: '#409EFF' }
      ]
    };
  }
};
