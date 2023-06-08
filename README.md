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
    axios.prototype.requestEach((config) => {
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
    axios.prototype.responseEach((res) => {
      try {
        return res
      } catch {
        throw '请求发生了一些错误'
        return res
      }
    })
## 完整实例
  import axios from 'xh-miniprogram-axios/index'
  import { baseUrl, tipsDuration } from '../utils/base'
  // 请求拦截
  axios.prototype.requestEach((base) => {
    base.baseUrl = baseUrl
    base.timeout = 1000 * 1000
    base.params = { t: new Date().getTime() }
    const tokenInfo = wx.getStorageSync('tokenInfo')
    // console.log(tokenInfo)
    base.header = {
    }
    if (typeof tokenInfo === 'object') {
      base.header[tokenInfo.tokenName] = 'Bearer ' + tokenInfo.tokenValue
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    return base
  })
  // 响应拦截
  axios.prototype.responseEach((response) => {
    wx.hideLoading()
    // console.log(response, 'responsae')
    if (response.statusCode !== 200) {
      if (wx.getStorageSync('userIsStop').indexOf('停用') !== -1) {
        wx.showToast({
          title: wx.getStorageSync('userIsStop'),
          icon: 'error',
          mask: true,
          duration: tipsDuration
        })
        return
      }
      // 错误
      wx.showToast({
        title: response.data.returnMsg,
        icon: 'error',
        mask: true,
        duration: tipsDuration
      })
      // if (response.data.returnMsg === 'token无效') {
      //   // 续费token
      //   wx.login({
      //     success: (res) => {
      //       console.log(res, 'login111')
      //     }
      //   })
      // }
    } else {
      // 正确处理
    }
    return response.data
  })
  export default axios