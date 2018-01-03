import request from '../src/request';

global.fetch = require('node-fetch');

describe('common-api', () => {
  const host = 'http://httpbin.org';

  it('invilid url', () => {
    request.send().catch(e => {
      expect(e.message).toEqual('invalid url');
    })
  });

  it('Post METHOD NOT ALLOWED', () => {
    request.send(host + '/get', {
      data: {name: '123'}
    }).catch(e => {
      expect(e.message).toEqual('METHOD NOT ALLOWED');
    });
  })

  it('Get method options', () => {
    request.send(host + '/get', {
      method: 'GET',
      data: {name: '456'}
    }).then(resp => {
      expect(resp.args).toEqual({ name: '456' });
    });
  })

  it('Get method ', () => {
    request.get(host + '/get', {name: '123'}).then(resp => {
      expect(resp.args).toEqual({ name: '123' });
    });
  })
});
