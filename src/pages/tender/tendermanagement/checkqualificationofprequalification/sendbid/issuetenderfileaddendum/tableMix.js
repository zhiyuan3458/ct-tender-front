export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'sectionName', label: '标段名称' },
        { prop: 'addendumTitle', label: '补遗书标题' },
        { prop: 'addendumType', label: '补遗书类型' },
        { prop: 'versionsShow', label: '版本号' },
        { prop: 'issueDate', label: '发布时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
