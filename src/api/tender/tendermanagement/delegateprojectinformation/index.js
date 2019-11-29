import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 获取委托项目信息分页列表信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const agencyListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/agencyListJson`, obj);

/**
 * @description 查看单个委托项目信息-项目信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const showProjectInfo = (obj) => http.get(`${prifix.tender}/td/projectinfobase/projectinfo/showProjectInfo`, obj);

/**
 * @description 查看单个委托项目信息接口-招标项目信息和招标代理信息
 * @author lizipei
 * @date 2019/11/12
 */
export const show = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/show`, obj);

/**
 * @description 查看单个委托项目信息-标段信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const showSection = (obj) => http.get(`${prifix.tender}/td/projectinfobase/section/showSection`, obj);

/**
 * @description 保存项目信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const acceptOrReject = (obj) => http.post(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/acceptOrReject`, obj);
