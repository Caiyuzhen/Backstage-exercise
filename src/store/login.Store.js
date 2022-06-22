//login module
import { makeAutoObservable } from 'mobx';
import { http } from '@/utils'



class LoginStore {
	token = ''

	constructor(){
		//响应式的处理
		makeAutoObservable(this)
	}

	//👇定义获得 token 的方法, 🔥🔥🔥然后在业务组件里边调用这个类的这个方法进行传参数
	getToken = async ({mobile,code}) => {//接收输入框传入的 {usename,password} 数据，解构赋值, {mobile,code} 是后端要求的命名码

	//用异步函数把参数发送出去，调用登录接口 (token 鉴权接口)
		const res = await http.post('http://geek.itheima.net/v1_0/authorizations',{
			mobile,code
		})
		//拿到 token 并存入 token 数据
		this.token = res.data
	}
}

export default LoginStore