import Vue from 'vue'
import axios from 'axios'
import config from './config'

axios.defaults.baseURL = config.url; // 设置axios的基础请求路径
axios.defaults.timeout = 10000; // 设置axios的请求时间
axios.defaults.withCredentials = true  //跨域时带上cookie




//axios.interceptors 拦截器，拦截请求前和请求后，then,catch处理之前，对数据进行处理
axios.interceptors.response.use(function(res){
  //返回正常
  return Promise.resolve(res);
},function(error){
  //返回异常
  return Promise.reject(error.response.data);
})



// request拦截器
// axios.interceptors.request.use(config => {
//   var token = getToken();
//   if (token) {
//     <!--设置请求头部信息-->
//     config.headers['Authorization'] = token;
//   }
//   return config;
// }, error => {
//   // Do something with request error
//   Promise.reject(error);
// })

axios.loadData = async function (url) {
  const resp = await axios.get(url);
  console(resp.data);
  return resp.data;
}


Vue.prototype.$http = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象

