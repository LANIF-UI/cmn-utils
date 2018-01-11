# common-api

React中可复用的通用模块, 一些不常用的函数，或在全局函数里会引起奇异的函数没有引出到全局，可以使用$$.request | $$.store 等间接使用，或`import { request } from 'cmn-utils'`，也可以直接使用 `import request from 'cmn-utils/lib/request'`

# 目录

* [Request](#request) [详细](https://github.com/LANIF-UI/cmn-utils/tree/master/src/request)
* [Store](#store) [详细](https://github.com/LANIF-UI/cmn-utils/tree/master/src/store)
* [UI](#ui)
* [Utils](#utils)

# Request

简单包装的Fetch

## API
- requestConfig 配置所有默认选项
- requestHeaders 设置headers, 支持 object | key-value | function 类型参数
- send 发送请求
- getform, postform, get, post, head, del, put 发送请求(这些都是简化的send)
- *下面为不在$$中的方法*
- create 返回新实例
- config 同 requestConfig
- headers 同 requestHeaders
- prefix 设置请求前缀，可在config中设置
- beforeRequest 请求前hook
- afterResponse 响应后hook
- contentType 设置content-type

## 使用

```javascript
import $$ from 'cmn-utils';

// 发送请求
$$.send('/send')
$$.get('/get/1')
$$.post('/post')
$$.put('/put')
$$.del('/put/1')
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
$$.send('http://httpbin.org/post', {
    method: 'POST',
    data: {name: 'weiq'}
  }).then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })

// 等价于，使用提供的post方法
$$.post('http://httpbin.org/post', {name: 'weiq'})
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```

#### 提交form表单

```js
// 提交form表单
$$.getform('/form', {name: 'weiq'}) // 将拼接到url后面
  //.postform('/form', {name: 'weiq'}) // 将做为Form Data发送
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```

#### 全局配置, 将会覆盖默认参数, 一般全局配置一次

```js
// 全局配置, 将会覆盖默认参数, 一般全局配置一次
$$.requestConfig('method', 'GET')
  .requestConfig({
    headers: {'content-type': 'application/json'},
    prefix: '/api'
  })
// 配置请求头
$$.requestHeaders('Accept', 'application/json')  // key-value
  .requestHeaders({ Accept: 'application/json' }) // json

// 用函数反回头
$$.requestHeaders(_ => ({
    random: Math.random()
  }))
```

#### 临时改变配置项

```js
$$.post('http://httpbin.org/post', {name: 'weiq'}, {
    headers: {
      'content-type': 'application/json'
    },
    responseType: 'json',
  })
  .then(resp => {
    console.log(resp.json) // {name: 'weiq'}
  })
```

# Store

简单包装的store2

## API
- setStore
- getStore 
- removeStore 
- clearStore
- *下面为不在$$中的方法*
- getStoreAsync
- create
- getStoreInfo
- getStoreInfoAsync
- session
- local
```
$$.setStore("name", "abc")
  .setStore("multi", {ip: '0.0.0.0'})
  .setStore("age", 18)
  .setStore({
    a: 1,
    b: 2,
    c: true
  })
$$.getStore("multi");

$$.removeStore('name')

$$.clearStore()

$$.store.getStoreAsync("name").then(value => console.log("async:", value));

$$.store.getStoreInfo();

$$.store
  .getStoreInfoAsync(value => console.log(value))
  .setStore('name', 'abc');

$$.store.session('name', 'abc'); // 存储到 sessionStorage中
$$.store.local('name', 'abc'); // 存储到 localStorage中
```
