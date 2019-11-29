export default {
  data () {
    return {
      listConfig: {
        height: 0,
        isShowBtn: false
      },
      listColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'tenderProjectName', label: '招标项目名称' },
        { prop: 'tendererName', label: '招标人名称' },
        { prop: 'contractPriceUnit', label: '招标项目合同总金额' },
        { prop: 'proxyPriceUnit', label: '招标项目代理收费金额' },
        { prop: 'signDate', label: '招标项目合同签署时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
