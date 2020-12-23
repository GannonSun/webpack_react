import axios from "axios";
import { message } from "antd";
// import routerPath from 'router/routerPath';
// import authUtils from './authUtils';

// 创建axios实例
// axios.defaults.withCredentials = true;
const service = axios.create({
  timeout: 30000, // 请求超时时间
  baseURL: "/api", //请求前缀，根据实际情况修改
  withCredentials: true,
});

const setCookie = (key, value, t) => {
  var myDate = new Date();
  myDate.setDate(myDate.getDate() + t);
  document.cookie = key + "=" + value + ";expires=" + myDate.toGMTString();
};

// request拦截器
service.interceptors.request.use(
  (config) => {
    // nprogressUtils.start();
    let tokenId = "";
    // let tokenId = authUtils.getTokenId();
    if (typeof tokenId == "undefined") {
      tokenId = "";
    }
    config.headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "Origin",
      Authorization: tokenId,
    };
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    // nprogressUtils.done();
    if (response.data.code === "904") {
      message.info(response.data.message, 2, () => {
        sessionStorage.removeItem("tokenId");
        sessionStorage.removeItem("userName");
        setCookie("JSESSIONID", "", -1);
        // window.location.pathname = routerPath.app.login;
      });
    } else {
      return response;
    }
  },
  (error) => {
    // nprogressUtils.done();
    console.log("err", error); // for debug
    message.error(error.message, 3);
    return Promise.reject(error);
  }
);

export default service;
