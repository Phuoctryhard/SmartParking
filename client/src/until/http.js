import axios from 'axios'
import { getAccessToken } from './auth'

class Http {
  instance
  _accessToken
  constructor() {
    this.accessToken = getAccessToken()
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this._accessToken && config.headers) {
          config.headers.authorization = this._accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response)
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
