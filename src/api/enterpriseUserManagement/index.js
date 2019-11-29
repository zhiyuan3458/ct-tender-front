import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description
 * @author wenruihuan
 * 查询企业用户信息列表接口
 * 2019/9/19
 */
export const listCompanyUser = (obj) => http.get(`${prifix.backstage}/sys/bs/user/listCompanyUser`, obj);

/**
 * @编辑企业用户信息接口
 * @author wenruihuan
 * 2019/9/19
 */
export const edit = (obj) => http.get(`${prifix.backstage}/sys/bs/user/edit`, obj);

/**
 * @新增企业用户信息接口
 * @author wenruihuan
 * 2019/9/19
 */
export const save = (obj) => http.post(`${prifix.backstage}/sys/bs/user/saveCompanyUser`, obj);

/**
 * @description
 * @author wenruihuan
 * 获取角色类型获取角色信息列表
 * 2019/9/19
 */
export const listRoleByType = (obj) => http.get(`${prifix.backstage}/sys/bs/role/listRoleByType`, obj);

/**
 * @是否存在企业唯一识别代码
 * @author wenruihuan
 * 2019/9/23
 */
export const isExistCompanyCertificateCode = (obj) => http.get(`${prifix.backstage}/sys/bs/company/isExistCompanyCertificateCode`, obj);
