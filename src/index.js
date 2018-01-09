import * as request from './request';
import * as utils from './utils';
import * as store from './store';

class L {}

// Request 函数
for(const r in request) {
  L[r] = request[r];
}

// Utils 函数
for(const u in utils) {
  L[u] = utils[u];
}

// Store 函数
for(const s in store) {
  L[s] = store[s];
}

export default L;