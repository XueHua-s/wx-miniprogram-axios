import request from "./request/index.js"
/**
 * @param { object } config
 * @param { string } config.url - 请求路径
 * @param { object } config.params - 链接参数
 * @param { object } config.header - 请求头参数
 * @param { 'POST' | 'GET' | 'PUT' | 'DELETE' } config.method - 请求的类型
 * @param { object } config.data - 请求体参数
 * @param { number } config.timeout - 请求超时触发时间
 * @returns { Promise } 返回一个Promise对象
 * @function 基于promise对wx.request进行二次封装
 * @description 作者: 雪花，QQ: 1006084794
 * @version 版本: 1.2.5
 */
const axios = (config) => {
  let baseConfig = null
  if (typeof axios.prototype.requestBefore === 'function') {
    // 处理请求拦截器
    baseConfig = axios.prototype.requestBefore({
      baseUrl: '',
      header: ''
    })
    config.url = baseConfig.baseUrl + config.url
    config.header = {
      ...config.header,
      ...baseConfig.header
    }
    config.params = {
      ...config.params,
      ...baseConfig.params
    }
    config.data = {
      ...config.data,
      ...baseConfig.data
    }
    config.timeout = baseConfig.timeout
  }
  return new Promise(async (reject, resolve) => {
    request(config)
    .then((res) => {
      if (typeof axios.prototype.responseBefore === 'function') {
        reject(axios.prototype.responseBefore(res))
      } else {
        reject(res)
      }
    })
    .catch(err => {
      if (typeof axios.prototype.responseBefore === 'function') {
        resolve(axios.prototype.responseBefore(err)) 
      } else {
        resolve(err)
      }
    })
  })
}
/**
 * @param { Function } callback - 为回调函数
 * @returns { undefined } 没有返回值
 * @function 请求拦截器
 */
axios.prototype.requestEach = (callback) => {
  axios.prototype.requestBefore = callback
}
/**
 * @param { Function } callback - 为回调函数
 * @returns { undefined } 没有返回值
 * @function 响应拦截器
 */
axios.prototype.responseEach = (callback) => {
  axios.prototype.responseBefore = callback
}
export default axios
