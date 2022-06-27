//🔒路由鉴权组件，判断用户有没有登录(判断本地浏览器有没有 token), 没有登陆的话则重定向强制跳转回登录页面

//🌟思路：判断 token 是否存在
	//如果存在，则直接正常渲染
	//如果不存在，则重定向到登录的路由页
	
//🌟高阶组件：把一个组件当作另外一个组件的参数传入，然后通过一定的判断返回新的组件

import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom' //🌟🌟通过路由的 Navigate to 组件进行重定向导航

function AuthComponents({ children }){//默认参数，只要是在组件内写的任何东西都会放到 children 内
	const isHaveToken = getToken()
	if(isHaveToken){ //判断 token 是否存在
		return <>{ children }</>
	}else{
		return <Navigate to='/login' replace/>//replace 替换路由
	}
}


export { AuthComponents }
//🔥以后的组件都可以在路由的位置这么包裹 -> <AuthComponent> ... </AuthComponent> ， 这样 ... 就是 AuthComponent 的 children
//🔥比如：<AuthComponent> <layout /> </AuthComponent>
	//登录了则会渲染为：<>{<layout /></>
	//非登录则会渲染为：<Navigate to='/login' replace/>/

