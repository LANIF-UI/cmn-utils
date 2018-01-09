/**
  * 生成指定位数的随机数
  * @param {int} x 
  */
export function randomStr(x) {
  let s = "";
  while (s.length < x && x > 0) {
    let v = Math.random() < 0.5 ? 32 : 0;
    s += String.fromCharCode(Math.round(Math.random() * ((122 - v) - (97 - v)) + (97 - v)));
  }
  return s;
}

/**
 * 对像转成url查询字符串
 * @param {object} obj 
 */
export function param(obj) {
  var arr = Object.keys(obj).map(function (k) {
    return k + '=' + encodeURIComponent(obj[k])
  })
  return arr.join('&').replace(/%20/g, '+')
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