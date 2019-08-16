import axios from 'axios'

// export default function request(url, config) {
//   return axios(url, config)
// }

function getTokenByLocal() {
  return sessionStorage.getItem('token') || ''
}

// 创建一个axios实例
const service = axios.create({
  baseURL: '/app',
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(
  config => {
    const token = getTokenByLocal()
    if(token) {
      // 让每个请求携带自定义的token
      config.headers['token'] = token
      // 后台接收参数的类型
      // config.headers['ContentType'] = 'application/form-data;charset=utf-8'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    // const token = sessionStorage.getItem('token')
    if (res.code === 401) {
      console.log(res.errorMsg)
    } else if (res.code === 402) {
      location.href = '/'
    }
    return Promise.resolve(res)
  },
  error => {
    return Promise.reject(error)
  }
)

export default service