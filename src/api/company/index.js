import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/9/19
 */
export const listJson = (obj) => http.get(`${prifix.backstage}/sys/bs/company/listJson`, obj);

/**
 * @description 企业编辑
 * @author lvzhiyuan
 * @date 2019/9/30
 */
export const edit = (obj) => http.get(`${prifix.backstage}/sys/bs/company/edit`, obj);

/**
 * @description 新增企业用户信息接口
 * @author wenruihuan
 * 2019/9/19
 */
export const save = (obj) => http.post(`${prifix.backstage}/sys/bs/company/save`, obj);

/**
 * @description 查询企业其他奖惩信息列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const getCompanyRewardPunishmentList = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companyrewardpunishment/listJson`, obj);

/**
 * @description 查询企业信用评价信息列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const getCompanyCreditEvaluationList = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companycreditevaluation/listJson`, obj);

/**
 * @description 查询企业违法犯罪行为信息列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const getCompanyCrimeList = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companycrime/listJson`, obj);

/**
 * @description 查询企业工程质量和安全生产监管信息列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const getCompanyQualityProductionList = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companyqualityproduction/listJson`, obj);

/**
 * @description 查询企业通报批评信息列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const getCompanyCriticismList = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companycriticism/listJson`, obj);

/**
 * @description 查询企业行政处罚信息列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const getCompanyPunishmentList = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companypunishment/listJson`, obj);

/**
 * @description 查询企业表彰信息列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const getCompanyCommendationList = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companycommendation/listJson`, obj);

/**
 * @description 查询企业奖励信息列表接口
 * @author lizipei
 * @date 2019/10/28
 */
export const getCompanyRewardList = (obj) => http.get(`${prifix.tender}/td/inforesbase/companyinfo/companyreward/listJson`, obj);
