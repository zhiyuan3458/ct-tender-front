import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import permission from './modules/permission';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    permission
  }
});
