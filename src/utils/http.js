//封装获取请求响应数据的方法
import axios from "axios";
import  { getToken } from "./token"



//封装 axios

//第一步：实例化
const http = axios.create(
	{
		baseURL: 'http://geek.itheima.net/v1_0', //请求地址
		timeout:5000 //5s后超时
	}
)

//第二步：请求拦截器
http.interceptors.request.use((config)=>{
	//🔥🔥如果本地已经有 token，用这个 http 发起的请求都会则直接注入本地的 token ，可以在多处使用
	const token = getToken()
	
	if(token){
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
	},(error)=> {
		return Promise.reject(error)
})


//第三步：响应拦截器
http.interceptors.response.use((response)=>{
	//成功响应 200~300 的状态码时，执行下面的回调函数
	return response.data
},(error)=>{//当超出 200~300 的状态码时，执行下面的回调函数
	return Promise.reject(error)
})


export { http }