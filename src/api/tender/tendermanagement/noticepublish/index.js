import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 编辑资格预审公告信息&招标公告信息接口
 * @author lizipei
 * @date 2019/11/18
 */
export const edit = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tendernotice/edit`, obj);

/**
 * @description 提交资格预审公告信息&招标公告信息接口
 * @author lizipei
 * @date 2019/11/18
 */
export const submit = (obj) => http.post2(`${prifix.tender}/td/projectinfobase/tendernotice/submit`, obj);

/**
 * @description 查询补充公告信息分页列表接口
 * @author lizipei
 * @date 2019/11/18
 */
export const listJsonByTenderBatch = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tendernotice/listJsonByTenderBatch`, obj);
