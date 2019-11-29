import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * 获取字典树列表
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const getTree = (obj) => http.get(`${prifix.backstage}/sys/bs/dictionary/findByValue`, obj);

/**
 * 验证并修改密码接口
 * @author wenruihuan
 * 2019/9/12
 */
export const checkAndChangePassword = (obj) => http.post('/backstage/sys/bs/user/checkAndChangePassword', obj);
/**
 * 获取个人信息
 * @author wenruihuan
 * 2019/9/12
 */
export const edit = (obj) => http.get('/backstage/sys/bs/user/getCurrentUser', obj);
/**
 * @description
 * @author wenruihuan
 * 获取注册验证码
 * 2019/9/12
 */
/**
 * 保存个人信息
 * @author wenruihuan
 * 2019/9/12
 */
export const save = (obj) => http.post('/backstage/sys/bs/user/save', obj);
/**
 * @description
 * @author wenruihuan
 * 获取注册验证码
 * 2019/9/12
 */
export const sendMessage = (obj) => http.post('/backstage/sys/bs/user/sendMessage', obj);

/**
 * @description
 * @author wenruihuan
 * 验证用户账号是否存在
 * 2019/9/12
 */

export const isExistUserAccount = (obj) => http.get('/backstage/sys/bs/user/isExistUserAccount', obj);

/**
 * @description
 * @author wenruihuan
 * 验证用户账号是否存在
 * 2019/9/12
 */

export const registBidder = (obj) => http.post('/backstage/sys/bs/user/registBidder', obj);

/**
 * 验证企业名称是否存在
 * @author   wenruihuan
 * @date     2019/09/11
 */
export const isExistCompanyName = (obj) => http.get('/backstage/sys/bs/company/isExistCompanyName', obj);

/**
 * @是否存在企业唯一识别代码
 * @author wenruihuan
 * 2019/9/23
 */
export const isExistCompanyCertificateCode = (obj) => http.get(`${prifix.backstage}/sys/bs/company/isExistCompanyCertificateCode`, obj);

/**
 * @获取首页需要显示的用户信息
 * @author wenruihuan
 * 2019/9/23
 */
export const getFirstPageUserInfo = (obj) => http.get(`${prifix.backstage}/sys/bs/user/getFirstPageUserInfo`, obj);

/**
 * @下载申请表
 * @author wenruihuan
 * 2019/10/23
 */
export const getPublicUrl = (obj) => http.get('/upload/sys/at/minio/getPublicUrl', obj);
