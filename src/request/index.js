import Request from './request';

if (typeof window.fetch === 'undefined') {
  require('whatwg-fetch')
}

// singleton
export default new Request();

