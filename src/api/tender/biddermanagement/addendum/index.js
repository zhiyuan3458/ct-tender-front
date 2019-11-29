import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询招标文件补遗书分页列表接口
 * @author lizipei
 * @date 2019/11/27
 */
export const listJson = (obj) => http.get(`${prifix.tender}/td/tendermanagement/tenderaddendum/listJson`, obj);

/**
 * @description 查看补遗书信息接口
 * @author lizipei
 * @date 2019/11/27
 */
export const show = (obj) => http.get(`${prifix.tender}/td/tendermanagement/tenderaddendum/show`, obj);
/**
 * @description 查询招标项目下的所有标段信息接口
 * @author lizipei
 * @date 2019/11/27
 */
export const findByTenderBatch = (obj) => http.get(`${prifix.tender}/td/projectinfobase/section/findByTenderBatch`, obj);
/**
 * @description 发布补遗书信息接口
 * @author lizipei
 * @date 2019/11/27
 */
export const issue = (obj) => http.get(`${prifix.tender}/td/tendermanagement/tenderaddendum/issue`, obj);
