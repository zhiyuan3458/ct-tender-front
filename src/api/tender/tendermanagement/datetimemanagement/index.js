import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 编辑查看招标时间管理信息接口
 * @author lizipei
 * @date 2019/11/25
 */
export const edit = (obj) => http.get(`${prifix.tender}/td/tendermanagement/tendertimemanager/edit`, obj);

/**
 * @description 保存招标时间管理信息接口
 * @author lizipei
 * @date 2019/11/25
 */
export const save = (obj) => http.post2(`${prifix.tender}/td/tendermanagement/tendertimemanager/save`, obj);
