import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 获取左侧导航栏菜单
 * @author lvzhiyuan
 * @date 2019/11/1
 */
export const getSideBarMenus = (obj = {}) => http.get(`${prifix.backstage}/sys/bs/menu/findMenuByUser`, obj);
