import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import { Button } from 'antd'
import Login from '@/pages/Login'  //别名路径的方式
// import Login from './pages/Login'  //传统的导入方式
import { AuthComponents } from '@/components/AuthComponents'
import './App.css'
import Publish from './pages/Publish'
import Article from './pages/Article'
import Home from './pages/Home'



//配置路由——————————————————————————————————————————————————————

function App ()
{
	return (
		//路由配置（包裹）
		<BrowserRouter>
			<div className="App">
				{/* 一级路由出口 */}
				<Routes>
					{/* 🔥一级路由:创建路由 path 跟组件的对应关系, 注意，🔥🔥这里 Layout 不能写死！要包裹 <AuthComponents> 鉴权看是否登录了！！ */}
					<Route path='/'   element={ <AuthComponents> <Layout /> </AuthComponents> }>  
						{/* 🔥二级路由:页面内的路由跳转,index 为默认页面，⚡️⚡️二级路由记得配置路由出口！！！ */}
						<Route index            element={<Home/>}></Route>
						<Route path='article'   element={<Article/>}></Route>
						<Route path='publish'   element={<Publish/>}></Route>
					</Route>
					{/*  🔥一级路由 */}
					<Route path='/login'  element={ <Login /> }>  </Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
