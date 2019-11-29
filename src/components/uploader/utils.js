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
