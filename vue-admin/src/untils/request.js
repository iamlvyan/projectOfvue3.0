import axios from 'axios';
import { Message } from 'element-ui';
/**
 * 创建axios拦截器，赋给server
 */
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';
const server = axios.create({
    baseURL: BASEURL,
    timeout: 1000
});
/**
 * 添加请求拦截
 */
server.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
/**
 * 添加响应拦截
 */
server.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
        Message({
            showClose: true,
            message: data.message,
            type: 'error'
        });
    } else {
        Message({
            message: data.message,
            type: 'success'
        })
        return response;
    }
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default server;