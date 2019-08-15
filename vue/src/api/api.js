import request from './request/'

export default function baseRequest(url, config) {
  return new Promise((resolve, reject) => {
    request(url, config).then(res => resolve(res)).catch(error => reject(error))
  })
}