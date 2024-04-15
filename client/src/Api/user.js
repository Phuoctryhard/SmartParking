import http from '../until/http'
const url = 'login'

const UserApi = {
  login: (body) => {
    return http.post(url,body)
  }
}
export default UserApi
