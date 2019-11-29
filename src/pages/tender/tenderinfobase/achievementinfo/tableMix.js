export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'projectName', label: '项目名称' },
        { prop: 'sectionName', label: '标段名称' },
        { prop: 'projectCode', label: '项目类型' },
        { prop: 'constructionNature', label: '项目建设属性' },
        { prop: 'sectionType', label: '标段类型' },
        { prop: 'submitDate', label: '提交时间' }
      ],
      tableBtns: [
        { value: 'view', name: '查看', color: '#44C1B9' }
      ]
    };
  }
};
