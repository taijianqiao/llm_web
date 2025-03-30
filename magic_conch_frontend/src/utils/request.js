import axios from 'axios'
import { BASE_URL } from '@/api/config'

// axios实例
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, 
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加token等通用请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
// 跨域问题后端处理
service.interceptors.response.use(
  response => {
    // 统一处理响应数据结构
    if (response.data.code !== 200) {
      return Promise.reject(response.data.message)
    }
    return response.data.data
  },
  error => {
    // 统一错误处理
    let message = '请求失败'
    if (error.response) {
      message = error.response.data.message || error.response.statusText
    }
    console.error('请求错误：', message)
    return Promise.reject(message)
  }
)

// 添加取消请求功能
export const createCancelToken = () => {
  return axios.CancelToken.source()
}

export const get = (url, params) => {
  return service({
    url,
    method: 'get',
    params
  })
}

export const post = (url, data) => {
  return service({
    url,
    method: 'post',
    data
  })
} 