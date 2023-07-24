import request from "./request/index.js"
// Axios原型工具类
const requestUntils = {
  interceptors: {
    requestBefore (useFun) {
      return useFun
    },
    responseBefore (useFun) {
      return useFun
    }
  }
}
const axios = Object.create(requestUntils, (config) => {
  let baseConfig = null
  if (typeof axios.interceptors.requestBefore === 'function') {
    // 处理请求拦截器
    baseConfig = axios.interceptors.requestBefore()({
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
        // 处理响应拦截器高阶函数
        if (typeof axios.interceptors.responseBefore === 'function') {
          reject(axios.interceptors.responseBefore()(res))
        } else {
          reject(res)
        }
      })
      .catch(err => {
        if (typeof axios.interceptors.responseBefore === 'function') {
          resolve(axios.interceptors.responseBefore()(err))
        } else {
          resolve(err)
        }
      })
  })
})
export default axios
