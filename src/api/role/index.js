import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @角色管理保存接口
 * @author wenruihuan
 * 2019/9/16
 */
export const save = (obj) => http.post(`${prifix.backstage}/sys/bs/role/save`, obj);

/**
 * @角色管理获取详情接口
 * @author wenruihuan
 * 2019/9/16
 */
export const edit = (obj) => http.get(`${prifix.backstage}/sys/bs/role/edit`, obj);
