export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'name', label: '项目名称' },
        { prop: 'code', label: '项目编号' },
        { prop: 'ownerName', label: '项目业主单位' },
        { prop: 'isSynch', label: '是否属于基建平台项目' },
        { prop: 'createDate', label: '创建时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
