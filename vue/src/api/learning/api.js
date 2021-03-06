import axios from 'axios';

const error = () => {};

/**
 * 封装axios
 * @param {*} url 接口地址
 * @param {*} params 参数
 * @param {*} callback 成功的回调
 * @param {*} errorCallback 失败的回调
 */
export function postRequest(url, params, callback, errorCallback = error()) {
  const hostUrl = `${url}`; // 测试环境
  // let hostUrl = `product/${url}` // 生产环境
  // 发送请求
  axios.post(hostUrl, params).then((res) => {
    console.log('res', res);
    const { data } = res;

    // data.resCode === '000' && callback(data) ||
    // data.resCode === '0001' && errorCallback(data) ||
    // data.resCode === '0002' && callback(data) ||
    // data.resCode === '100' && setTimeout(() => {
    //   window.location.href = '/login'
    // }, 3000)

    /*
    if (data.code === '000') {
      callback(data);
    } else if (data.code === '0001') {
      console.log('resCode', data.resCode);
      errorCallback(data);
    } else if (data.code === '0002') {
      console.log('resCode', data.resCode);
      callback(data);
    } else if (data.code === '100') {
      console.log('用户未登录');
      setTimeout(() => {
        // 跳转到登陆页
        window.location.href = '/login';
      }, 3000);
    }
    */
    callback(data)
  }).catch((err) => {
    console.log(err);
  });
}


export function getRequest(url, params, callback, errorCallback = error()) {
  const hostUrl = `${url}`; // 测试环境
  // let hostUrl = `product/${url}` // 生产环境
  // 发送请求
  axios.get(hostUrl, params).then((res) => {
    console.log('res', res);
    const { data } = res;
    callback(data)
  }).catch((err) => {
    console.log(err);
  });
}
