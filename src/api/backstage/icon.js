import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 获取所有的图标
 * @author lvzhiyuan
 * @date 2019/9/21
 */
export const getAllIcon = (obj = {}) => http.get(`${prifix.backstage}/sys/bs/icon/listAll`, obj);

/**
 * @description 分页获取的图标
 * @author lvzhiyuan
 * @date 2019/9/21
 */
export const getIconList = (obj) => http.post(`${prifix.backstage}/sys/bs/icon/listJson`, obj);

/**
 * 保存
 * @author   lvzhiyuan
 * @date     2019/09/02
 */
export const save = (obj) => http.post2(`${prifix.backstage}/sys/bs/icon/save`, obj);
