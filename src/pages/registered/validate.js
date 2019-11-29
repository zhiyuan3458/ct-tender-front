import { isExistCompanyCertificateCode } from 'src/api/registered/registered';

/**
 * @判断是否已经存在社会码
 * @author wenruihuan
 * 2019/9/26
 */
export const existCompanyCertificateCode = async (rule, value, callback) => {
  const params = {
    certificateType: '1',
    socialCreditCode: value
  };
  const { data } = await isExistCompanyCertificateCode(params);
  if (data.data) {
    callback(new Error('该统一社会信用代码已存在！'));
  } else {
    callback();
  }
};
