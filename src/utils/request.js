import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API // api的base_url
  // timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
  response => {
    const res = response.data
    if (res.code !== 200 && res.code !== 50001) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50000:其他客户端登录了;
      if (res.code === 50000 || res.code === 50002 || res.code === 50003 || res.code === 60003 || res.code === 10000) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      if (res.data === null) {
        res.data = {}
      }
      return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: !error.response ? error.message : !error.response.statusText ? error.message : error.response.statusText,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
