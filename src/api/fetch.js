import Util from "../utils/util";
import qs from "qs";
import Vue from "vue";
import {
  Loading,
} from "element-ui";
import hint from "@/common/hint";
import store from "../store";
Util.ajax.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest"
};
var loading;
Util.ajax.interceptors.request.use(
  config => {
    console.log(config)
    if (config.params && config.params.un_loding) {
      //在这里做loading ...
    } else {
      loading = Loading.service({
        lock: true,
        text: "正在加载...",
        background: "rgba(0, 0, 0, 0.7)"
      });
    }
    // 获取token
    let token = localStorage.getItem('token');
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    } else {
      delete config.headers["Authorization"]
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Util.ajax.interceptors.response.use(
  response => {
    //在这里做loading 关闭
    loading.close();
    return response;
  },
  error => {
    // 请求失败也把loading关闭
    loading.close();
    let response = error.response;
    if (response) {
      if (response.status === 400) {
        // 处理400错误
        // console.log(response);
        return hint.erro("错误的请求!");
      } else if (response.status === 401) {
        // 处理401错误
        // store.commit("setSession", null);
        localStorage.setItem("token", null);
        location.href = "/#/login";
        return;
      } else if (response.status === 403) {
        // 处理403错误
        return hint.erro("禁止访问!");
      } else if (response.status === 404) {
        // 处理404错误
      } else if (response.status === 413) {
        // 处理413权限不足
      }
    }
    console.error(response);
    return Promise.reject(response);
  }
);

export default {
  post(url, data) {
    return Util.ajax({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  get(url, params) {
    return Util.ajax({
      method: 'get',
      url: url,
      params
    })
  },
  delete(url, params) {
    return Util.ajax({
      method: "delete",
      url: url,
      params,
    });
  },
  put(url, data) {
    return Util.ajax({
      method: "put",
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    });
  },
  patch(url, data) {
    return Util.ajax({
      method: "patch",
      url: url,
      data,
      timeout: 30000,
    });
  },
  importPost(url, data) {
    return Util.ajax({
      method: "post",
      url: url,
      data,
      timeout: 30000,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
};
