import Axios from 'axios'
const env =process.env.NODE_ENV
let baseURL

if(env==="development"){
  baseURL='http://localhost:8081'
}else if(env==="production"){
  baseURL=''
}
let instance =Axios.create()//创建Axios实例
instance.defaults.baseURL=baseURL
instance.defaults.timeout=10000
instance.interceptors.request.use(request=>{
  console.log('请求之前拦截')
  console.log(request)
  return request
})

instance.interceptors.request.use(response=>{
  console.log('请求之后拦截')
  console.log(response)
  return response
})
export default instance
