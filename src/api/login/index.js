import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * 账号登录
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const login = (obj) => http.post(`${prifix.authority}/oauth/token`, obj);

/**
 * ca登录
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const caLogin = (obj) => http.post(`${prifix.authority}/ca/token/login`, obj);

/**
 * 退出登录
 * @author   lvzhiyuan
 * @date     2019/10/21
 */
export const logout = (obj) => http.post(`${prifix.authority}/user/logout`, obj);
