import Request from './request';

if (typeof window.fetch === 'undefined') {
  require('whatwg-fetch')
}

const request = new Request();

export default request;