import request from '../src/request';

global.fetch = require('node-fetch');

describe('common-api', () => {
  const host = 'http://httpbin.org';

  it('invilid url', () => {
    request.send().catch(e => {
      expect(e.message).toEqual('invalid url');
    })
  });

  it('METHOD NOT ALLOWED', () => {
    request.send(host + '/get', { // 'send' default POST, but interface only accept GET 
      data: {name: '123'}
    }).catch(e => {
      expect(e.message).toEqual('METHOD NOT ALLOWED');
    });
  })

  it('Get method options', () => {
    request.send(host + '/get', {
      method: 'GET',
      data: {name: '456'},
      afterResponse(resp) {
        return resp.json();
      }
    }).then(resp => {
      expect(resp.args).toEqual({ name: '456' });
    }).catch(e => console.log(e));
  })

  it('Get method ', () => {
    request.get(host + '/get', {name: '123'}).then(resp => {
      expect(resp.args).toEqual({ name: '123' });
    });
  })

  it('Post method ', () => {
    request.post(host + '/post', {name: 'xinxin'}).then(resp => {
      expect(resp.json).toEqual({ name: 'xinxin' });
    });
  })
});
