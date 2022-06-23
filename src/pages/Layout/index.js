import { Layout , Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.scss'

const { Header , Sider } = Layout //HLayout 包含了 header Sidebar Content Footer 几个子组件

function mainLayout() {
	return (		
		<Layout>		
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
			<Layout>
				<Sider width={200} className="site-layout-background">
					<Menu
						className="menu-background"
						mode="inline"
						theme="dark"
						defaultSelectedKeys={['1']}
						style={{ height: '100%', borderRight: 0 }}
					>
						<Menu.Item icon={<HomeOutlined />} key="1" className="menuitem">数据概览</Menu.Item>
						<Menu.Item icon={<DiffOutlined />} key="2" className="menuitem">内容管理</Menu.Item>
						<Menu.Item icon={<EditOutlined />} key="3" className="menuitem">发布文章</Menu.Item>
					</Menu>
				</Sider>
				{/* 内容区域 */}
				<Layout className="layout-content" style={{ padding: 20 }}>Context</Layout>
			</Layout>
		</Layout>

	)
}

export default mainLayout