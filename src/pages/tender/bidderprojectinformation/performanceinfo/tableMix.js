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
        { prop: 'name', label: '标段名称' },
        { prop: 'code', label: '标段编号' },
        { prop: 'ownerName', label: '项目业主单位' },
        { prop: 'tenderType', label: '招标类型' },
        { prop: 'sectionProjectType', label: '标段类型' },
        { prop: 'createDate', label: '创建时间' }
      ],
      tenderListColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'projectCode', label: '项目编号' },
        { prop: 'tenderProjectName', label: '招标项目名称' },
        { prop: 'tenderProjectCode', label: '招标项目编号' },
        { prop: 'sectionName', label: '标段名称' },
        { prop: 'sectionCode', label: '标段编号' },
        { prop: 'tendererName', label: '招标人名称' },
        { prop: 'bidderName', label: '中标人名称' },
        { prop: 'signDate', label: '合同签署时间' }
      ],
      entrustListColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'projectCode', label: '项目编号' },
        { prop: 'tenderProjectName', label: '招标项目名称' },
        { prop: 'tenderProjectCode', label: '招标项目编号' },
        { prop: 'tendererName', label: '招标人名称' },
        { prop: 'tenderAgencyName', label: '招标代理名称' },
        { prop: 'contractPriceUnit', label: '合同金额' },
        { prop: 'signDate', label: '合同签署时间' }
      ],
      tableBtns: [
        { value: 'down', name: '合同附件', color: '#44C1B9' }
      ],
      entrustTableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
