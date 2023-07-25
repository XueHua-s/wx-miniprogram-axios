import request from "./request/index.js"
// Axios原型工具类
const requestUntils = Object.create({
  interceptors: {
    requestBefore (callBack) {
      requestUntils.__proto__.requestBefore  = callBack
    },
    responseBefore (callBack) {
      requestUntils.__proto__.responseBefore  = callBack
    }
  }
})
const axios = (config) => {
  let baseConfig = null
  if (typeof axios.__proto__.requestBefore === 'function') {
    // 处理请求拦截器
    baseConfig = axios.__proto__.requestBefore({
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
    config.dataType = baseConfig.dataType
  }
  return new Promise(async (reject, resolve) => {
    request(config)
      .then((res) => {
        // 处理响应拦截器高阶函数
        if (typeof axios.__proto__.responseBefore === 'function') {
          reject(axios.__proto__.responseBefore(res))
        } else {
          reject(res)
        }
      })
      .catch(err => {
        if (typeof axios.__proto__.responseBefore === 'function') {
          resolve(axios.__proto__.responseBefore(err))
        } else {
          resolve(err)
        }
      })
  })
}
axios.__proto__ = requestUntils
export default axios
