import http from 'src/common/js/http';
// import prifix from 'src/common/js/url-prifix';

/**
 * @编辑企业基本信息接口
 * @author wenruihuan
 * 2019/10/25
 */
export const edit = (obj) => http.get('/tender/td/inforesbase/companyinfo/company/edit', obj);

/**
 * @保存企业基本信息接口
 * @author wenruihuan
 * 2019/10/28
 */
export const save = (obj) => http.post('/tender/td/inforesbase/companyinfo/company/save', obj);
