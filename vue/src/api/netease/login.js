import baseRequest from '../api'
import url from '../apiUrl'

export function login(data) {
  // /api/v1/login
  return baseRequest(url.login, {
    method: 'post',
    data
  })
}

export function getUser(params) {
  // /api/v1/login
  return baseRequest(url.getUser, {
    method: 'get',
    params
  })
}
