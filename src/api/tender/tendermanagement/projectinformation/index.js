import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询项目信息分页列表信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const tenderListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/projectinfo/tenderListJson`, obj);

/**
 * @description 编辑查看项目信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const tenderEdit = (obj) => http.get(`${prifix.tender}/td/projectinfobase/projectinfo/tenderEdit`, obj);

/**
 * @description 保存项目信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const save = (obj) => http.post2(`${prifix.tender}/td/projectinfobase/projectinfo/save`, obj);

/**
 * @description 删除项目信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const remove = (obj) => http.post(`${prifix.tender}/td/projectinfobase/projectinfo/remove`, obj);
