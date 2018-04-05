/**
  * 生成指定位数的随机数
  * @param {int} x 
  */
export function randomStr(x) {
  let s = '';
  while (s.length < x && x > 0) {
    const v = Math.random() < 0.5 ? 32 : 0;
    s += String.fromCharCode(Math.round(Math.random() * ((122 - v) - (97 - v)) + (97 - v)));
  }
  return s;
}

/**
 * 对像转成url查询字符串
 * @param {object} obj 
 */
export function param(obj) {
  const arr = Object.keys(obj).map(function (k) {
    return k + '=' + encodeURIComponent(obj[k])
  })
  return arr.join('&').replace(/%20/g, '+')
}

/**
 * 查询字符串转为对象
 * @return {object} {key1: value1, key2: value2}
 */
export function getQueryObject() {
  return (function(a) {
    if (a == '') return {};
    const b = {};
    for (const i = 0; i < a.length; ++i) {
      const p = a[i].split('=');
      if (p.length != 2) continue;
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
    return b;
  })(window.location.search.slice(1).split('&'));
}

/**
 * 取查询字符串中某一个name的value
 * @param {string} name 
 * @param {string} url
 * @return {string}
 */
export function getQueryValue(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * 是否为数组
 * @param {any} val 
 */
export function isArray(val) {
  return (val != null && typeof val != 'function' && typeof val.length == 'number')
}

/**
 * 是否为function
 * @param {any} val 
 */
export function isFunction(val) {
  return val && {}.toString.call(val) === '[object Function]'
}

/**
 * 是否为对像
 * @param {any} val 
 */
export function isObject(val) {
  return val && {}.toString.call(val) === '[object Object]'
}

export function asyncFunc(func) {
  return () => new Promise((resolve, reject) => resolve(isFunction(func) ? resolve(func(arguments)) : reject(new TypeError(func + 'is not function'))));
}

/**
 * 延时任意毫秒
 * @param {number} time 毫秒
 * 例：
 *   delay(500).then(() => console.log('after 500ms'))
 */
export function delay(time = 0) {
  return new Promise((res) => setTimeout(res, time));
}