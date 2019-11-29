export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'name', label: '企业名称' },
        { prop: 'companyType', label: '企业类型' },
        { prop: 'socialCreditCode', label: '统一社会信用代码' },
        { prop: 'organizationCode', label: '组织机构代码' },
        { prop: 'auditStatus', label: '状态' },
        { prop: 'submitDate', label: '提交时间' }
      ],
      tableBtns: [
        { value: 'edit', name: '编辑', color: '#409EFF' },
        { value: 'remove', name: '删除', color: '#EA4E3D' }
      ]
    };
  }
};
