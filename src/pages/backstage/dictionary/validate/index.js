import http from 'src/common/js/http';
import urlPrifix from 'src/common/js/url-prifix';

/**
 * @判断是否已经存在编码
 * @author wenruihuan
 * 2019/9/26
 */
export const isOnlyOneCode = async (rule, value, callback) => {
  const { data } = await http.get(`${urlPrifix.backstage}/sys/bs/dictionary/checkValue`, { value });
  if (data.data) {
    callback(new Error('该统编码已存在！'));
  } else {
    callback();
  }
};
