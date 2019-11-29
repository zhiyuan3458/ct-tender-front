export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'name', label: '项目名称' },
        { prop: 'code', label: '项目编号' },
        { prop: 'legalPerson', label: '项目法人' },
        { prop: 'isSynch', label: '是否属于基建平台项目' },
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
