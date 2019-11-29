import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Layout from 'src/pages/layout/layout';
import urlPrefix from 'src/common/js/url-prifix';
import service from 'src/common/js/http';
import { getToken, removeToken } from 'src/common/js/cookie';
const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(VueRouter);
/**
 * URL地址
 * @param {*} s
 */
function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s);
}

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  // { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('login/index'), name: 'login', meta: { title: '登录' } },
  { path: '/registered', component: _import('registered/index'), name: 'registered', meta: { title: '注册' } },
  { path: '/findPassword', component: _import('findPassword/index'), name: 'findPassword', meta: { title: '忘记密码' } }
];

const mainRoutes = {
  path: '/',
  component: Layout,
  name: 'layout',
  meta: {
    title: '主入口整体布局',
    modelType: '主菜单'
  }
};

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: globalRoutes.concat(mainRoutes),
  // 是否已经添加动态(菜单)路由
  isAddDynamicMenuRoutes: false
});

const WHITE_URL = [
  '/findPassword',
  '/login',
  '/registered'
];

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token) {
    removeToken();
    if (WHITE_URL.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  } else {
    // 添加动态路由
    if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
      /* 为批次菜单（非主菜单时进入该逻辑） */
      if (to.meta.modelType !== '主菜单' && JSON.stringify(from.query) !== '{}' && to.fullPath !== sessionStorage.getItem('frontRouter')) {
        /* 记住to的位置，再进来的话就不给了 */
        sessionStorage.setItem('frontRouter', to.fullPath);
        next({ ...to, query: from.query });
      } else {
        next();
      }
    } else {
      service.get(`${urlPrefix.backstage}/sys/bs/menu/getFrontRouter`).then(({ data }) => {
        if (data.code === process.env.ERR_OK) {
          const menuList = data.data.listMenuTree;
          store.commit('permission/SET_ROUTERS', menuList);
          fnAddDynamicMenuRoutes(menuList);
          router.options.isAddDynamicMenuRoutes = true;
          sessionStorage.setItem('menuList', JSON.stringify(menuList || '[]'));
          next({ ...to, replace: true });
        } else {
          sessionStorage.setItem('menuList', '[]');
          next();
        }
      }).catch((e) => {
        console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue');
        router.push('/login');
      });
    }
  }
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  let temp = [];
  for (let i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global';
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children);
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main';
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  let temp = [];
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children);
    } else if (menuList[i].frontRouter) {
      const route = {
        path: menuList[i].frontRouter,
        component: null,
        name: menuList[i].code,
        meta: {
          menuId: menuList[i].id,
          title: menuList[i].name,
          modelType: menuList[i].modelType
        }
      };
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].path)) {
        route.path = `i-${menuList[i].menuId}`;
        route.name = `i-${menuList[i].menuId}`;
        route.meta.iframeUrl = menuList[i].frontRouter;
      } else {
        try {
          route.component = _import(`${menuList[i].frontFilePath}`) || null;
        } catch (e) {
          console.log(`调整route格式 error: ${e}`);
        }
      }
      routes.push(route);
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes);
  } else {
    mainRoutes.children = routes;
    mainRoutes.name = 'main-dynamic';
    router.addRoutes([
      mainRoutes
      // { path: '*', redirect: { name: '404' } }
    ]);
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'));
    console.log('\n');
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue');
    console.log(mainRoutes.children);
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue');
  }
}

export default router;
