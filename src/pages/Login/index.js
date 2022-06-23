//登录模块业务组件

import { Card } from 'antd'
import logo from '@/assets/logo-redux.png'
import './index.scss'   //导入样式文件
import { Button, Checkbox, message, Form, Input } from 'antd';
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'  //路由导航




function Login (){

	const { loginStore } = useStore() //🌟解构赋值，因为这里返回的是 index 实例对象，边也包含了 loginStore 类的方法
	const navigate = useNavigate() //🌟路由导航的 hook
	
	//提交输入框后的异步函数
	async function onFinish(values){ //value 放置的是表单项中所有用户输入的内容（ant 封装好了）
		console.log(values);
		
		try{//成功的情况
			await loginStore.getToken({//🔥🔥🔥🔥调用在 store 打包好的方法
				mobile: values.mobile,
				code:   values.code,
			})
			//跳转到首页
			navigate('/', { replace: true })//true 为替换为 /路径 而不是覆盖
			// 提示用户
			message.success('Login success!')
			
		} catch(e) {//失败的提示
			message.error(e.response?.data?.message ||'Error!')
		}
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
					initialValues={{  //🔥默认填入的预设密码，注意，这里 mock 的数据里 246810 才是正确的
					  remember: true,
					  mobile: '13811111111',
                      code: '246810'
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
								len:6,//至少需要 6 位数字
								validateTrigger:'onBlur', //触发时机
								message: 'Please enter an 6-digit password'
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