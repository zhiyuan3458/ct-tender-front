import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';
import { getRefreshToken } from 'src/common/js/cookie';
/**
 * @description 查询数据字典的数据
 * @author lvzhiyuan
 * @date 2019/9/13
 */
export const getDictionaryValue = (obj) => http.get(`${prifix.backstage}/sys/bs/dictionary/findByValue`, obj);

/**
 * access_token过期后通过refresh_token获取新的access_token
 * @author   lvzhiyuan
 * @date     2018/7/26
 * @return   返回Promise对象
 */
export const getTokenByRefreshToken = () => http.post(`${prifix.authority}/oauth/token?grant_type=refresh_token&client_id=browser&scope=browser&client_secret=browser&refresh_token=${getRefreshToken()}`);

/**
 * @description 获取头部登录人的角色信息
 * @author lvzhiyuan
 * @date 2019/10/21
 */
export const getFirstPageUserInfo = () => http.get(`${prifix.backstage}/sys/bs/user/getFirstPageUserInfo`);
