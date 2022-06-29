import { Layout , Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.scss'
import { Outlet,Link,useLocation,useNavigate } from 'react-router-dom'// ⚡️⚡️配置二级路由出口！
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite' //🔥🔥连接：用来刷新页面的时候去动态的获取接口回调的数据（比如用户名在异步渲染出来后会更新视图）


const { Header , Sider } = Layout  //Layout 包含了 header Sidebar Content Footer 几个子组件




function MainLayout() {

	// const  pathLocation  = useLocation() //这是定义一个变量，跟用对象来解构赋值不一样,先用这个方式可以看到这个变量里边有什么对象，然后再去解构赋值
	// console.log(pathLocation);
	const { pathname } = useLocation() //从 react 组件中解构出 pathname 的值
	const { userInfoStore, loginStore, channelStore } = useStore() //从根 store 中解构出 {userInfoStore} 、{loginStore} 两个对象
	const navigate = useNavigate()

	//利用函数的副作用 hook 来获取用户信息、article 信息(只执行一次)
	useEffect(()=>{
		userInfoStore.getUserInfo() //🔥🔥🔥 从 userInfoStore 组件中调用 getUserInfo() 方法来获取接口内的参数
		channelStore.loadChannelList()//发起请求，获取 channel 数据
		// console.log(userInfoStore.userInfo.name) //在函数初始化的时候会自动执行，所以已经拿到值了
	},[userInfoStore,channelStore]) //拿到数据，再去 <span></span> 内进行渲染

	
	//气泡框，确定退出登录
	const onPopConfirm =()=>{
		//退出登录的业务逻辑
		//1.删除 login.Store 内的 token
		loginStore.deleteToken()
		//2.跳转回到登录页 useNavigate 方法
		navigate('./login')
	}



	return (		
		<Layout>
			{/* 顶部 */}
			<Header className="header">
				<div className="logo" />
				<div className="user-info">
					<span className="user-name"> {userInfoStore.userInfo.name} </span>
					<span className="user-logout">
					    <Popconfirm 
							title="Confirm to logout？" 
							okText="Exit" 
							cancelText="Cancel"
							onConfirm={onPopConfirm}>
						    {/* popover 弹窗 */}
						    	<LogoutOutlined /> Exit 
					    </Popconfirm>
			        </span>
				</div>
			</Header>
			
			{/* 底部 */}
			<Layout>
				{/* 侧边栏 */}
				<Sider width={200} className="site-layout-background">
					<Menu
						className="menu-background"
						mode="inline"
						theme="dark"
						defaultSelectedKeys={[pathname]} //.🔥高亮原理: defaultSelectedKeys === item key (下面的 key), 因此需要获取当前激活的 path 路径, 可以通过 useLocation 来获取当前要激活哪个二级路有
						style={{ height: '100%', borderRight: 0 }}
					>
						{/* 🔥🔥导入 Link 组件进行包裹, 配置 to='/' 属性来实现点击后的跳转！ */}
						<Menu.Item icon={<HomeOutlined />} key="/"  className="menuitem">   <Link to='/'> Home </Link>  </Menu.Item>
						<Menu.Item icon={<DiffOutlined />} key="/article"  className="menuitem">   <Link to='/article'> Article</Link>       </Menu.Item>
						<Menu.Item icon={<EditOutlined />} key="/publish"  className="menuitem">   <Link to='publish'> Pubilsh </Link>      </Menu.Item>
					</Menu>
				</Sider>
				
				{/* 内容区 */}
				<Layout className="layout-content" style={{ padding: 20 }}>
					{/* ⚡️⚡️在内容区域记的配置二级路由出口！！！ */}
					<Outlet/>
				</Layout>
			</Layout>
		</Layout>

	)
}

export default observer(MainLayout)