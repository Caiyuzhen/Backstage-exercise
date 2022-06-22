//把所有额模块做统一处理
//下面这个登录注册的样板代码可以复用
import  LoginStore  from './login.Store'
import React from 'react'


class RootStore {
	constructor(){
		this.loginStore = new LoginStore()//相当于获得了 LoginStore 内的 token
		//更多的 new（）...
	}
}

//实例化根
const rootStore = new RootStore()

//🔥🔥导出 useStore context, 用来跨组件的去传递数据
const context = React.createContext(rootStore) //打包 rootStore 数据
const useStore = () => React.useContext(context)//取 rootStore 的值

export {useStore}