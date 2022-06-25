import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class UserInfoStore {
	userInfo = {} //⚡️⚡️⚡️首次加载时会获取的用户信息，在异步函数执行完后如果设置了 observer 则会更新新的数据进来

	//💥💥💥💥响应式的处理动态数据 - makeAutoObservable
	constructor(){
		makeAutoObservable(this)
	}

	//获取用户信息的方法
	getUserInfo = async() =>{
		//调用接口获取数据,通过 xxx.data 来获取接口内的数据
		const res = await http.get('/user/profile') //⚡️⚡️⚡️通过 http 的拦截器取得 token 并发送请求
		this.userInfo = res.data //把接口内的数据赋值给 useInfo {}
	}
}


export default UserInfoStore