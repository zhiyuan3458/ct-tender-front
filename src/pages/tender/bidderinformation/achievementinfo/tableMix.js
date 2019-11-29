export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      otherListColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'sectionName', label: '标段名称' },
        { prop: 'projectCode', label: '项目类型' },
        { prop: 'constructionNature', label: '项目建设属性' },
        { prop: 'sectionType', label: '标段类型' },
        { prop: 'submitDate', label: '提交时间' }
      ],
      electronicListColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'projectCode', label: '项目编号' },
        { prop: 'tenderProjectName', label: '招标项目名称' },
        { prop: 'tenderProjectCode', label: '招标项目编号' },
        { prop: 'tendererName', label: '招标人名称' },
        { prop: 'tenderAgencyName', label: '招标代理名称' },
        { prop: 'contractPriceUnit', label: '合同金额' },
        { prop: 'signDate', label: '合同签署时间' }
      ],
      otherBtns: [
        { value: 'view', name: '查看', color: '#409EFF' },
        { value: 'edit', name: '编辑', color: '#44C1B9' },
        { value: 'remove', name: '删除', color: '#F56C6C' }
      ],
      electronicTableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
