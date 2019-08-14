import { postRequest } from '../api'

// 查询商品
export function queryGoods (callback, params) {
  postRequest('/queryGoods', params, callback)
}
