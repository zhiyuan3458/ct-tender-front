import axios from 'axios';
import request from 'src/common/js/request';
import Qs from 'qs';
import { gengerateRandom } from 'src/common/js/utils';

const config2 = { 'Content-Type': 'multipart/form-data' };

/**
 * 把传入的参数变成拼接到url中
 * @author   lvzhiyuan
 * @date     2018/9/21
 * @param    url——API接口
 * @param    params——由参数组成的对象
 */
function joinUrlToParams (url, params) {
  const timeStamp = gengerateRandom();
  url += `?timeStamp=${timeStamp}`;
  Object.keys(params).forEach((item, index) => {
    url += `&${item}=${encodeURI(params[item])}`;
  });
  return url;
}

export default {
  get: (url, params = {}) => {
    url = joinUrlToParams(url, params); return request.get(url);
  },
  post: (url, params = {}) => { return request.post(url, Qs.stringify(params)); },
  post2: (url, params = {}) => { return request.post(url, params); },
  postAsFormData: (url, params = {}) => request.post(url, params, config2),
  getDownloadFiles: (url = '/upload/sys/at/minio/download', params = {}) => {
    url = joinUrlToParams(url, params);
    return axios({
      baseURL: process.env.BASE_URL,
      url: url,
      timeout: 2 * 60 * 60,
      method: 'get',
      responseType: 'blob',
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
  }
};
