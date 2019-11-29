import http from 'src/common/js/http';

/**
 * @description
 * @author wenruihuan
 * 获取注册验证码
 * 2019/9/12
 */
export const retrievePassword = (obj) => http.post('/backstage/sys/bs/user/retrievePassword', obj);
