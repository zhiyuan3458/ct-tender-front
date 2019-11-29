import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @编辑企业基本信息接口
 * @author wenruihuan
 * 2019/10/25
 */
export const edit = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companystaff/edit`, obj);

/**
 * @保存企业基本信息接口
 * @author wenruihuan
 * 2019/10/28
 */
export const save = (obj) => http.post2(`${prifix.tender}/td/inforesbase/companyinfo/companystaff/save`, obj);
