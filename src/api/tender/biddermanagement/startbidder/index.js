import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @description 获取开始投标管理开始投标的接口
 * @author lvzhiyuan
 * @date 2019/11/12
 */
export const bidderListJson = (obj) => http.get(`${prifix.tender}/td/projectinfobase/tenderbatchinfo/bidderRegListJson`, obj);
