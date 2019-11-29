// 删除对象数组，传入参数为已知的对象
Array.prototype.remove = function (val) {
  const index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

/**
 * @description 获取类型
 * @author lvzhiyuan
 * @date 2019/10/29
 */
function getType (obj) {
  // tostring会返回对应不同的标签的构造函数
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}

// 深度克隆
export function deepClone (data) {
  const type = getType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (const key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

/**
 * 把后台拍平了的数据转为带children的数据
 * @param data—— 需要进行处理的数组
 * @param root—— 根节点的名称，本系统默认为root
 * @returns {*}
 */
export function dataToChildren (data, root = 'root') {
  function dataToTree (datas, parentData) {
    parentData.forEach(item => {
      const parentId = item.id;
      const childrenData = [];
      data.forEach(innerItem => {
        if (parentId === innerItem.parentId) {
          childrenData.push(innerItem);
        }
      });
      item.children = childrenData;
      if (childrenData.length >= 0) {
        dataToTree(datas, childrenData);
      }
    });
    return parentData;
  }
  const parentData = [];
  data.forEach(item => {
    if (root === item.id) {
      parentData.push(item);
    }
  });
  return dataToTree(data, parentData);
}

/**
 * @description 生成随机数
 * @author lvzhiyuan
 * @date 2019/9/11
 */
export function gengerateRandom () {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
/**
 * @description 设置table高度
 * @author lvzhiyuan
 * @date 2019/9/11
 */
export function getTableHeight (tableName, domHeight1 = 0, domHeight2 = 0, domHeight3 = 0, domHeight4 = 0) {
  const windowHeight = window.innerHeight;
  this.$refs[tableName].$el.style.height = windowHeight - domHeight1 - domHeight2 - domHeight3 - domHeight4 - 200;
}

/**
 * @description 删除对象数组的其中一项
 * @author wenruihuan
 * 2019/9/26
 */
Array.prototype.remove = function (val) {
  const index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

/**
 * @description 重置对象属性为空
 * @author lvzhiyuan
 * @date 2019/10/24
 */
export function resetObj (obj) {
  Object.keys(obj).forEach(item => {
    obj[item] = '';
  });
}
export const downloadFile = (blob, fileName) => {
  // IE以及IE内核的浏览器
  if (!(window.navigator.userAgent.indexOf('MSIE') >= 1) && window.navigator.msSaveBlob) {
    try {
      window.navigator.msSaveBlob(blob, fileName);
      // window.navigator.msSaveOrOpenBlob(response, fileNm);
    } catch (e) {
      console.log(`donwload-error: ${e}`);
    }
  } else {
    const link = document.createElement('a');
    const body = document.querySelector('body');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    // fix Firefox
    link.style.display = 'none';
    body.appendChild(link);
    link.click();
    body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }
};
/**
 * @description
 * @author lizipei
 * @date 2019/10/28
 */
export function formatDate (date, format) {
  if (date) {
    let result;
    const times = new Date(date);
    const YYYY = times.getFullYear();
    const MM = times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1;
    const DD = times.getDate() < 10 ? '0' + times.getDate() : times.getDate();
    const hh = times.getHours() < 10 ? '0' + times.getHours() : times.getHours();
    const mm = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes();
    const ss = times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds();
    result = `${YYYY}-${MM}-${DD}`;
    if (format) {
      const formatList = format.split('');
      formatList.forEach(m => {
        switch (m) {
          case 'Y':
            result = result + `${YYYY}`;
            break;
          case 'M':
            result = result + `${MM}`;
            break;
          case 'D':
            result = result + `${DD}`;
            break;
          case 'h':
            result = result + `${hh}`;
            break;
          case 'm':
            result = result + `${mm}`;
            break;
          case 's':
            result = result + `${ss}`;
            break;
          default:
            result = result + m;
        }
      });
    }
    return result;
  }
  return '';
}

/**
 * @description 处理列表不同需求时，操作按钮显示不同的风格的函数（包括是否显示，是否高亮）
 * @author lvzhiyuan
 * @date 2019/11/21
 */
export function handleOperateBtns (obj, input) {
  const output = [];
  input.forEach(map => {
    for (const [mapKey, mapVal] of map) {
      const flag = Object.keys(mapKey).every(innnerItem => obj[innnerItem] === mapKey[innnerItem]);
      if (flag) {
        output.push(mapVal);
        break;
      }
    }
  });
  return output;
}
