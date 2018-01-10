# common-api

React中可复用的通用模块

# 目录

* [Request](#request)
* [Store](#installation)
* [UI](#compatibility)

# Request

简单包装的Fetch

## 使用

```javascript
import request from 'cmn-utils/lib/request';

// 发送请求
request.send('/send')
request.get('/get/1')
request.post('/post')
request.put('/put')
request.delete('/put/1')
```
#### 默认选项
```
{
    method: 'POST',         // default 'POST'
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    responseType: 'json',   // text or blob or formData https://fetch.spec.whatwg.org/
    prefix: '',             // request prefix
    beforeRequest: null,    // before request check, return false or a rejected Promise will stop request
    afterResponse: null,    // after request hook
  }
```

### 基本使用

#### 简化写法

```javascript
// 原始fetch 写法
fetch('http://httpbin.org/post', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    name: 'weiq',
  })
})
.then(function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  throw new Error(response.statusText)
})
.then(function(json) {
  // ...
})

// 等价于，直接使用send方法
request
  .send('http://httpbin.org/post', {
    method: 'POST',
    data: {name: 'weiq'}
  }).then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })

// 等价于，使用提供的post方法
request
  .post('http://httpbin.org/post', {name: 'weiq'})
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```

#### 提交form表单

```js
// 提交form表单
request
  .getform('/form', {name: 'weiq'}) // 将拼接到url后面
  //.postform('/form', {name: 'weiq'}) // 将做为Form Data发送
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```

#### 全局配置, 将会覆盖默认参数, 一般全局配置一次

```js
// 全局配置, 将会覆盖默认参数, 一般全局配置一次
request
  .config('method', 'GET')
  .config({
    headers: {'content-type': 'application/json'},
    prefix: '/api'
  })
// 配置请求头
request
  .headers('Accept', 'application/json')  // key-value
  .headers({ Accept: 'application/json' }) // json
```

#### 临时改变配置项

```js
request
  .post('http://httpbin.org/post', {name: 'weiq'}, {
    headers: {
      'content-type': 'application/json'
    },
    responseType: 'json',
  })
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
// 或
request
  .create() // 将会生成一个新 request 实例完成操作
  .headers({ mode: 'cors' })
  .contentType('json')
  .post('http://httpbin.org/post', {name: 'weiq'})
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```