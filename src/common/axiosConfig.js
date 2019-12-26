import axios from 'axios';
import { message } from 'antd';

if (process.env.NODE_ENV === 'development') {
    axios.create({
        baseURL: '/api', // api的base_url
        timeout: 50000, // 请求超时时间
        withCredentials: true
    });
} else {
    // 生产环境下
    axios.create({
        baseURL: '/api', // api的base_url
        timeout: 50000, // 请求超时时间
        withCredentials: true
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

axios.interceptors.request.use(onRequestSuccess);
axios.interceptors.response.use(onResponseError);

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
        return axios.get(path)
    } else {
        // 发送 post 请求
        return axios.post(path, data) // data: 包含请求体数据的对象
    }
}