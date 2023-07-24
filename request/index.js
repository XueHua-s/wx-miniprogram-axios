export default (base) => new Promise((success, error) => {
  let queryUrl = ''
  if (base.params) {
    for (const [key, value] of Object.entries(base.params)) {
      queryUrl += `${key}=${value}&`
    }
  }
  wx.request({
    url: base.url + (base.params ? '?' : '') + (base.params ? queryUrl.substring(0, queryUrl.length - 1) : ''),
    header: base.header,
    method: base.method,
    dataType: base.dataType||'json',
    data: base.data,
    timeout: base.timeout,
    success: (reseponse) => {
      success(reseponse)
    },
    fail: (err) => {
      error(err)
    }
  })
})
