//login module 的数据模型
import { makeAutoObservable } from 'mobx';
import { http,setToken,getToken } from '@/utils'



class LoginStore {
	token = getToken() || ''//短路运算符:第一个为真则执行第一个的结果，在【初始化】之前，调用本地的 token，如果没有的话才给它空值

	//初始化处理，响应式数据
	constructor(){
		makeAutoObservable(this)
	}

	//👇定义获得 token 的方法, 🔥🔥🔥然后在业务组件里边调用这个类的这个方法进行传参数
	getToken = async ({mobile,code}) => {//接收输入框传入的 {usename,password} 数据，解构赋值, {mobile,code} 是后端要求的命名码

	//用异步函数把参数发送出去，调用登录接口 (token 鉴权接口)
		const res = await http.post('http://geek.itheima.net/v1_0/authorizations',{
			mobile,code
		})
		
		//拿到 token 并往【内存】存入 token 数据
		this.token = res.data.token
		
		//把 token 存入 localStorage
		setToken(this.token)
			
	}
}

export default LoginStore