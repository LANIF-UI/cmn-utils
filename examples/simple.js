/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import L from '../src/index';

const A = () => {
  function set() {
    L .setStore("name", "abc")
      .setStore("multi", {ip: '0.0.0.0'})
      .setStore("age", 18)
      .setStore({
        a: 1,
        b: 2,
        c: true
      })
  }

  function get() {
    const multi = L.getStore("multi");
    console.log(multi)
  }

  function getAsync() {
    const name = L.getStoreAsync("name").then(value => console.log("异步值：", value));
  }

  function getStore() {
    const store = L.getStoreInfo();
    console.log(store);
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
      <button onClick={e => L.removeStore('name')}>删除</button>
      <button onClick={e => L.clearStore()}>清空</button>
    </div>
  )
}
ReactDOM.render(<A />, document.getElementById('__react-content'));