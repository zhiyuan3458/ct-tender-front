import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询文件备案信息
 * @author lizipei
 * @date 2019/11/12
 */
export const listAuditJson = (obj) => http.get(`${prifix.tender}/td/projectmanagement/filerecordinfo/listAuditJson`, obj);

/**
 * @description 编辑或查看单个文件备案信息接口
 * @author lizipei
 * @date 2019/11/12
 */
export const showOrEdit = (obj) => http.get(`${prifix.tender}/td/projectmanagement/filerecordinfo/showOrEdit`, obj);

/**
 * @description 备案成功接口
 * @author lizipei
 * @date 2019/11/12
 */
export const audit = (obj) => http.post2(`${prifix.tender}/td/projectmanagement/filerecordinfo/audit`, obj);
