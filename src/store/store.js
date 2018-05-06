import store from 'store2';
import { isObject, isFunction } from '../utils';

export default class Store {
  constructor(namespace) {
    this.store = namespace ? store.namespace(namespace) : store;
    this.session = this.store.session;
    this.local = this.store.local;
  }

  /**
   * 反回一个新的store
   */
  create = (namespace) => new Store(namespace)

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
      this.store.setAll(key);
    } else {
      this.store.set(key, value);
    }
    return this;
  }

  /**
   * 从本地缓存中异步获取指定 key 对应的内容, 如指定alt当没找到时反回alt
   * @param {string} key 
   * @return {Promise}
   */
  getStoreAsync = (key, alt) => Promise.resolve(this.store.get(key, alt))
  /**
   * 从本地缓存中同步获取指定 key 对应的内容, 如指定alt当没找到时反回alt
   * @param {string} key 
   * @param {any} alt
   */
  getStore = (key, alt) => this.store.get(key, alt)

  /**
   * 获取当前Store的所有key-value信息,放入一个对象中
   */
  getStoreInfo = () => this.store.getAll()

  /**
   * 获取当前Store的所有key-value信息,放入一个回调函数里,这样可以接着链式操作
   * .getStoreInfoAsync(v => v).setStore({})
   */
  getStoreInfoAsync = (cb) => {
    if (isFunction(cb)) cb(this.store.getAll());
    return this;
  }

  /**
   * 从本地缓存中移除指定 key 
   * @param {string} key 
   */
  removeStore = (key) => {
    this.store.remove(key);
    return this;
  }

  /**
   * 清理本地数据缓存
   */
  clearStore = () => {
    this.store.clearAll();
    return this;
  }

  /**
   * 直接使用 store2
   */
  native = () => {
    return store;
  }
}