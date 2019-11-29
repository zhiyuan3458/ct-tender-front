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
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
