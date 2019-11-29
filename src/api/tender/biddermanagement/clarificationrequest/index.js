import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询澄清要求分页列表接口
 * @author lizipei
 * @date 2019/11/27
 */
export const listJson = (obj) => http.get(`${prifix.tender}/td/tendermanagement/clarificationreply/listJson`, obj);

/**
 * @description 提交澄清要求提出信息接口
 * @author lizipei
 * @date 2019/11/27
 */
export const edit = (obj) => http.get(`${prifix.tender}/td/tendermanagement/clarificationreply/edit`, obj);

/**
 * @description 查询招标项目下的所有标段信息接口
 * @author lizipei
 * @date 2019/11/27
 */
export const findByTenderBatch = (obj) => http.get(`${prifix.tender}/td/projectinfobase/section/findByTenderBatch`, obj);

/**
 * @description 提交澄清要求提出信息接口
 * @author lizipei
 * @date 2019/11/27
 */
export const submit = (obj) => http.post2(`${prifix.tender}/td/tendermanagement/clarificationreply/submit`, obj);
