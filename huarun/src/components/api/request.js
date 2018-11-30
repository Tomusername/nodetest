import Axios from 'axios'
const env =process.env.NODE_ENV
let baseURL

if(env ==='development'){
  baseURL='http://172.20.9.43:8080'

}else if(env ==='prodoction'){
  baseURL=''
}


let instance = Axios.create()
instance.defaults.baseURL = baseURL
instance.defaults.timeout = 10000
instance.interceptors.request.use(request => {
  console.log(request)
  return request
})
instance.interceptors.response.use(response => {
  console.log(response)
  return response
})
export default instance
