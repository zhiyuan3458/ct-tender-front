import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询CA信息列表接口
 * @author lvzhiyuan
 * @date 2019/10/22
 */
export const listJson = (obj) => http.get(`${prifix.backstage}/sys/bs/ca/listJson`, obj);

/**
 * @description 解除绑定单个CA接口
 * @author lvzhiyuan
 * @date 2019/10/22
 */
export const remove = (obj) => http.post(`${prifix.backstage}/sys/bs/ca/remove`, obj);

/**
 * @description 保存单个CA信息接口
 * @author lvzhiyuan
 * @date 2019/10/22
 */
export const save = (obj) => http.post(`${prifix.backstage}/sys/bs/ca/save`, obj);
