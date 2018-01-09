import store from 'store/dist/store.modern';
import {isObject} from '../utils';

/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
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
}

/**
 * 将 value 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
 * @param {string | object} key 
 * @param {any} value 
 */
export function setStoreSync(key, value) {

}

/**
 * 从本地缓存中异步获取指定 key 对应的内容
 * @param {string} key 
 */
export function getStore(key) {

}

/**
 * 从本地缓存中同步获取指定 key 对应的内容
 * @param {string} key 
 */
export function getStoreSync(key) {

}

/**
 * 异步获取当前Store的所有key-value信息
 */
export function getStoreInfo() {

}

/**
 * 同步获取当前Store的所有key-value信息
 */
export function getStoreInfoSync() {

}

/**
 * 从本地缓存中异步移除指定 key 
 * @param {string} key 
 */
export function removeStore(key) {

}

/**
 * 从本地缓存中同步移除指定 key 
 * @param {string} key 
 */
export function removeStoreSync(key) {

}

/**
 * 清理本地数据缓存
 */
export function clearStore() {

}

/**
 * 同步清理本地数据缓存
 */
export function clearStoreSync() {

}