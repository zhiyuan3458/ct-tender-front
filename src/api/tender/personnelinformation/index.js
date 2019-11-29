import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询人员信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const listJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnel/listJson`, obj);

/**
 * @description 查询人员信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const remove = (obj) => http.post(`${prifix.tender}/td/inforesbase/personnelinfo/personnel/remove`, obj);

/**
 * @description 编辑单个人员信息
 * @author wenruihuan
 * @date 2019/10/29
 */
export const basicinfoEdit = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnel/edit`, obj);
/**
 * @description 保存单个人员信息
 * @author wenruihuan
 * @date 2019/10/29
 */
export const basicinfoSave = (obj) => http.post(`${prifix.tender}/td/inforesbase/personnelinfo/personnel/save`, obj);
/**
 * @description 提交单个人员信息
 * @author wenruihuan
 * @date 2019/10/29
 */
export const basicinfoSubmit = (obj) => http.post(`${prifix.tender}/td/inforesbase/personnelinfo/personnel/submit`, obj);

/**
 * @description 删除个人职称信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const personneltitleRemove = (obj) => http.post(`${prifix.tender}/td/inforesbase/personnelinfo/personneltitle/remove`, obj);

/**
 * @description 查询个人职称信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const personneltitleListJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personneltitle/listJson`, obj);

/**
 * @description 保存个人职称信息接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const personneltitleSave = (obj) => http.post2(`${prifix.tender}/td/inforesbase/personnelinfo/personneltitle/save`, obj);

/**
 * @description 保存个人职业资格信息接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const professionalList = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelqualification/listJson`, obj);

/**
 * @description 查询个人职业资格信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const professionalSave = (obj) => http.post2(`${prifix.tender}/td/inforesbase/personnelinfo/personnelqualification/save`, obj);

/**
 * @description 删除个人职业资格信息接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const professionalRemove = (obj) => http.post(`${prifix.tender}/td/inforesbase/personnelinfo/personnelqualification/remove`, obj);

/**
 * @description  查询个人履历信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const recordList = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelexperience/listJson`, obj);

/**
 * @description 保存个人履历信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const recordSave = (obj) => http.post2(`${prifix.tender}/td/inforesbase/personnelinfo/personnelexperience/save`, obj);

/**
 * @description 删除个人履历信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const recordRemove = (obj) => http.post(`${prifix.tender}/td/inforesbase/personnelinfo/personnelexperience/remove`, obj);

/**
 * @description  查询个人业绩信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const resultsList = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelachievement/listJson`, obj);

/**
 * @description 保存个人业绩信息接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const resultsSave = (obj) => http.post2(`${prifix.tender}/td/inforesbase/personnelinfo/personnelachievement/save`, obj);

/**
 * @description 删除个人业绩信息接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const resultsRemove = (obj) => http.post(`${prifix.tender}/td/inforesbase/personnelinfo/personnelachievement/remove`, obj);

/**
 * @description 查询个人奖励信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const getPersonnelRewardList = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelreward/listJson`, obj);

/**
 * @description 个人表彰信息列表
 * @author wenruihuan
 * @date 2019/10/29
 */
export const getPersonnelCommendation = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelcommendation/listJson`, obj);

/**
 * @description 个人行政处罚信息列表
 * @author wenruihuan
 * @date 2019/10/29
 */
export const getPersonnelPunishment = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelpunishment/listJson`, obj);

/**
 * @description 个人通报批评信息列表
 * @author wenruihuan
 * @date 2019/10/29
 */
export const getPersonnelCriticism = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelcriticism/listJson`, obj);

/**
 * @description 个人违法犯罪行为信息列表
 * @author wenruihuan
 * @date 2019/10/29
 */
export const getPersonnelCrime = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelcrime/listJson`, obj);

/**
 * @description 个人违法犯罪行为信息列表
 * @author wenruihuan
 * @date 2019/10/29
 */
export const getPersonneLevaluation = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelevaluation/listJson`, obj);

/**
 * @description 查询其他奖惩信息列表接口
 * @author wenruihuan
 * @date 2019/10/29
 */
export const getPersonnelRewardPunishment = (obj) => http.get(`${prifix.tender}/td/inforesbase/personnelinfo/personnelrewardpunishment/listJson`, obj);
