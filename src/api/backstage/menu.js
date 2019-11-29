import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 获取菜单模块左侧树列表
 * @author lvzhiyuan
 * @date 2019/9/21
 */
export const getTree = (obj) => http.get(`${prifix.backstage}/sys/bs/menu/getTree`, obj);

/**
 * 编辑
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const edit = (obj) => http.post(`${prifix.backstage}/sys/bs/menu/edit`, obj);

/**
 * 拖拽
 * @author   lvzhiyuan
 * @date     2019/11/21
 */
export const dragDrop = (obj) => http.post(`${prifix.backstage}/sys/bs/menu/dragDrop`, obj);

/**
 * 保存
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const save = (obj) => http.post(`${prifix.backstage}/sys/bs/menu/save`, obj);

/**
 * 删除
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const remove = (obj) => http.post(`${prifix.backstage}/sys/bs/menu/remove`, obj);
