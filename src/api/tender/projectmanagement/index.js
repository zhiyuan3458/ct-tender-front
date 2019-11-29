import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 缴费审核 - 项目信息分页列表
 * @author wenruihuan
 * 2019/11/05
 */
export const paycostauditingListPayJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/listPayJson`, obj);

/**
 * @description 缴费审核 - 查询招标项目下的缴费信息分页列表接口
 * @author wenruihuan
 * 2019/11/05
 */
export const tenderapplypayListPayJson = (obj) => http.get(`${prifix.tender}/td/projectmanagement/tenderapplypay/listAuditJson`, obj);
/**
 * @description 缴费审核 - 查看或编辑单个缴费审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const payShowOrEdit = (obj) => http.get(`${prifix.tender}/td/projectmanagement/tenderapplypay/showOrEdit`, obj);
/**
 * @description 缴费审核 - 提交缴费审核信息接口
 * @author wenruihuan
 * 2019/11/05
 */
export const detailsSubmitFn = (obj) => http.post2(`${prifix.tender}/td/projectmanagement/tenderapplypay/audit`, obj);
/**
 * @description 查询公告审核信息分页列表
 * @author wenruihuan
 * 2019/11/05
 */
export const announcementAuditListPayJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tendernotice/listAuditJson`, obj);
/**
 * @description 编辑或查看单个公告审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const announcementAuditShowOrEdit = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tendernotice/showOrEdit`, obj);
/**
 * @description 编辑或查看单个公告审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const announcementAuditAudit = (obj) => http.post2(`${prifix.tender}/td/projectinfobase/tendernotice/audit`, obj);
/**
 * @description 查询中标结果公告审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const winbidnoticeJson = (obj) => http.get(`${prifix.tender}/td/projectmanagement/winbidnotice/listAuditJson`, obj);

/**
 * @description 查询履约审核信息分页列表
 * @author wenruihuan
 * 2019/11/05
 */
export const performancereauditListJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/performanceinfo/performanceinfo/listAuditJson`, obj);

/**
 * @description 查看或编辑单个履约审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const showOrEdit = (obj) => http.get(`${prifix.tender}/td/inforesbase/performanceinfo/performanceinfo/showOrEdit`, obj);
/**
 * @description 查看或编辑单个履约审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const performancereAudit = (obj) => http.post2(`${prifix.tender}/td/inforesbase/performanceinfo/performanceinfo/audit`, obj);
/**
 * @description 查询资格预审结果通知书审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const prequalificationList = (obj) => http.get(`${prifix.tender}/td/projectmanagement/prequalificationresultbulletin/listAuditJson`, obj);
/**
 * @description 查看或编辑单个资格预审结果通知书审核信息接口
 * @author wenruihuan
 * 2019/11/05
 */
export const prequalificationDetails = (obj) => http.get(`${prifix.tender}/td/projectmanagement/prequalificationresultbulletin/showOrEdit`, obj);
/**
 * @description 提交资格预审结果通知书审核信息接口
 * @author wenruihuan
 * 2019/11/05
 */
export const prequalificationAudit = (obj) => http.post2(`${prifix.tender}/td/projectmanagement/prequalificationresultbulletin/audit`, obj);

/**
 * @description 查询中标候选人公示审核信息分页列表接口
 * @author wenruihuan
 * 2019/11/05
 */
export const bidcandidatepublicityList = (obj) => http.get(`${prifix.tender}/td/projectmanagement/bidcandidatepublicity/listAuditJson`, obj);

/**
 * @description 查看或编辑单个中标候选人公示审核信息接口
 * @author wenruihuan
 * 2019/11/05
 */
export const bidcandidatepublicityShowOrEdit = (obj) => http.get(`${prifix.tender}/td/projectmanagement/bidcandidatepublicity/showOrEdit`, obj);

/**
 * @description 提交中标候选人公示审核信息接口
 * @author wenruihuan
 * 2019/11/05
 */
export const bidcandidatepublicityAudit = (obj) => http.post2(`${prifix.tender}/td/projectmanagement/bidcandidatepublicity/audit`, obj);
/**
 * @description 查看或编辑单个中标结果公告审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const bidcandidatepublicityDetails = (obj) => http.get(`${prifix.tender}/td/projectmanagement/winbidnotice/showOrEdit`, obj);
/**
 * @description 提交中标结果公告审核信息接口
 * @author wenruihuan
 * 2019/11/05
 */
export const bidcandidatepublicitySubmit = (obj) => http.post2(`${prifix.tender}/td/projectmanagement/winbidnotice/audit`, obj);
/**
 * @description 查询中标通知书审核信息分页列表
 * @author wenruihuan
 * 2019/11/05
 */
export const winbidbulletinList = (obj) => http.get(`${prifix.tender}/td/projectinfobase/winbidbulletin/listAuditJson`, obj);
/**
 * @description 查看或编辑单个中标通知书审核信息
 * @author wenruihuan
 * 2019/11/05
 */
export const winbidbulletinShowOrEdit = (obj) => http.get(`${prifix.tender}/td/projectinfobase/winbidbulletin/showOrEdit`, obj);/**
 * @description 提交中标通知书审核信息接口
 * @author wenruihuan
 * 2019/11/05
 */
export const winbidbulletinSubmit = (obj) => http.post2(`${prifix.tender}/td/projectinfobase/winbidbulletin/audit`, obj);
