import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询企业资质信息列表接口
 * @author lizipei
 * @date 2019/10/29
 */
export const listJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companyqualification/listJson`, obj);

/**
 * @description 保存企业资质信息接口
 * @author lizipei
 * @date 2019/10/29
 */
export const save = (obj) => http.post(`${prifix.tender}/td/inforesbase/companyinfo/companyqualification/save`, obj);

/**
 * @description 删除企业资质信息接口
 * @author lizipei
 * @date 2019/10/29
 */
export const remove = (obj) => http.post(`${prifix.tender}/td/inforesbase/companyinfo/companyqualification/remove`, obj);
