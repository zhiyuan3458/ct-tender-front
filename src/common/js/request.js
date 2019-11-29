/**
 * 创建axios实例
 * @author   lvzhiyuan
 * @date     2018/7/6
 */
import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from 'src/router';
import {
  getToken,
  removeToken,
  setTokenInCookie,
  setGetTokenTime,
  isTokenExpired,
  setExpiredTime,
  tokenKey
} from 'src/common/js/cookie';
import urlPrifix from 'src/common/js/url-prifix';
import { getTokenByRefreshToken } from 'src/api/common';

/* 不需要鉴权token的url */
const noTokenUrl = [
  `${urlPrifix.authority}/oauth/token`,
  `${urlPrifix.authority}/user/browserAccessToken`,
  `${urlPrifix.backstage}/sys/bs/station/getstation`,
  `${urlPrifix.backstage}/sys/bs/dictionary/findByValue`
];

const NO_TOKEN_CODE = [
  100,
  202,
  203,
  204,
  402
];

/* 定义一个全局刷新标志,用于token过期后处理 */
window.isRefreshing = false;
/* 定义一个token过期之后发来的请求收集数组 */
let refreshAPI = [];

/**
 * 把token过期后的请求截取并放到refreshAPI中缓存
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @param    cb——token过期后被截取的请求
 */
function subscribeTokenRefresh (cb) {
  refreshAPI.push(cb);
}

/**
 * 重新执行token过期后发起的请求
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @param    token——access_token
 * @return   返回token过期后发起的请求
 */
function onRrefreshed (token) {
  refreshAPI.map(cb => cb(token));
  refreshAPI = [];
}

/* 创建axios 实例 */
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://192.1.80.38:30700',  'http://192.1.40.58:8080' 叶冠宏 http://192.1.40.30:8080
  baseURL: process.env.NODE_ENV === 'development' ? process.env.BASE_URL : process.env.BASE_URL,
  timeout: process.env.TIMEOUT
});

let loading = null;
/* 请求全局拦截 */
service.interceptors.request.use(config => {
  loading = Loading.service({
    background: 'rgba(255, 255, 255 ,0)'
  });
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  const token = getToken();
  if (token) {
    config.headers[tokenKey] = token;
  }
  if (!noTokenUrl.includes(config.url.split('?')[0])) {
    if (isTokenExpired()) {
      const retry = new Promise((resolve, reject) => {
        /* (token) => {...}这个函数就是cb */
        subscribeTokenRefresh((token) => {
          config.headers[tokenKey] = token;
          /* 将请求挂起 */
          resolve(config);
        });
      });
      if (!window.isRefreshing) {
        window.isRefreshing = true;
        getTokenByRefreshToken().then(({ data }) => {
          loading.close();
          const code = data.code;
          // 无效的刷新令牌
          if (code !== process.env.ERR_OK) {
            Message({
              message: '刷新令牌已过期,请重新登陆',
              type: 'error',
              duration: 3 * 1000
            });
            router.replace('/login');
          } else {
            // 移除原来cookie中的失效token
            removeToken();
            if (data.code === process.env.ERR_OK) {
              setGetTokenTime(); // 设置失效时间
              const token = {
                accessToken: data.data.access_token,
                refreshToken: data.data.refresh_token
              };
              /* 把后台获取到的超时时间设置下（此时单位秒） */
              setExpiredTime(Number(data.data.expires_in));
              setTokenInCookie(token); // 将token存入cookie
              onRrefreshed(getToken());
            }
          }
        }).catch(e => {
          loading.close();
          console.log(`refresh-token error: ${e}`);
          Message({
            message: '请求服务器失败，请联系管理员！',
            type: 'error',
            duration: 3 * 1000
          });
        });
      }
      return retry;
    }
  }
  return config;
}, error => {
  loading.close();
  Message({
    message: '请求失败！',
    type: 'error',
    duration: 3 * 1000
  });
  return Promise.reject(error);
});

/* 响应全局拦截 */
service.interceptors.response.use(
  response => {
    loading.close();
    const code = response.data.code;
    window.isRefreshing = false;
    if (code === process.env.ERR_OPERATE_OK) {
      Message({
        message: response.data.msg,
        type: 'success',
        duration: 3 * 1000
      });
    } else if (code !== process.env.ERR_OK) {
      if (code === process.env.NO_LOGIN_CODE || code === process.env.TOKEN_EXPIRED_CODE) {
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 3 * 1000
        });
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else if (!NO_TOKEN_CODE.includes(code)) {
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 3 * 1000
        });
      }
      if (code === process.env.NO_LOGIN_CODE) {
        removeToken();
        setTimeout(() => {
          router.replace('/login');
        }, 2000);
      }
    }
    return response;
  },
  error => {
    loading.close();
    console.log('response err: ' + error);
    Message({
      message: '请求服务器失败，请联系管理员！',
      type: 'error',
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
