/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import $$, {store, request} from '../src/index';

request
  .afterResponse(resp => {
    return resp;
  })
  .errorHandle(e => {
    console.error("my error handle:", e);
  });

const A = () => {
  function set() {
    $$.setStore("name", "abc")
      .setStore("multi", {ip: '0.0.0.0'})
      .setStore("age", 18)
      .setStore({
        a: 1,
        b: 2,
        c: true
      })
  }

  function get() {
    const multi = $$.getStore("multi");
    console.log(multi)
  }

  function getAsync() {
    const name = store.getStoreAsync("name").then(value => console.log("异步值：", value));
  }

  function getStore() {
    const all = store.getStoreInfo();
    console.log(all);

    store
      .getStoreInfoAsync(value => console.log('async', value))
      .setStore('name', 'def');
  }

  function requestGet() {
    $$.get('11http://httpbin.org/post')
      .then(resp => console.log(resp))
      .catch(e => console.log(e))
  }

  return (
    <div style={{ marginBottom: 400 }}>
      <h1>Store:</h1>
      <button onClick={set}>存</button>
      <button onClick={get}>取</button>
      <button onClick={getAsync}>异步取</button>
      <br />
      <button onClick={getStore}>获取全部store</button>
      <br />
      <button onClick={e => $$.removeStore('name')}>删除</button>
      <button onClick={e => $$.clearStore()}>清空</button>
      <h1>Request</h1>
      <button onClick={requestGet}>get</button>
    </div>
  )
}
ReactDOM.render(<A />, document.getElementById('__react-content'));