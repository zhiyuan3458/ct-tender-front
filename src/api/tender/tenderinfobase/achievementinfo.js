import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @编辑其他业绩基本信息接口
 * @author wenruihuan
 * 2019/10/25
 */
export const tenderListJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/achievementinfo/tenderachievement/tenderListJson`, obj);
