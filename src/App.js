import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import { Button } from 'antd'
import Login from '@/pages/Login'  //别名路径的方式
// import Login from './pages/Login'  //传统的导入方式


function App ()
{
	return (
		//路由配置（包裹）
		<BrowserRouter>
			<div className="App">
				<Button type="primary">Primary Button</Button>
				{/* 路由出口 */}
				<Routes>
					{/* 创建路由 path 跟组件的对应关系 */}
					<Route path='/' element={<Layout />}></Route>
					<Route path='/login' element={<Login />}></Route>

				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
