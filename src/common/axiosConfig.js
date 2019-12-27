import axios from 'axios';
import { message } from 'antd';
// 创建axios实例
let service = null;
if (process.env.NODE_ENV === 'development') {
    service=  axios.create({
        baseURL: '/api', // api的base_url
        timeout: 50000, // 请求超时时间
    });
} else {
    // 生产环境下
    service=  axios.create({
        baseURL: '/api', // api的base_url
        timeout: 50000, // 请求超时时间
    });
}
message.config({
    top: 150
})

let hide
let here

const onRequestSuccess = (config) => {
    return config;
}

const onResponseError = (response) => {
    if (here) {
        setTimeout(hide, 500);
        here = false;
    }
    return response
};

service.interceptors.request.use(onRequestSuccess);
service.interceptors.response.use(onResponseError);

export default function (path = '', data = {}, type = 'GET') {
    if (type === 'GET') {
        let pathParam = ''
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                pathParam += key + '=' + data[key] + '&';
            }
        }
        if (pathParam) {
            path += "?" + pathParam.substring(0, pathParam.length - 1)
        }
        return service.get(path)
    } else {
        // 发送 post 请求
        return service.post(path, data) // data: 包含请求体数据的对象
    }
}