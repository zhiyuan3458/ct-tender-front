import Cookies from 'js-cookie';
import router from 'src/router';
export const tokenKey = 'tenderToken';
const refreshTokenKey = 'REFRESH_TOKEN';
const getTokenTimeKey = 'GET_TOKEN_TIME';
const getExpiredTimeKey = 'GET_EXPIRE_TIME';

/**
 * @description 获取cookie
 * @author lvzhiyuan
 * @date 2019/9/29
 */
export function getToken () {
  return Cookies.get(tokenKey);
}

/**
 * @description 获取cookie
 * @author lvzhiyuan
 * @date 2019/9/29
 */
export function getRefreshToken () {
  return Cookies.get(refreshTokenKey);
}

/**
 * @description 设置cookie
 * @author lvzhiyuan
 * @date 2019/9/29
 */
export function setTokenInCookie (token) {
  Cookies.set(tokenKey, `${tokenKey} ${token.accessToken}`);
  Cookies.set(refreshTokenKey, token.refreshToken);
}

/**
 * @description 清除cookie
 * @author lvzhiyuan
 * @date 2019/9/29
 */
export function removeToken () {
  Cookies.remove(refreshTokenKey);
  Cookies.remove(tokenKey);
  Cookies.remove(getTokenTimeKey);
  router.options.isAddDynamicMenuRoutes = false;
}

/**
 * @description 设置获取token时的时间
 * @author lvzhiyuan
 * @date 2019/9/29
 */
export function setGetTokenTime () {
  Cookies.set(getTokenTimeKey, Number(new Date().getTime()));
}

/**
 * @description 设置超时时段
 * @author lvzhiyuan
 * @date 2019/9/26
 */
export function setExpiredTime (data) {
  /* 提前五分钟刷新token */
  const tempTime = 5 * 60;
  /* 转为毫秒 */
  const expired = (Math.floor(Number(data)) - tempTime) * 1000;
  Cookies.set(getExpiredTimeKey, expired);
}

/**
 * @descript 获取超时时段
 * @author lvzhiyuan
 * @date 2019/9/26
 */
export function getExpiredTime () {
  return Cookies.get(getExpiredTimeKey);
}

/**
 * @description 获取当前时间
 * @author lvzhiyuan
 * @date 2019/9/29
 */
export function getGetTokenTime () {
  return Cookies.get(getTokenTimeKey);
}

/**
 * 判断access_token是否过期
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @return   返回Boolean值
 */
export function isTokenExpired () {
  /* 毫秒之间的较量了，这里没有秒这个单位 */
  const expiredTime = parseInt(getExpiredTime());
  const getTokenTime = getGetTokenTime();
  return new Date().getTime() - Number(getTokenTime) > expiredTime;
}
