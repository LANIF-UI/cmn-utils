/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";
import $$, { store, request } from "../src/index";

request
  .withHeaders(() => ({
    token: '***mytoken***' + Math.random()
  }))
  .afterResponse(resp => {
    return resp;
  })
  .errorHandle(e => {
    console.error("my error handle:", e);
  });

const A = () => {
  function set() {
    $$.setStore("name", "abc")
      .setStore("multi", { ip: "0.0.0.0" })
      .setStore("age", 18)
      .setStore({
        a: 1,
        b: 2,
        c: true
      });
  }

  function get() {
    const multi = $$.getStore("multi");
    console.log(multi);
  }

  function getAsync() {
    const name = store
      .getStoreAsync("name")
      .then(value => console.log("异步值：", value));
  }

  function concurrencyRequest() {
    let r1 = $$.get("http://httpbin.org/get");
    let r2 = $$.post("http://httpbin.org/post");
    let r3 = $$.put("http://httpbin.org/put");

    Promise.all([r1, r2, r3])
  }

  function getStore() {
    const all = store.getStoreInfo();
    console.log(all);

    store
      .getStoreInfoAsync(value => console.log("async", value))
      .setStore("name", "def");
  }

  function requestGet() {
    $$.get("http://httpbin.org/get")
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  function beforeRequest() {
    $$.get("http://httpbin.org/get", {a: 123}, {
      beforeRequest: (url, options) => {
        console.log(url, options);
        // return false; // return false cancel request
      }
    })
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  function customParseResponse() {
    $$.post("http://httpbin.org/post", {a: 123}, {
      parseResponse: ((response, responseType) => {
        // 可以获取响应头，如果头内容不全或为空，可能需要查看后端与nginx的配置
        response.headers.forEach((v, k) => {
          console.log(`${k}:${v}`);
        });
        // 需要返回响应内容
        return response.json();
      })
    })
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  function download() {
    $$.download(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAARASURBVHjaYvz//z8DMcC25rYAkPIFYhcg1gRiOSBmg0r/AuKHQHwdiPcA8ebDLaofiTEXIIAYCTkAaLE2kCoH4lAg5kCT/galudDEfwDxKiDuADrkOj7zAQIIpwOAFvMAqTYgzgJiZiD+DcQHQb4D4sNA/Bho+BuoWhEgJQvEdtBQAtGsQPwHiKcCcSVQ7Xds9gAEEFYHAA1UB1LroUENCt4ZQNwKNOQVkdElDqRqgDgNGk2ngdgfqP85ulqAAMJwAFCzPpDaBcRiQHwSiCOAGh8wkAGAZikBqRVAbAoKMSD2App1BVkNQAChOACoQQVIHQFikA+WAXEyUMMPBgoA0ExOIDUP5BGoI8yAZr6AyQMEENwBQIVcUB/rAPFyII4GKvzPQAUANJsRamY4EJ8AYkeYxwACiAlJXQvUcpAjkqhlOQhAzUoE4jNAbAHE1TA5gAAChwA00YHi5i8o4QE13GegAYBG8VVojlIFJUqAAIKFQBkQswDxdHItBxrOC8RMBELiDpCaBcTcQFwLEgMIIEab6lt8QPo5NK/LwPI2muGqQOotUO4dFjl5ILUSiM2B+D0QN0Ppp0D1u7GoF4MmRlAoSAAEEMjFPtCSbB82y6EgGIgPADXLYJFbA7UcBASBuA+Ip0ELJmyhACpLDkBDwQsggEAOcILKbcJXYgKxLhCfBToiGJqqYSFjgkX9PyC+hMe8jVDaCSCAQA7Qg3KO4NGwHloiikF9fBdo+URotsIGdgJ9egaPeTC79AECCJTwFKGcZ3g0gBz5CIhVoHyQnjw86u8QSLMwu5QAAggUAnzQ2us9Hg1vkSwnBpwjIA8y7yfIboAAYoLG7398BQ9Qbi+QagepI8JyUOreTYQ6kFmMAAEEcgCo4cAJjFNBAhpAjnhBhMGLsGVXNCAEbVt8BAggkANgBY80AU0nCaRsBqgDq4hwJMyuewABxIRkqA2BUuwLEHsAmYU4ouIrEAcR2WaA2XURIIBAuWAfqNoFYj9owwNbTWYFze+OQOwNTTfIAFSyhQAtP0VkIvWH0vsAAggUAlugbTsnaNMKW012HVrKKSD5/ge0aZYNxOrEWg4tih2gIbYNIIBgteFcUBUMxBOABhUy0BAA7ZoMpHKAeDbQrjSAAILVXl3QBmQmUIEiDS1XgbYTQaVqJ0gMIICYoMF8E0iBXMYOarkAFXLQwHJOaKuIDRrSd0HiAAGEXH9XQ1uvoJptHqzCoWKTbD40IYOaZPUwOYAAQm+UCkPzuzIQbwXiKKBLP1FoOR/U517QOsICaOZbmDxAADGhpXiQRAC04gFlt11AAxQosFwJ2lXzgnbdApAtBwGAAMLVMYFVu7ZU6pgcgpYTr9HVAgQQvq4ZG7StCOoX8pDZNQOVFR2gLh5Q7W9s9gAEEDGdU0loOy+axM4pKN4bgRY/xGc+QAAxUtg9h5Wcb8jtngMEGABphoApdIiovgAAAABJRU5ErkJggg==",
      "aaa",
    );
  }

  function jsonp() {
    $$.jsonp('https://alibaba.github.io/BizCharts/public/data/world.geo.json').then(resp => {
      console.log(resp);
    })
  }

  function timeoutRequest() {
    $$.get("http://192.168.202.122", {a: 123}, {timeout: 400})
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  function onUpload() {
    const data = new FormData();
    data.append('file', document.querySelector('#avatar').files[0]);
    data.append('user', 'weiq');

    $$.get('http://httpbin.org/get', data).catch(e => console.error('upload error!', e));
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
      <button onClick={e => $$.removeStore("name")}>删除</button>
      <button onClick={e => $$.clearStore()}>清空</button>
      <h1>Request</h1>
      <button onClick={requestGet}>get</button>
      <button onClick={concurrencyRequest}>并发取</button>
      <button onClick={beforeRequest}>BeforeRequest</button>
      <button onClick={timeoutRequest}>TimeoutRequest</button>
      <button onClick={customParseResponse}>CustomParseResponse</button>
      <h1>download</h1>
      <button onClick={download}>download</button>
      <h1>JSONP</h1>
      <button onClick={jsonp}>JSONP</button>
      <h1>Upload FormData</h1>
      <input type="file" id="avatar" name="avatar" />
      <button onClick={onUpload}>Upload</button>
    </div>
  );
};
ReactDOM.render(<A />, document.getElementById("__react-content"));
