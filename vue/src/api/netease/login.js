import { getRequest } from '../api'

export function login(params, callback) {
  // /api/v1/login
  getRequest('json/login.json',params, callback)
}
