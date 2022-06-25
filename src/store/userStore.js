import { makeAutoObservable } from 'mobx'

class UserStore {
	useInfo = {

	}

	//💥💥💥💥响应式的处理数据
	constructor(){
		makeAutoObservable(this)
	}

	getUserInfo = () =>{
		//调用接口获取数据
	}
}