/**
 * 链接前缀
 * @author   chenguang
 * @date     2018/10/31
 */
const backstagePrefix = '/backstage';
const tenderPrefix = '/tender';
const authorityPrifix = '/authority';

export default {
  // 后台微服务
  backstage: backstagePrefix,
  tender: tenderPrefix,
  // 认证微服务
  authority: authorityPrifix
};

/**
 * @description 把api前缀换成url
 * @author lvzhiyuan
 * @date 2019/9/21
 */
export function getRoutePrefix (url) {
  return url.replace('/', '');
}
