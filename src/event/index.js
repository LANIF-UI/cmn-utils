import EventEmitter from 'wolfy87-eventemitter';
import {isFunction, isArray} from '../utils';

export const eventEmitter = new EventEmitter();

export default eventEmitter;

/**
 * 注册事件监听
 * @param {string} eventName 事件名称
 * @param {array|function} callbacks 事件触发时调用的函数，
 * 支持数组传入多个函数。一般上willmount时进行注册，
 * 在didMount时调用off进行解除注册。
 */
export const on = (eventName, callbacks) => {
  if (isFunction(callbacks)) {
    eventEmitter.addListener(eventName, callbacks);
  } else if (isArray(callbacks)) {
    eventEmitter.addListeners(eventName, callbacks);
  } else {
    console.error("类型错误： ", callbacks);
  }
};

/**
 * 注册一次事件监听，只能触发一次trigger触发后即自动从监听中移除
 * @param {string} eventName 事件名称
 * @param {function} callback 事件触发时调用的函数
 */
export const once = (eventName, callback) => {
  if (isFunction(callback)) {
    eventEmitter.addOnceListener(eventName, callback);
  } else {
    console.error("类型错误： ", callback);
  }
};

/**
 * 移除事件监听
 * @param {string} eventName 事件名称
 * @param {array|function} callbacks 事件名称对应的函数
 */
export const off = (eventName, callbacks) => {
  if (isFunction(callbacks)) {
    eventEmitter.removeListener(eventName, callbacks);
  } else if (isArray(callbacks)) {
    eventEmitter.removeListeners(eventName, callbacks);
  } else {
    console.error("类型错误： ", callbacks);
  }
};

/**
 * 触发事件
 * @param {string} eventName 事件名称
 * @param {obj} args 需要传递的参数
 */
export const trigger = (eventName, ...args) => {
  eventEmitter.emitEvent(eventName, args);
};