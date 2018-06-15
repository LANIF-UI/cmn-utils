import request from './request';
import store from './store';
import event, { on, once, off, trigger } from './event';
import download from 'downloadjs';

/**
 * 导出常用请求函数到全局，其它高级配置使用 '.request.xxx()' 
 * 或直接 import request from 'cmn-utils/lib/request';
 */
const requestConfig  = request.config;
const requestHeaders = request.headers;
const getform        = request.getform;
const postform       = request.postform;
const send           = request.send;
const get            = request.get;
const post           = request.post;
const head           = request.head;
const del            = request.delete;
const put            = request.put;

export { request };

/**
 * 导出常用存储函数到全局，其它高级配置使用 '.store.xxx()' 
 * 或直接 import {xxx} from 'cmn-utils/lib/store'
 */
const setStore       = store.setStore;
const getStore       = store.getStore
const removeStore    = store.removeStore;
const clearStore     = store.clearStore;

export { store };

/**
 * default export
 */
const L = {
  // request api
  request, requestConfig, requestHeaders, getform, postform, send, get, post, head, del, put,
  // store api
  store, setStore, getStore, removeStore, clearStore,
  // event api
  event, on, once, off, trigger,
  // download
  download,
  // common utils
  ...require('./utils'),
}

if (L.__esModule) delete L.__esModule;

export default L;