import * as request from './request';
import * as utils from './utils';

class L {}

// Request 函数
for(const r in request) {
  L[r] = request[r];
}

// Utils 函数
for(const u in utils) {
  L[u] = utils[u];
}

export default L;