import axios from 'axios'
import { getAccessToken } from './auth'

class Http {
  instance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })

    this.instance.interceptors.request.use(
      (config) => {
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
