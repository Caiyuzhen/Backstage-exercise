import { BrowserRouter, Routes, Route,unstable_HistoryRouter as HistoryRouter } from 'react-router-dom' // XXX as XXX 是重命名
import { history } from './utils/history'
import { AuthComponents } from '@/components/AuthComponents' //自动鉴权
import './App.css'

//👇路由懒加载的方式（按需导入组件）
import { lazy, Suspense } from 'react'//懒加载组件
const Login = lazy(()=>import('./pages/Login'))
const Layout = lazy(()=>import('./pages/Layout'))
const Home = lazy(()=>import('./pages/Home'))
const Article = lazy(()=>import('./pages/Article'))
const Publish = lazy(()=>import('./pages/Publish'))



//👇没有懒加载的方式
// import Login from '@/pages/Login'  //别名路径的方式
// import Layout from './pages/Layout'
// import Home from './pages/Home'
// import Article from './pages/Article'
// import Publish from './pages/Publish'



//——————————
// import { Button } from 'antd'
// import Login from './pages/Login'  //传统的导入方式




//配置路由——————————————————————————————————————————————————————

function App (){
	return (
		//路由配置（包裹）,<BrowserRouter>为不带历史记录的包裹方式, <HistoryRouter> 为带历史记录的包裹方式
		// <BrowserRouter>
		<HistoryRouter history={history}>
			<Suspense
				fallback={//可以渲染 loading 组件
					<div style={{textAlign:'center', marginTop:200}}>
						Loading...
					</div>
				}
			>
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
			</Suspense>
		</HistoryRouter>
		// </BrowserRouter>
	)
}

export default App
