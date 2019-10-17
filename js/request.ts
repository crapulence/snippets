import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/token'
import { Notify } from 'vant'

const service = axios.create({
  timeout: 30000
})

const CODE_MESSAGE = {
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  500: '服务器发生错误，请检查服务器。'
}

const AUTH_SERVER = ['/login', '/user']

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  
  AUTH_SERVER.some(url => config.url.startsWith(url))
    ? config.baseURL = process.env.VUE_APP_AUTH_SERVER_URL + '/api'
    : config.baseURL = process.env.VUE_APP_SERVER_URL + '/api'

  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  const res = response.data
  if (res.result !== 0) {
    Notify({
      type: 'danger',
      message: res.message
    })
  } else {
    return res
  }
  return Promise.reject(new Error(res.message || 'Error'))
}, error => {
  if (error && error.response) {
    const status = error.response.status

    Notify({
      type: 'danger',
      message: CODE_MESSAGE[status]
    })
    
    if (status === 401 || status === 403) {
      store.dispatch('user/logout').then(() => {
        location.reload()
      })
    }
  }
  return Promise.reject(error)
})

export default service
