import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * 获取字典树列表
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const getTree = (obj) => http.get(`${prifix.backstage}/sys/bs/dictionary/getTree`, obj);

/**
 * 获取树的数据
 * @author   lvzhiyuan
 * @date     2019/09/03
 */
export const listJson = (obj) => http.get(`${prifix.backstage}/sys/bs/dictionary/listJson`, obj);

/**
 * 保存
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const edit = (obj) => http.get(`${prifix.backstage}/sys/bs/dictionary/edit`, obj);

/**
 * 保存
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const save = (obj) => http.post(`${prifix.backstage}/sys/bs/dictionary/save`, obj);

/**
 * 保存
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const remove = (obj) => http.post(`${prifix.backstage}/sys/bs/dictionary/remove`, obj);

/**
 * @description 根据省份获取城市的数据字典信息列表
 * @author wenruihuan
 * 2019/10/28
 */
export const city = (obj) => http.get(`${prifix.backstage}/sys/bs/dictionary/findByProvince`, obj);
