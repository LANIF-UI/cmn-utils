import Request from './request';
import fetchJsonp from 'fetch-jsonp';

const request = new Request();
request.jsonp = fetchJsonp;

if (typeof window.fetch === 'undefined') {
  require('whatwg-fetch');
}

// singleton
export default request;
