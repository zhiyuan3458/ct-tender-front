import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询企业信息变更历史列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const list = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companyhis/listJson`, obj);

/**
 * @description 查看企业历史详情接口
 * @author lizipei
 * @date 2019/10/28
 */
export const show = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companyhis/show`, obj);
/**
 * @编辑其他业绩基本信息接口
 * @author wenruihuan
 * 2019/10/25
 */
export const tenderAgencyListJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/achievementinfo/tenderachievement/tenderAgencyListJson`, obj);
