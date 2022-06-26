import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'moment/locale/zh-cn'//配置成中文
import locale from 'antd/es/date-picker/locale/zh_CN'//配置成中文
import './index.scss'


const { Option } = Select
const { RangePicker} = DatePicker


const Article = () =>{
	return (
		<div>
			<Card title={
				<Breadcrumb separator=">">
					{/* 🍞面包屑导航 */}
					<Breadcrumb.Item>  <Link to="/"> 首页 </Link>  </Breadcrumb.Item>
					<Breadcrumb> 内容管理 </Breadcrumb>
				</Breadcrumb>}>

			</Card>
		</div>
	)
}

export default Article

