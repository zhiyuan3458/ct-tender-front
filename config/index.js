export default {
  DEFAULT_MSG: '操作成功!',
  ERROR_MSG: '必填项为空或数据格式填写有误!',
  PAGE_SIZE: [20, 50, 100, 500, 1000],
  setting: {
    view: {
      selectedMulti: false,
      showIcon: false,
      expandSpeed: '100'
    },
    check: {
      enable: true
    },
    data: {
      key: {
        name: 'text'
      },
      simpleData: {
        enable: true,
        idKey: 'id',
        pIdKey: 'parentId'
      }
    }
  },
};
