import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询项目信息分页列表
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const listJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/projectinfo/listJson`, obj);

/**
 * @description 查看单个项目信息
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const projectInfoJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/projectinfo/show`, obj);

/**
 * @description 查询标段信息分页列表
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const bidstagesListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/section/listJson`, obj);

/**
 * @description 查看单个标段信息
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const bidstagesProjectInfoJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/section/show`, obj);
/**
 * @description 查询中标通知书信息分页列表
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const winbidbulletinListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/winbidbulletin/listJson`, obj);

/**
 * @description 查看单个中标通知书信息
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const winbidbulletinInfoJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/winbidbulletin/show`, obj);
/**
 * @description 查询招标项目分页列表信息
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const tenderbatchinfoListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/listJson`, obj);

/**
 * @description 查看单个招标项目信息
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const tenderbatchinfoInfoJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/show`, obj);
/**
 * @description 查询公告信息分页列表
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const tendernoticeListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tendernotice/listJson`, obj);

/**
 * @description 查看单个公告信息
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const tendernoticeInfoJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tendernotice/show`, obj);
/**
 * @description 查询履约信息分页列表
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const performanceinfoListJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/performanceinfo/performanceinfo/listAllJson`, obj);

/**
 * @description 查看单个履约信息
 * @author wenruihuan
 * 查询企业信息列表接口
 * 2019/11/05
 */
export const performanceinfoInfoJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/performanceinfo/performanceinfo/show`, obj);
