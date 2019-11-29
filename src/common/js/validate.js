import { isExistCompanyCertificateCode, isExistCompanyName, isExistUserAccount } from 'src/api/registered/registered';
/**
 * 常用的表单验证正则规则——验证8位整数
 * @author   lvzhiyuan
 * @date     2018/7/8
 */

function validateRequiredFn (rule, value, callback) {
  setTimeout(() => {
    if (!value || value === ' ') {
      callback(new Error('* 非空选项!'));
    } else {
      callback();
    }
  });
};

/**
 * @description
 * @author wenruihuan
 * 2019/10/15
 */
function validateFirstEnglishFn (rule, value, callback) {
  function validate (num) {
    const reg = /^[A-Za-z]/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入数字值!'));
    } else {
      callback();
    }
  });
}
/**
 * @description 输入值不能为中文
 * @author wenruihuan
 * 2019/10/15
 */
function validateNotChineseFn (rule, value, callback) {
  function validate (num) {
    const reg = /[\u-\u4e00\u9fa5-\uffff]+/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('输入值不能为中文!'));
    } else {
      callback();
    }
  });
}
function validateNumberFn (rule, value, callback) {
  function validate (num) {
    const reg = /^-?[1-9]\d{0,7}$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入数字值!'));
    } else {
      callback();
    }
  });
};

/**
 * 常用的表单验证正则规则——检验8位正整数
 * @author   lvzhiyuan
 * @date     2018/7/8
 */

function validatePositiveIntegerFn (rule, value, callback) {
  function validate (num) {
    const reg = /^[1-9]\d{0,7}$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入8位正整数!'));
    } else {
      callback();
    }
  });
};

/**
 * 常用的表单验证正则规则——检验19位整数
 * @author   lvzhiyuan
 * @date     2018/7/8
 */

function validateLongFn (rule, value, callback) {
  function validate (num) {
    const reg = /^-?[1-9]\d{0,18}$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入19位正整数!'));
    } else {
      callback();
    }
  });
};
/**
 * 实现统一社会信用代码的效验(组织机构代码效验)
 * @author   lvzhiyuan
 * @date     2018/7/8
 */

function socialCreditCode (rule, value, callback) {
  var patrn = /^[0-9A-Z]+$/;
  // 18位校验及大写校验
  if ((value.length !== 18) || (patrn.test(value) === false)) {
    callback(new Error('不是有效的统一社会信用编码！'));
    return false;
  } else {
    var Ancode; // 统一社会信用代码的每一个值
    var Ancodevalue; // 统一社会信用代码每一个值的权重
    var total = 0;
    var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]; // 加权因子
    var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
    // 不用I、O、S、V、Z
    for (var i = 0; i < value.length - 1; i++) {
      Ancode = value.substring(i, i + 1);
      Ancodevalue = str.indexOf(Ancode);
      total = total + Ancodevalue * weightedfactors[i];
      // 权重与加权因子相乘之和
    }
    var logiccheckcode = 31 - total % 31;
    if (logiccheckcode === 31) {
      logiccheckcode = 0;
    }
    var Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y';
    var arrayStr = Str.split(',');
    logiccheckcode = arrayStr[logiccheckcode];
    var checkcode = value.substring(17, 18);
    if (logiccheckcode !== checkcode) {
      callback(new Error('不是有效的统一社会信用编码！'));
      return false;
    } else {
    }
    return true;
  }
};

/**
 * 常用的表单验证正则规则——检验19位正整数
 * @author   lvzhiyuan
 * @date     2018/7/8
 */

function validatePositiveLongFn (rule, value, callback) {
  function validate (num) {
    const reg = /^[1-9]\d{0,18}$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入19位正整数!'));
    } else {
      callback();
    }
  });
};

/* 检测是否字符串 */
function validateStringFn (rule, value, callback) {
  function validate (str) {
    const reg = /^[\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w\\.\\s]+$/;
    return reg.test(str);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入字符值!'));
    } else {
      callback();
    }
  });
};

/* 检测是否为邮政编码 */
function validatepostCodeFn (rule, value, callback) {
  function validate (postCode) {
    const reg = /^[0-9]{6}$/;
    return reg.test(postCode);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入正确的邮箱编码!'));
    } else {
      callback();
    }
  });
};

/* 检测是否为手机号码 */
function validateMobileFn (rule, value, callback) {
  function validate (mobile) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return reg.test(mobile);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入合法的手机号码'));
    } else {
      callback();
    }
  });
};

/* 检测是否为邮箱格式 */
function validateEmailFn (rule, value, callback) {
  function validate (email) {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(email);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入正确的邮箱!'));
    } else {
      callback();
    }
  });
};

/* 检测是否为url */
function validateUrlFn (rule, value, callback) {
  function validate (url) {
    const reg = /^(\w+:\/\/)?\w+(\.\w+)+.*$/;
    return reg.test(url);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入正确的URL!'));
    } else {
      callback();
    }
  });
};

/* 检测是否为http或者https开头的url */
function validateHttpUrlFn (rule, value, callback) {
  function validate (url) {
    const reg = /(http|https):\/\/([\w.]+\/?)\S*/;
    return reg.test(url);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入以http,https开头的正确的URL!'));
    } else {
      callback();
    }
  });
};

/* 匹配由26个英文字母组成的字符串 */
function validate26StrFn (rule, value, callback) {
  function validate (str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('只能输入26个英文字母组成的字符串!'));
    } else {
      callback();
    }
  });
};

/* 匹配国内固定电话号码 */
function validatePhoneFn (rule, value, callback) {
  function validate (phone) {
    const reg = /^(\d{3,4}-)?\d{7,8}$/;
    return reg.test(phone);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入正确的固话号码!'));
    } else {
      callback();
    }
  });
};

/* 匹配日期 */
function validateDateFn (rule, value, callback) {
  function validate (date) {
    const reg = /^[\w\W]*$/;
    return reg.test(date);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入正确的日期!'));
    } else {
      callback();
    }
  });
};

/* 匹配qq */
function validateQQFn (rule, value, callback) {
  function validate (qq) {
    const reg = /^[1-9][0-9]{4,}$/;
    return reg.test(qq);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入正确的QQ号!'));
    } else {
      callback();
    }
  });
};

/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
function validatePileFn (rule, value, callback) {
  function validate (pile) {
    const reg = /(^[K]\d{1,4}\+\d{1,3}$)/;
    return reg.test(pile);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('*格式: K0001(1至4位数字)+001(1-3位数字)'));
    } else {
      callback();
    }
  });
};

/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
function validatePileToPileFn (rule, value, callback) {
  function validate (pile) {
    const reg = /^[K]\d{1,4}\+\d{1,3}[~]([K]\d{1,4}\+\d{1,3}$)/;
    return reg.test(pile);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('格式: K0001(1至4位数字)+001(1至3位数字)~K0001(1至4位数字)+001(1至3位数字)!'));
    } else {
      callback();
    }
  });
};

/* 匹配自动格式化桩号正则：四个数字.三个数字如：0012.002或者K四个数字+三个数字如：K0012+200 */
function validateAutoPileFn (rule, value, callback) {
  function validate (pile) {
    if (pile) {
      pile = pile.toUpperCase();
    }
    const reg = /^\d{1,4}\.\d{1,3}$/;
    const pileReg = /(^[K]\d{1,4}\+\d{1,3}$)/;
    return reg.test(pile) || pileReg.test(pile);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('格式: K0001(1至4位数字)+001(1-3位数字)或者0001(1至4位数字).001(1-3位数字)'));
    } else {
      callback();
    }
  });
};

/* 匹配自动格式化区间桩号正则：四个数字.三个数字~四个数字.三个数字如：12.002~31.12 或者 K四个数字+三个数字~K四个数字+三个数字如：K12+002~K31+12 */
function validateAutoRangePileFn (rule, value, callback) {
  function validate (pile) {
    if (pile) {
      pile = pile.toUpperCase();
    }
    const reg = /^\d{1,4}\.\d{1,3}~\d{1,4}\.\d{1,3}$/;
    const pileReg = /^[K]\d{1,4}\+\d{1,3}[~]([K]\d{1,4}\+\d{1,3}$)/;
    return reg.test(pile) || pileReg.test(pile);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('格式: K0001(1至4位数字)+001(1至3位数字)~K0001(1至4位数字)+001(1至3位数字)或者0001(1至4位数字).001(1至3位数字)~0001(1至4位数字).001(1至3位数字)!'));
    } else {
      callback();
    }
  });
};

/* 匹配正数正则 */
function validatePositiveNumberFn (rule, value, callback) {
  function validate (num) {
    const reg = /^([1-9]\d{0,11}|0)(\.\d{1,4})?$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入整数部分为12位以内，小数部分为4位以内的正数!'));
    } else {
      callback();
    }
  });
};
/* 隧道代码 */
function tunnelCodeFn (rule, value, callback) {
  function validate (tunnelCode) {
    const reg = /^[GSXYCZ][0-9]{1,3}[0-9]{6}U[0-9]{4}$/;
    return reg.test(tunnelCode);
  }

  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('格式: (GSXYCZ)(任意一个字母)001(1至3位数字)000001(6位数字)U0001(4位数字)!'));
    } else {
      callback();
    }
  });
};
/* 涵洞代码 */
function culvertCodeFn (rule, value, callback) {
  function validate (culvertCode) {
    const reg = /^[GDSXYCZ][0-9]{1,3}[0-9]{6}H[0-9]{4}$/;
    return reg.test(culvertCode);
  }

  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('格式: (GSXYCZ)(任意一个字母)001(1至3位数字)000001(6位数字)H0001(4位数字)!'));
    } else {
      callback();
    }
  });
};
/* 桥梁代码 */
function bridgeCodeFn (rule, value, callback) {
  function validate (bridgeCode) {
    const reg = /^[GSYCZ][0-9]{1,3}[0-9]{6}[LRKZ][0-9]{4}$/;
    return reg.test(bridgeCode);
  }

  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('格式: (GSYCZ)(任意一个字母)001(1至3位数字)000001(6位数字)(LRKZ)(任意一个字母)0001(4位数字)!'));
    } else {
      callback();
    }
  });
};
/* 渡口代码 */
function ferryCodeFn (rule, value, callback) {
  function validate (ferryCode) {
    const reg = /^[GSXYCZ][0-9]{1,3}[0-9]{6}D[0-9]{4}$/;
    return reg.test(ferryCode);
  }

  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('格式: (GSXYCZ)(任意一个字母)001(1至3位数字)000001(6位数字)D0001(4位数字)!'));
    } else {
      callback();
    }
  });
};

/* 检测是否为非负整数类型 */
function validateNonNegativeFn (rule, value, callback) {
  function validate (num) {
    const reg = /^\d+$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入非负整数!'));
    } else {
      callback();
    }
  });
};

/* 检测是否为非负浮点数字类型，小数点前12位内,小数点后4未内 */
function validatePositiveDoubleNumberFn (rule, value, callback) {
  function validate (num) {
    const reg = /^[1-9]\d{0,11}(\.\d{1,4})?$|^0(\.\d{1,4})?$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if ((!validate(value) && value !== '' && value)) {
      callback(new Error('请输入正整数部分为12位以内，小数部分为4位以内格式的小数!!'));
    } else {
      callback();
    }
  });
};

/* 检测是否为非负浮点数字类型，小数点前18位内,小数点后2未内 */
function validate20PositiveDoubleNumberFn (rule, value, callback) {
  function validate (num) {
    const reg = /^[1-9]\d{0,17}(\.\d{1,4})?$|^0(\.\d{1,2})?$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if ((!validate(value) && value !== '' && value)) {
      callback(new Error('请输入正整数部分为18位以内，小数部分为2位以内格式的小数 '));
    } else {
      callback();
    }
  });
};

/* 检测是否为非负浮点数字类型，小数点前12位内,小数点后2未内 */
function validatePositiveTwoDoubleNumberFn (rule, value, callback) {
  function validate (num) {
    const reg = /^[1-9]\d{0,11}(\.\d{1,2})?$|^0(\.\d{1,2})?$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if ((!validate(value) && value !== '' && value)) {
      callback(new Error('请输入正整数部分为12位以内，小数部分为2位以内格式的小数!!'));
    } else {
      callback();
    }
  });
};

/* 检测是否为小数数字类型 */
function validateDoubleNumberFn (rule, value, callback) {
  function validate (num) {
    const reg = /^(-)?[1-9]\d{0,11}(\.\d{1,4})?$|^0(\.\d{1,4})?$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入整数部分为12位以内，小数部分为4位以内的正确格式的小数!'));
    } else {
      callback();
    }
  });
};
/* 公路交叉口代码 */
function routeCrossingCodeFn (rule, value, callback) {
  function validate (code) {
    const reg = /^[GSXYCZ][0-9]{1,3}[0-9]{6}F[0-9]{5}$/;
    return reg.test(code);
  }

  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('格式: (GSXYCZ)(任意一个字母)001(1至3位数字)000001(6位数字)F0001(4位数字)1(1位数字)!'));
    } else {
      callback();
    }
  });
};

/* 公路交叉口代码 */
function LongitudeAndLatitudeFn (rule, value, callback) {
  function validate (code) {
    const reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,6})?)|180(([.][0]{1,6})?)),-?((0|[1-8]?[0-9]?)(([.][0-9]{1,6})?)|90(([.][0]{1,6})?))$/;
    return reg.test(code);
  }

  setTimeout(() => {
    if (!validate(value) && value !== '' && value) {
      callback(new Error('请输入正确的经纬度值!'));
    } else {
      callback();
    }
  });
};

/**
 * @description 验证统一社会信用代码格式规范
 * @author wenruihuan
 * 2019/10/30
 */
function validateCompanyCertificateCode (rule, value, callback) {
  setTimeout(() => {
    if (!value || value === ' ') {
      callback(new Error('* 非空选项!'));
    } else if (value.length < 18) {
      callback(new Error('* 非空选项!'));
    } else {
      callback();
    }
  });
};

/**
 * @判断是否已经存在社会码
 * @author wenruihuan
 * 2019/9/26
 */
function existCompanyCertificateCode (rule, value, callback) {
  const params = {
    certificateType: '1',
    socialCreditCode: value
  };
  isExistCompanyCertificateCode(params).then(({ data }) => {
    if (data.data) {
      callback(new Error('该统一社会信用代码已存在！'));
    } else {
      callback();
    }
  });
};

/**
 * @description 企业是否存在
 * @author lvzhiyuan
 * @date 2019/9/19
 */
export const validateExistCompanyName = (rule, value, callback) => {
  isExistCompanyName({ companyName: value }).then(({ data }) => {
    if (data.data) {
      callback(new Error('企业名已存在!'));
    } else {
      callback();
    }
  }).catch(e => {
    console.log(`validateExistCompanyName error: ${e}`);
  });
};

/**
 * @description 验证用户是否存在
 * @author lvzhiyuan
 * @date 2019/9/19
 */
export const validateUserAccount = (rule, value, callback) => {
  isExistUserAccount({ userAccount: value }).then(({ data }) => {
    if (data.data) {
      callback(new Error('用户名已存在!'));
    } else {
      callback();
    }
  }).catch(e => {
    console.log(`validateUserAccount error: ${e}`);
  });
};

/**
 * @description 以字母开头，6-20位数字、字母!
 * @author wenruihuan
 * 2019/10/30
 */

export const validateUserName = (rule, value, callback) => {
  function validate (num) {
    const reg = /^[A-Za-z]/;
    return reg.test(num);
  }
  function validateChinese (num) {
    const reg = /^[a-zA-Z0-9_]{0,}$/;
    return reg.test(num);
  }
  setTimeout(() => {
    if (!value || value === ' ') {
      callback(new Error('* 非空选2项!'));
    } else if (value.length < 6) {
      callback(new Error('长度为6!'));
    } else if (!validate(value) && value !== '' && value) {
      callback(new Error('首字母英文!'));
    } else if (!validateChinese(value) && value !== '' && value) {
      callback(new Error('不能为中文!'));
    } else {
      callback();
    }
  });
};

/* 判断是否为空（当input框失去焦点时触发） */
const Required = { required: true, validator: validateRequiredFn, message: '* 非空选项', trigger: 'blur' };
/* 判断(选择下拉，radio单选框)是否为空（当值为改变的时候触发） */
const RequiredChange = { required: true, message: '*非空选项', trigger: 'change' };
/* 判断checkbox复选框是否为空（当值为改变的时候触发） */
const RequiredCheckboxChange = { type: 'array', required: true, message: '*非空选项', trigger: 'change' };
/* 验证是否为8位的整数 */
const Number = { validator: validateNumberFn, trigger: 'blur' };
/* 验证是否为8位的正整数 */
const PositiveInteger = { validator: validatePositiveIntegerFn, trigger: 'blur' };
/* 长度最少位6位 */
const MinSix = { min: 6, message: '长度要大于6位!', trigger: 'blur' };
/* 验证字符串首位为英文 */
const FirstEnglish = { validator: validateFirstEnglishFn, message: '请以字母开头!', trigger: 'blur' };
/* 验证字符串首位为英文 */
const UserName = { validator: validateUserName, required: true, message: '以字母开头，6-20位数字、字母!', trigger: 'blur' };
/* 验证字符串不能为中文 */
const NotChinese = { validator: validateNotChineseFn, message: '以字母开头，6-20位数字、字母!', trigger: 'blur' };
/* 验证是否为19位的整数 */
const Long = { validator: validateLongFn, trigger: 'blur' };
/* 验证(组织机构代码效验) */
const socialCredit = { validator: socialCreditCode, trigger: 'blur' };
/* 验证是否为19位的正整数 */
const PositiveLong = { validator: validatePositiveLongFn, trigger: 'blur' };
/* 验证是否为字符串 */
const String = { validator: validateStringFn, trigger: 'blur' };
/* 验证是否为邮政编码 */
const PostCode = { validator: validatepostCodeFn, trigger: 'blur' };
/* 验证是否为手机号码 */
const Mobile = { validator: validateMobileFn, trigger: 'blur' };
/* 验证是否为邮箱 */
const Email = { validator: validateEmailFn, trigger: 'blur' };
/* 验证是否为Url */
const Url = { validator: validateUrlFn, trigger: 'blur' };
/* 验证是否为http或者https开头的Url */
const HttpUrl = { validator: validateHttpUrlFn, trigger: 'blur' };
/* 匹配由26个英文字母组成的字符串 */
const Str26 = { validator: validate26StrFn, trigger: 'blur' };
/* 匹配国内固定电话号码 */
const Phone = { validator: validatePhoneFn, trigger: 'blur' };
/* 匹配日期 */
const Date = { validator: validateDateFn, trigger: 'blur' };
/* 匹配QQ */
const QQ = { validator: validateQQFn, trigger: 'blur' };
/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
const Pile = { validator: validatePileFn, trigger: 'blur' };
/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
const PileToPile = { validator: validatePileToPileFn, trigger: 'blur' };
/* 匹配自动格式化桩号正则：四个数字.三个数字如：0012.200 */
const AutoPile = { validator: validateAutoPileFn, trigger: 'blur' };
/* 匹配自动格式化区间桩号正则：四个数字.三个数字~四个数字.三个数字如：12.002~31.12 */
const AutoRangePile = { validator: validateAutoRangePileFn, trigger: 'blur' };
/* 匹配正数正则 */
const PositiveNumber = { validator: validatePositiveNumberFn, trigger: 'blur' };
/* 匹配隧道代码正则: (GSXYCZ)...xxx xxxxxx Uxxxx，其中括号内字母任意一个,...xxx表示1-3个数字,x表示0-9,忽略空格 */
const TunnelCode = { validator: tunnelCodeFn, trigger: 'blur' };
/* 匹配涵洞代码正则: (GSYCZ)...xxx xxxxxx Hxxxx，其中括号内字母任意一个,...xxx表示1-3个数字,x表示0-9,忽略空格 */
const CulvertCode = { validator: culvertCodeFn, trigger: 'blur' };
/* 匹配桥梁代码正则: (GSYCZ)...xxx xxxxxx (LRKZ)xxx x，其中括号内字母任意一个,...xxx表示1-3个数字,x表示0-9,忽略空格 */
const BridgeCode = { validator: bridgeCodeFn, trigger: 'blur' };
/* 匹配渡口代码正则: (GSYCZ)...xxx xxxxxx (LRKZ)xxx x，其中括号内字母任意一个,...xxx表示1-3个数字,x表示0-9,忽略空格 */
const FerryCode = { validator: ferryCodeFn, trigger: 'blur' };
/* 验证正Double数字 */
const PositiveDoubleNumber = { validator: validatePositiveDoubleNumberFn, trigger: 'blur' };
/* 验证正20数字小数点前18，点后2位 */
const TwentyPositiveDoubleNumberFn = { validator: validate20PositiveDoubleNumberFn, trigger: 'blur' };
/* 验证正Double数字(小数部分保留两位) */
const PositiveTwoDoubleNumber = { validator: validatePositiveTwoDoubleNumberFn, trigger: 'blur' };
/* 验证非负整数 */
const NonNegativeNumber = { validator: validateNonNegativeFn, trigger: 'blur' };
/* 验证Double数字类型 */
const DoubleNumber = { validator: validateDoubleNumberFn, trigger: 'blur' };
/* 验证公路交叉口代码 */
const RouteCrossing = { validator: routeCrossingCodeFn, trigger: 'blur' };
/* 验证经纬度 */
const LongitudeAndLatitude = { validator: LongitudeAndLatitudeFn, trigger: 'blur' };
/* 验证统一社会代码格式是否正确 */
const RightCompanyCertificateCode = { validator: validateCompanyCertificateCode, required: true, message: '请输入18位统一社会信用代码!', trigger: 'blur' };

const CompanyCertificateCode = { validator: existCompanyCertificateCode, required: true, trigger: 'blur' };
/* 验证组织机构代码长度 */
const OrganizationCode = { min: 9, max: 9, message: '请输入9位组织机构代码', trigger: 'blur' };

/* 验证企业名称长度是否在18位 */
const MaxEighteenth = { min: 18, max: 18, message: '请输入18位字符', trigger: 'blur' };

/* 验证企业名称是否存在 */
const ValidateExistCompanyName = { validator: validateExistCompanyName, trigger: 'blur' };

/* 验证用户名称是否存在 */
const ValidateUserAccount = { validator: validateUserAccount, trigger: 'blur' };

export default {
  ValidateUserAccount,
  ValidateExistCompanyName,
  MaxEighteenth,
  OrganizationCode,
  CompanyCertificateCode,
  RightCompanyCertificateCode,
  Required,
  RequiredChange,
  RequiredCheckboxChange,
  Number,
  PositiveInteger,
  UserName,
  MinSix,
  NotChinese,
  FirstEnglish,
  Long,
  socialCredit,
  PositiveLong,
  String,
  PostCode,
  Mobile,
  Email,
  Url,
  HttpUrl,
  Str26,
  Phone,
  Date,
  QQ,
  Pile,
  PileToPile,
  AutoPile,
  AutoRangePile,
  NonNegativeNumber,
  PositiveNumber,
  TunnelCode,
  CulvertCode,
  BridgeCode,
  FerryCode,
  PositiveDoubleNumber,
  TwentyPositiveDoubleNumberFn,
  PositiveTwoDoubleNumber,
  DoubleNumber,
  RouteCrossing,
  LongitudeAndLatitude
};
