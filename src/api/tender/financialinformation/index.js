import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询企业财务信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const listJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/finance/listJson`, obj);

/**
 * @description 保存企业财务信息接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const save = (obj) => http.post(`${prifix.tender}/td/inforesbase/companyinfo/finance/save`, obj);

/**
 * @description 删除企业财务信息接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const remove = (obj) => http.post(`${prifix.tender}/td/inforesbase/companyinfo/finance/remove`, obj);
