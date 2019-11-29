export default {
  data () {
    return {
      listConfig: {
        height: 0
      },
      listColumn: [
        { prop: 'userAccount', label: '用户名' },
        { prop: 'name', label: '姓名' },
        { prop: 'telephone', label: '手机' },
        { prop: 'userStatus', label: '账号状态' },
        { prop: 'telephone', label: '手机' }
      ],
      tableBtns: [
        { value: 'edit', name: '编辑', color: '#409EFF' },
        { value: 'remove', name: '删除', color: '#EA4E3D' }
      ]
    };
  }
};
