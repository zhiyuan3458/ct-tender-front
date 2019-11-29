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
        { prop: 'ownerName', label: '报名单位' },
        { prop: 'auditDept', label: '审核单位' },
        { prop: 'recordStatus', label: '备案状态' },
        { prop: 'submitDate', label: '提交时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' },
        { value: 'edit', name: '编辑', color: '#409EFF' }
      ]
    };
  }
};
