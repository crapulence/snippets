/**
 * 获取 URL 上的参数
 */
export const getQueryString = (param) => {
  let reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  return r !== null ? unescape(r[2]) : null;
};
