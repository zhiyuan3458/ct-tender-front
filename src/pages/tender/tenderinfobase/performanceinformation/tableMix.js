export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      otherListColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'tenderProjectName', label: '招标项目名称' },
        { prop: 'sectionName', label: '标段名称' },
        { prop: 'bidderName', label: '中标人名称' },
        { prop: 'contractPriceUnit', label: '合同金额' },
        { prop: 'settlePriceUnit', label: '合同结算金额' },
        { prop: 'contractDeadline', label: '合同期限（天）' },
        { prop: 'actualDeadline', label: '实际履约期限（天）' },
        { prop: 'signDate', label: '合同签署时间' },
        { prop: 'endContractDate', label: '合同完成时间' }
      ],
      electronicListColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'tenderProjectName', label: '招标项目名称' },
        { prop: 'tenderAgencyName', label: '招标代理名称' },
        { prop: 'contractPriceUnit', label: '合同金额' },
        { prop: 'signDate', label: '合同签署时间' }
      ],
      tableBtns: [
        { value: 'view', name: '合同附件', color: '#44C1B9' }
      ]
    };
  }
};
