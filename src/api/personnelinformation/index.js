import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 查询项目信息分页列表
 * @author wenruihuan
 * 2019/11/5
 */
export const listJson = (obj) => http.post(`${prifix.tender}/td/inforesbase/projectinfo/listJson`, obj);
