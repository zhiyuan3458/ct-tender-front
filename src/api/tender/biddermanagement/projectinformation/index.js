import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 获取招标项目信息分页列表信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const bidderListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/bidderListJson`, obj);

/**
 * @description 提交登记信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const registerList = (obj) => http.get(`${prifix.tender}/td/projectinfobase/section/bidderListJson`, obj);

/**
 * @description 获取登记的标段信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const register = (obj) => http.post2(`${prifix.tender}/td/projectmanagement/tendercompanyregister/register`, obj);
