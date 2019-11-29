import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description
 * @author wenruihuan
 * 查询个人用户信息列表接口
 * 2019/9/16
 */
export const listUser = (obj) => http.get(`${prifix.backstage}/sys/bs/user/listUser`, obj);

/**
 * @description
 * @author wenruihuan
 * 新增个人用户信息
 * 2019/9/16
 */

export const remove = (obj) => http.post(`${prifix.backstage}/sys/bs/user/remove`, obj);

/**
 * @description
 * @author wenruihuan
 * 编辑个人用户信息
 * 2019/9/16
 */
export const save = (obj) => http.post(`${prifix.backstage}/sys/bs/user/save`, obj);

/**
 * @description
 * @author wenruihuan
 * 获取个人用户信息详情
 * 2019/9/16
 */
export const edit = (obj) => http.get(`${prifix.backstage}/sys/bs/user/edit`, obj);

/**
 * @description
 * @author wenruihuan
 * 获取角色类型获取角色信息列表
 * 2019/9/16
 */
export const listRoleByType = (obj) => http.get(`${prifix.backstage}/sys/bs/role/listRoleByType`, obj);

/**
 * @description
 * @author wenruihuan
 * 获取角色类型获取角色信息列表
 * 2019/9/16
 */
export const rolemenuSave = (obj) => http.post(`${prifix.backstage}/sys/bs/rolemenu/save`, obj);
/**

 *@获取字典树列表
 * @author wenruihuan
 * 2019/9/16
 */
export const getTree = (obj) => http.get(`${prifix.backstage}/sys/bs/rolemenu/getTree`, obj);
