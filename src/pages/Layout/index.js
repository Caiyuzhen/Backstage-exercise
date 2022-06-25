import { Layout , Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.scss'
import { Outlet,Link,useLocation } from 'react-router-dom'// ⚡️⚡️配置二级路由出口！




const { Header , Sider } = Layout  //Layout 包含了 header Sidebar Content Footer 几个子组件


function MainLayout() {

	// const  pathLocation  = useLocation() //这是定义一个变量，跟用对象来解构赋值不一样,先用这个方式可以看到这个变量里边有什么对象，然后再去解构赋值
	// console.log(pathLocation);
	const { pathname } = useLocation()

	return (		
		<Layout>
			{/* 顶部 */}
			<Header className="header">
				<div className="logo" />
				<div className="user-info">
					<span className="user-name">user.name</span>
					<span className="user-logout">
					    <Popconfirm title="Confirm to logout？" okText="Exit" cancelText="Cancel">
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

export default MainLayout