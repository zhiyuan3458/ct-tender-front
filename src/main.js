import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App';
import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
/* 封装的请求 */
import http from 'src/common/js/http';
import * as utils from 'src/common/js/utils';
/* 访问地址前缀 */
import urlPrefix from 'src/common/js/url-prifix';
import validate from 'src/common/js/validate';
import config from '../config';
import 'src/common/stylesheet/index.scss';
import 'src/components/icon-select/svg-icon/iconfont';

Vue.use(Element, { size: 'small' });

Vue.prototype.$http = http;
Vue.prototype.$urlPrefix = urlPrefix;
Vue.prototype.$validate = validate;
Vue.prototype.$config = config;
Vue.prototype.$utils = utils;
/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
});
