import store from 'store2';
import { isObject, isFunction } from '../utils';

export default class Store {
  constructor(namespace) {
    if (namespace) store.namespace;

    this.session = store.session;
    this.local = store.local;
  }

  /**
   * 反回一个新的store
   */
  create = (namespace) => {
    return new Store(namespace);
  }

  /**
   * 将 value 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
   * Examples:
   *
   *   .setStore('name', 'abc')
   *   .setStore({ name: 'abc', age: 18 }) // 一次存多个
   * @param {string | object} key 
   * @param {any} value 
   */
  setStore = (key, value) => {
    if (isObject(key)) {
      store.setAll(key);
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
  getStoreAsync = (key) => {
    return Promise.resolve(store.get(key));
  }

  /**
   * 从本地缓存中同步获取指定 key 对应的内容
   * @param {string} key 
   */
  getStore = (key) => {
    return store.get(key)
  }

  /**
   * 获取当前Store的所有key-value信息,放入一个对象中
   */
  getStoreInfo = () => {
    return store.getAll();
  }

  /**
   * 获取当前Store的所有key-value信息,放入一个回调函数里,这样可以接着链式操作
   * .getStoreInfoAsync(v => v).setStore({})
   */
  getStoreInfoAsync = (cb) => {
    if (isFunction(cb)) cb(store.getAll())
    return this;
  }

  /**
   * 从本地缓存中移除指定 key 
   * @param {string} key 
   */
  removeStore = (key) => {
    store.remove(key)
    return this;
  }

  /**
   * 清理本地数据缓存
   */
  clearStore = () => {
    store.clearAll();
    return this;
  }

  /**
   * 直接使用 store2
   */
  native = () => {
    return store;
  }
}