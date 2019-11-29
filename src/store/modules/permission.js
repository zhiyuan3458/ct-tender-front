export default {
  namespaced: true,
  state: {
    routers: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers;
    }
  }
};
