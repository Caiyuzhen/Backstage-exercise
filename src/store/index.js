//把所有额模块做统一处理
import React from 'react'
import  LoginStore  from './login.Store' //这个登录注册的样板代码可以复用
import UserInfoStore from './userInfoStore'
import ChannelStore from './channelStore'

class RootStore {
	constructor(){
		this.loginStore = new LoginStore()//相当于获得了 LoginStore 内的方法，比如获得 token
		this.userInfoStore = new UserInfoStore()//相当于根实例内获得了 UserInfoStore 内的方法，比如获得 useInfo
		this.channelStore = new ChannelStore()//同上
		
		//更多的实例化 new（）...
	}
}

//实例化根
const rootStore = new RootStore()

//🔥🔥导出 useStore context, 用来跨组件的去传递数据
const context = React.createContext(rootStore) //打包 rootStore 数据
const useStore = () => React.useContext(context)//取 rootStore 的值

export {useStore}