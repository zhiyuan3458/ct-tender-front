import http from 'src/common/js/http';
import prifix from 'src/common/js/url-prifix';

/**
 * @查询履约信息列表
 * @author wenruihuan
 * 2019/11/04
 */
export const listJson = (obj) => http.get(`${prifix.tender}/td/inforesbase/performanceinfo/performanceinfo/listJson`, obj);

/**
 * @获取所有附件信息
 * @author wenruihuan
 * 2019/11/04
 */

export const getFileList = (obj) => http.get('/upload/sys/at/minio/findByAttachmentId', obj);
/**
 * @查询履约信息列表
 * @author wenruihuan
 * 2019/11/04
 */
export const downFile = (obj) => http.getDownloadFiles('/upload/sys/at/minio/download', obj);
