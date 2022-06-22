import { Card } from 'antd'
import logo from '@/assets/logo-redux.png'
import './index.scss'//导入样式文件
import { Button, Checkbox, Form, Input } from 'antd';
import { useStore } from '@/store'




function Login (){

	const { loginStore } = useStore() //🌟解构赋值，因为这里边也包含了 loginStore 类的方法

	//提交输入框后的函数
	function onFinish(values){ //value 放置的是表单项中所有用户输入的内容（ant 封装好了）
		
		loginStore.getToken({//🔥🔥🔥🔥调用在 store 打包好的方法
			mobile: values.mobile,
			code:   values.code,
			remember: true,
		})
		console.log(values);
	}


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
					onFinish={onFinish} //输入完成后的回调函数
				> 
				
					{/* 手机号框 */}
					<Form.Item  
						name="mobile"
						rules={[ //可以定义多个规则
							{
								required: true, 
								message: 'Please input your phone number!' 
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
						name="code"
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
						<Input className="login-inputBar" size="large" placeholder="Input the characters"/>
					</Form.Item>
					
					{/* 底部的 checkbox*/}
					<Form.Item
						name="remember" 
						valuePropName="checked" >
						<Checkbox className="login-checkbox-label"> Click to agree to 【User Privacy Agreement】.</Checkbox>
					</Form.Item>

					{/* 按钮 */}
					<Form.Item>
						<Button block type="primary" htmlType="submit" size="large" className="login-btn">登录</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}



export default Login