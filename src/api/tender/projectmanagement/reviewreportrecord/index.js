import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询评标报告备案信息分页列表接口
 * @author lizipei
 * @date 2019/11/12
 */
export const listAuditJson = (obj) => http.get(`${prifix.tender}/td/projectmanagement/reviewreportrecord/listAuditJson`, obj);

/**
 * @description 编辑或查看单个评标报告备案信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const showOrEdit = (obj) => http.get(`${prifix.tender}/td/projectmanagement/reviewreportrecord/showOrEdit`, obj);

/**
 * @description 备案成功接口
 * @author lizipei
 * @date 2019/11/12
 */
export const audit = (obj) => http.post2(`${prifix.tender}/td/projectmanagement/reviewreportrecord/audit`, obj);
