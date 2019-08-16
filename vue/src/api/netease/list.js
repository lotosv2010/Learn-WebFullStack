import baseRequest from '../api'
import url from '../apiUrl'

// 获取列表
export function getList() {
    return baseRequest(url.list, {
    method: 'get'
  })
}