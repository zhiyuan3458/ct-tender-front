import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @编辑其他业绩基本信息接口
 * @author wenruihuan
 * 2019/10/25
 */
export const otherachievementListJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/achievementinfo/otherachievement/listJson`, obj);
/**
 * @查询电子投标分页列表业绩信息接口
 * @author wenruihuan
 * 2019/10/25
 */
export const tenderachievementListJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/achievementinfo/bidderachievement/listJson`, obj);

/**
 * @保存企业基本信息接口
 * @author wenruihuan
 * 2019/10/28
 */
export const save = (obj) => http.post2(`${prifix.tender}/td/inforesbase/companyinfo/company/save`, obj);

/**
 * @description 提交企业基本信息接口
 * @author wenruihuan
 * 2019/10/28
 */
export const submit = (obj) => http.post2(`${prifix.tender}/td/inforesbase/companyinfo/company/submit`, obj);

/**
 * @description 保存其他业绩基本信息
 * @author wenruihuan
 * 2019/11/08
 */
export const achievementinfoSave = (obj) => http.post2(`${prifix.tender}/td/inforesbase/achievementinfo/otherachievement/save`, obj);

/**
 * @description 保存其他业绩基本信息
 * @author wenruihuan
 * 2019/11/08
 */
export const achievementinfoEdit = (obj) => http.get(`${prifix.tender}/td/inforesbase/achievementinfo/otherachievement/edit`, obj);

/**
 * @description 保存其他业绩基本信息
 * @author wenruihuan
 * 2019/11/08
 */
export const achievementinfoSubmit = (obj) => http.post2(`${prifix.tender}/td/inforesbase/achievementinfo/otherachievement/submit`, obj);

/**
 * @description 获取其他业绩项目人员信息列表
 * @author wenruihuan
 * 2019/11/08
 */
export const personneltitleListJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/achievementinfo/achievementpersonnel/listJson`, obj);

/**
 * @description 删除其他业绩项目人员信息列表
 * @author wenruihuan
 * 2019/11/08
 */
export const otherachievementRemove = (obj) => http.post(`${prifix.tender}/td/inforesbase/achievementinfo/otherachievement/remove`, obj);

/**
 * @description 保存其他业绩人员信息
 * @author wenruihuan
 * 2019/11/08
 */
export const personneltitleSave = (obj) => http.post2(`${prifix.tender}/td/inforesbase/achievementinfo/achievementpersonnel/save`, obj);

/**
 * @description 删除项目人员信息
 * @author wenruihuan
 * 2019/11/08
 */
export const personneltitleRemove = (obj) => http.post(`${prifix.tender}/td/inforesbase/achievementinfo/achievementpersonnel/remove`, obj);
