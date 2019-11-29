export default {
  data () {
    return {
      tableData: [],
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'fileTitle', label: '文件标题' },
        { prop: 'ownerName', label: '报文单位' },
        { prop: 'auditDept', label: '审核单位' },
        { prop: 'submitDate', label: '提交时间' },
        { prop: 'auditDate', label: '审核时间' },
        { prop: 'recordStatus', label: '备案状态' }
      ],
      tableBtns: [
        { value: 'show', name: '查看', color: '#44C1B9;' }
      ]
    };
  }
};
