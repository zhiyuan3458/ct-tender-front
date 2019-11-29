export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'tenderBatchName', label: '招标项目名称' },
        { prop: 'tenderBatchCode', label: '招标项目编号' },
        { prop: 'name', label: '标段名称' },
        { prop: 'code', label: '标段编号' },
        { prop: 'sectionProjectType', label: '标段类型' },
        { prop: 'createDate', label: '创建时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' },
        { value: 'edit', name: '编辑', color: '#409EFF' },
        { value: 'remove', name: '删除', color: '#EA4E3D' }
      ]
    };
  }
};
