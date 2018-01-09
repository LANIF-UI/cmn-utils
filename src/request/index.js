import Request from './request';

if (typeof window.fetch === 'undefined') {
  require('whatwg-fetch')
}

// singleton
const request = new Request();

const create = request.create;
const config = request.config;
const headers = request.headers;
const contentType = request.contentType;
const getform = request.getform;
const postform = request.postform;
const send = request.send;
const get = request.get;
const post = request.post;
const head = request.head;
const del = request.delete;
const put = request.put;

export {
  create, config, headers, contentType, getform, postform, send,
  get, post, head, del, put
};