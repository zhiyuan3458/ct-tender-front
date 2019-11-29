import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 获取招标项目信息分页列表信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const tenderListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/tenderListJson`, obj);

/**
 * @description 查看单个招标项目信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const tenderEdit = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/tenderEdit`, obj);

/**
 * @description 提交代理接口
 * @author lizipei
 * @date 2019/11/12
 */
export const submitToAgency = (obj) => http.post(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/submitToAgency`, obj);

/**
 * @description 删除项目信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const remove = (obj) => http.post(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/remove`, obj);

/**
 * @description 保存招标项目信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const save = (obj) => http.post2(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/save`, obj);

/**
 * @description 查询所有项目名称接口
 * @author lizipei
 * @date 2019/11/12
 */
export const findAll = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/findAll`, obj);

/**
 * @description 查询所有招标代理信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const findTenderAgency = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/findTenderAgency`, obj);
