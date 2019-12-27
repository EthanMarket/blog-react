export function timeToLocal(inputTime: string) {
  if (!inputTime && typeof inputTime !== 'number') {
    return '';
  }
  let localTime = '';
  let longTime = new Date(inputTime).getTime();
  const offset = (new Date()).getTimezoneOffset();
  localTime = (new Date(longTime - offset * 60000)).toISOString();
  localTime = localTime.substr(0, localTime.lastIndexOf('.'));
  localTime = localTime.replace('T', ' ');
  return localTime;
}
export function timeToSubLocal(inputTime: string) {
  if (!inputTime && typeof inputTime !== 'number') {
    return '';
  }
  return inputTime.split('T')[0];
}
//获取页面顶部被卷起来的高度
export function getScrollTop() {
  return Math.max(
    //chrome
    document.body.scrollTop,
    //firefox/IE
    document.documentElement.scrollTop,
  );
}
//获取页面文档的总高度
export function getDocumentHeight() {
  //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );
}
//页面浏览器视口的高度
export function getWindowHeight() {
  return document.compatMode === 'CSS1Compat'
    ? document.documentElement.clientHeight
    : document.body.clientHeight;
}

export function getQueryStringByName(name: string) {
  let result = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i'),
  );
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}