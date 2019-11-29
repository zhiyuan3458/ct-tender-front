export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: ''
  },
  mutations: {
    /**
     * @description 刷新主要内容的高度
     * @author lvzhiyuan
     * @date 2019/9/21
     */
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height;
    },
    updateMenuList (state, list) {
      state.menuList = list;
    },
    updateMenuActiveName (state, name) {
      state.menuActiveName = name;
    }
  }
};
