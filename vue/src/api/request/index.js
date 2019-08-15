import axios from 'axios'

export default function request(url, config) {
  return axios(url, config)
}
