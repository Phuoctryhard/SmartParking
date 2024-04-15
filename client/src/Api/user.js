import http from '../until/http'
const url = 'login'
const regiter = 'register/register'
const UserApi = {
  login: (body) => {
    return http.post(url,body)
  },
  signup: (body) => {
    return http.post(regiter,body)
  }
}
export default UserApi
