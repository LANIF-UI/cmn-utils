import store from 'store/dist/store.modern';
import {isObject} from '../utils';

/**
 * 将 value 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
 * Examples:
 *
 *   .setStore('name', 'abc')
 *   .setStore({ name: 'abc', age: 18 }) // 一次存多个
 * @param {string | object} key 
 * @param {any} value 
 */
export function setStore(key, value) {
  if (isObject(key)) {
    for (let k in key) {
      store.set(k, key[k]);
    }
  } else {
    store.set(key, value);
  }
  return this;
}

/**
 * 从本地缓存中异步获取指定 key 对应的内容
 * @param {string} key 
 * @return {Promise}
 */
export function getStoreAsync(key) {
  return Promise.resolve(store.get(key));
}

/**
 * 从本地缓存中同步获取指定 key 对应的内容
 * @param {string} key 
 */
export function getStore(key) {
  return store.get(key)
}

/**
 * 获取当前Store的所有key-value信息
 */
export function getStoreInfo() {
  let db = [];
  store.each(function(value, key) {
    db.push({[key]: value})
  })
  return db;
}

/**
 * 从本地缓存中移除指定 key 
 * @param {string} key 
 */
export function removeStore(key) {
  store.remove(key)
  return this;
}

/**
 * 清理本地数据缓存
 */
export function clearStore() {
  store.clearAll();
}