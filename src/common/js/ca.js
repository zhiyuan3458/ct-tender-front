/* eslint-disable */
// 释放资源
let ret = null;
let certData = null;
/**
 * @description 查看ca是否插入
 * @author lvzhiyuan
 * @date 2019/10/14
 */
export function checkkey () {
  let UseCom = GDCACom;
  try {
    var deviceType = UseCom.GDCA_GetDevicType();
    // if (deviceType === -1) {
    //   // UKEY没有插入
    //   GDCA_Finalize(UseCom);
    // } else {
    // }
    return deviceType !== -1;
    // 控件初始化失败
  } catch (objError) {
  } finally {
    UseCom = null;
    deviceType = null;
    // CollectGarbage();
  }
};

export function checkPin (userPin) {
  const UseCom = GDCACom;
  certData = new Array();
  try {
    const deviceType = UseCom.GDCA_GetDevicType();
    UseCom.GDCA_Initialize();
    UseCom.GDCA_SetDeviceType(deviceType);
    // 客户端密码设备登录
    UseCom.GDCA_Login(2, userPin);
    // 检查函数是否成功运行，在函数运行结束后调用
    let errorCode = UseCom.GetError();
    if (errorCode !== 0) {
      // 如果用户插入key并输错密码就弹出以下提示
      // alert('CA用户验证失败：' + errorCode);
      // 释放GDCA_Initialize中分配的全局资源
      GDCA_Finalize(UseCom);
      return { flag: false, error: '密码输入错误，请重新输入密码!' };
    }
    // 读签名证书
    const readOutData = UseCom.GDCA_ReadLabel('LAB_USERCERT_SIG', 7);
    errorCode = UseCom.GetError();
    if (errorCode !== 0) {
      // 释放资源
      ret = UseCom.GDCA_Finalize();
      // 不知道
      return { flag: false, error: '校验出现问题!' };
    }
    // 读取用户加密证书，保存在ReadOutEncCert中
    const ReadOutEncCert = GDCACom.GDCA_ReadLabel('LAB_USERCERT_ENC', 8);
    // 检查函数是否成功运行，在函数运行结束后调用
    errorCode = GDCACom.GetError();
    // 证书读取失败
    if (errorCode !== 0) {
      // alert('CA登录中读取用户加密证书失败：' + errorCode);
      // 退出登录
      GDCA_Finalize(UseCom);
      return { flag: false, error: 'CA登录中读取用户加密证书失败!' };
    }
    const CAid = UseCom.GDCA_GetInfoByOID(readOutData, 2, '2.5.29.35', 0);

    errorCode = UseCom.GetError();
    if (errorCode !== 0) {
      // 释放资源
      ret = UseCom.GDCA_Finalize();
      // return false;
      return { flag: false, error: '校验出现问题!' };
    }

    const CAidB64 = UseCom.GDCA_Base64Encode(CAid);
    errorCode = UseCom.GetError();
    if (errorCode !== 0) {
      // 释放资源
      ret = UseCom.GDCA_Finalize();
      // return false;
      return { flag: false, error: '校验出现问题!' };
    }
    // GDCA  颁发机构密钥标示符
    if (CAidB64 === 'MBaAFHdDCRA/Pz/STHsHPz9URg==' || CAidB64 === 'MBaAFJVNEx9rIT9vFhKKZT9WCxFrPw==') {
      // console.log("进入GDCA  颁发机构密钥标示符");
      let Tureid = new Array();
      Tureid[0] = UseCom.GDCA_GetInfoByOID(readOutData, 2, '1.2.86.21.1.1', 0);
      Tureid[1] = UseCom.GDCA_GetInfoByOID(readOutData, 2, '1.2.86.21.1.3', 0);
      return { flag: true, type: 'GDCA', code: Tureid[1] + Tureid[0] };
    } else if (CAidB64 === 'MBaAFC0JQ4L5SldqP7B197Or1PncwW8=') {
      // netCA  颁发机构密钥标示符
      // console.log("进入netCA  颁发机构密钥标示符");
      let CertID = UseCom.GDCA_GetCertificateInfo(readOutData, 3);
      const CertID2 = UseCom.GDCA_GetInfoByOID(readOutData, 2, '1.3.6.1.4.1.18760.1.12.11', 0);
      if (CertID2.length !== 0) {
        CertID = CertID2.substring(2, CertID2.length);
        return { flag: true, type: '网证通', code: CertID };
      }

      // $('#trustId').val(CertID);
      // console.log("passWord="+$("#passWord").attr("value"));
    } else {
      // alert('来自未知CA的用户证书');
      GDCA_Finalize(UseCom);
      return { flag: false, error: '来自未知CA的用户证书!' };
    }
    // 获取包含机构名称的数据
    // const data = UseCom.GDCA_GetCertificateInfo(readOutData, 7);
    // 将包含机构名称的数据切割
    // const dataArr = data.split('\n');
    // 取得机构名称
    // $('#deptName').val(dataArr[3]);

    // const date = UseCom.GDCA_GetCertificateInfo(readOutData, 6); // 取日期
    // errorCode = UseCom.GetError();
    // if (errorCode !== 0) {
    //   ret = UseCom.GDCA_Finalize();// 释放资源
    //   return false;
    // }
    // const certbeginTime = date.substring(0, 14);
    // const certendTime = date.substring(15, 29);
    // let beginTime = new Date();
    // beginTime = add8Hours(certbeginTime);

    // let endTime = new Date(certendTime);
    // endTime = add8Hours(certendTime);

    // let Btime = beginTime.format('yyyy-MM-dd');
    // let Etime = endTime.format('yyyy-MM-dd');
    // 用户签名证书
    // $("#userSignCert").val(readOutData);
    // 用户加密证书
    // $("#userEncCert").val(ReadOutEncCert);
    // 有效日期起
    // $('#validBeginTime').val(Btime);
    // 有效日期止
    // $('#validEndTime').val(Etime);
    return true;
  } catch (objError) {
    // alert('catch中用户登录出错！.   error:' + objError.description);
    GDCA_Finalize(UseCom); /* 释放密码设备接口资源 */
    return { flag: false, error: '用户登录出错!' };
  }
  // return true;
}

function GDCA_Finalize (iCom) {
  try {
    // COM控件返回的错误代码
    let errorCode = null;
    // 释放资源
    iCom.GDCA_Finalize();
    // 检查函数是否成功运行，在函数运行结束后调用
    errorCode = iCom.GetError();
    if (errorCode !== 0) {
      // alert('CA登录中释放接口资源失败！' + errorCode);
      return { flag: false, error: 'CA登录中释放接口资源失败！' };
    }
    return errorCode;
  } catch (objError) {
    // alert('CA登录中GDCA3.0接口资源释放出错！error: ' + objError.description);
    console.log(`objError: ${objError}`);
  }
}

/**
 * @description 8小时
 * @author lvzhiyuan
 * @date 2019/10/14
 */
function add8Hours(timeDate)
{
  const beginTime = new Date();
  const netTime = new Date();
  beginTime.setFullYear(timeDate.substring(0,4));
  beginTime.setMonth(timeDate.substring(4,6) - 1);
  beginTime.setDate(timeDate.substring(6,8));
  beginTime.setHours(timeDate.substring(8,10));
  beginTime.setSeconds(0);
  beginTime.setMinutes(0);

  let srcTime = beginTime.getTime();
  srcTime = srcTime + 1000*60*60*8;
  netTime.setTime(srcTime);
  return netTime;
}

/**
 * @description 绑定ca
 * @author lvzhiyuan
 * @date 2019/10/14
 */
function bindCA()
{
  // 绑定CA
  let UseCom = GDCACom;
  let usekeytype;
  let KeyType = new Array();
  certData = new Array();
  //初始化
  const DeviceType = UseCom.GDCA_GetDevicType();
  var ret = UseCom.GDCA_SetDeviceType(DeviceType);

  if(ret === '0') {
    let userPin = $("#userPin").attr('value');
    if(userPin === null || userPin=== '')
    {
      // alert('请输入PIN码！');
      return false;
    }
    const isOK = checkPin(userPin);
    return isOK;
  }
}
/* eslint-disable */
