import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 获取标段信息分页列表信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const tenderListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/section/tenderListJson`, obj);

/**
 * @description 编辑查看标段信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const tenderEdit = (obj) => http.get(`${prifix.tender}/td/projectinfobase/section/tenderEdit`, obj);

/**
 * @description 删除标段信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const remove = (obj) => http.post(`${prifix.tender}/td/projectinfobase/section/remove`, obj);

/**
 * @description 保存标段信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const save = (obj) => http.post2(`${prifix.tender}/td/projectinfobase/section/save`, obj);

/**
 * @description 查询所有招标项目名称
 * @author lizipei
 * @date 2019/11/12
 */
export const findAll = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/findAll`, obj);
