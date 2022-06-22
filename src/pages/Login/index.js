import { Card } from 'antd'
import logo from '@/assets/logo-redux.png'
import './index.scss'//导入样式文件
import { Button, Checkbox, Form, Input } from 'antd';

function Login (){
	return (
		<div className="login">
			{/* 渲染 antd 的卡片 */}
			<Card className="login-container">
				<img className="login-logo" src={logo} alt="" />
				
				<Form>
					<Form.Item>
						<Input size="large" placeholder="Input your phone number"/>
					</Form.Item>
					<Form.Item>
						<Input.Password size="large" placeholder="Input the characters"/>
					</Form.Item>
					<Form.Item>
						<Checkbox className="login-checkbox-label"/>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}






export default Login