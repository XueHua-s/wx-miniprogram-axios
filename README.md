# NPM
  [NPM地址](https://www.npmjs.com/package/xh-miniprogram-axios)
# 简介
    一个基于Promise对微信小程序原生请求方法 wx.request 进行二次封装的请求工具。
## 发送一个请求
    axios({
      url: 'https://www.baidu.com',
      method: 'GET',
      params: {
        name: 123
      }
    })
    .then(res => {
      console.log(res)
    })
## 添加请求拦截器
### 说明
    通过baseUrl参数，为后面的请求添加url前缀
    一些公共的请求参数, 都可以在通过请求拦截器进行添加。
    你需要在请求前做的一些操作,都可以在里面进行。(例如: loading动画)
### 实例
    axios.prototype.requestBefore((config) => {
      config.baseUrl = 'https://www.baidu.com',
      config.header = {
        userType: '2'
      }
      return config
    })
## 添加响应拦截器
### 说明
    你可以在响应拦截器中对错误进行捕获
    从而去自己对错误作出一些解释，进行抛出。
    也可以在返回响应结果之前，进行一些操作。(例如: loading动画)
### 实例
    axios.interceptors.responseBefore((res) => {
      try {
        return res
      } catch {
        throw '请求发生了一些错误'
        return res
      }
    })
## 完整实例
    import axios from '../utils/wx-miniprogram-axios/index.js'
    import { baseUrl } from '../utils/base'
    axios.interceptors.requestBefore((base) => {
        base.baseUrl = baseUrl
        base.header = {
        }
        return base
    })
    axios.interceptors.responseBefore((err) => {
        return err
    })
    export default axios
