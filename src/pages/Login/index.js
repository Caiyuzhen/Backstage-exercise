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
				
				{/* 渲染 antd 的表单 */}
				<Form 
					//总的配置项:子项用到的配置项都需要在 Form 这里集中声明一下
					validateTrigger={['onBlur', 'onChange']} //失焦的时候就开始校验
					initialValues={{  //记住默认的密码
						remember: true, 
						password:'12345678'
						}}
					
					> 
				
					{/* 手机号框 */}
					<Form.Item 
						name="username"
						rules={[ //可以定义多个规则
							{
								required: true, 
								message: 'Please input your username!' 
							},{
								pattern: /^1[3-9]\d{9}$/, //正则
								validateTrigger:'onBlur', //触发时机
								message: 'Please enter correct phone number!'
							}
						]}>
						<Input className="login-inputBar" size="large" placeholder="Input your phone number"/>
					</Form.Item>
					
					{/* 密码框 */}
					<Form.Item
						name="password"
						rules={[ //可以定义多个规则
							{ 
								required: true, 
								message: 'Please input your password!'
							},{
								len:8,//至少需要 8 位数字
								validateTrigger:'onBlur', //触发时机
								message: 'Please enter an 8-digit password'
							}
						]}>
						<Input.Password className="login-inputBar" size="large" placeholder="Input the characters"/>
					</Form.Item>
					
					{/* 底部的 checkbox 跟按钮 */}
					<Form.Item
						name="remember" 
						valuePropName="checked" >
						<Checkbox className="login-checkbox-label"> Click to agree to 【User Privacy Agreement】.</Checkbox>
						<Button block type="primary" htmlType="submit" size="large" className="login-btn">登录</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}






export default Login