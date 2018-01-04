import Request from './request/request';

class L {
   /**
    * 生成指定位数的随机数
    * @param {int} x 
    */
  static randomStr = (x) => {
    let s = "";
    while(s.length < x && x > 0){
      let v = Math.random() < 0.5 ? 32 : 0;
      s += String.fromCharCode(Math.round(Math.random() * ((122 - v) - (97 - v)) + (97 - v)));
    }
    return s;
  }
}

export default L;