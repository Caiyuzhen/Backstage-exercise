import './index.scss'
import {Card,Breadcrumb,Form,Button,Radio,Input,Upload,Space,Select} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';


// function Publish(){}

//🔥🔥记得解构出下拉菜单的选项！
const { Option } = Select


const Publish = () =>{

	const { channelStore } = useStore()

	const[fileList, setFileList] = useState([])//存放上传图片的列表(图片是一个数组)
	const onUploadChange = (result) =>{//上传图片的方法，接收返回值
		console.log(result);
		setFileList(fileList)
	}

	return(
		<div className='publish'>
			<Card
				title={
					//🔥🔥两个并列的面包屑外需要加多一层！跟 form 一样的逻辑
					<Breadcrumb separator=">">
						<Breadcrumb.Item>
							<Link to="/home">Home</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>	
							Publish Article
						</Breadcrumb.Item>
					</Breadcrumb>}>
						
				{/* 总的表单,🔥🔥🔥onFinish 是用来搜集表单组件内的所有值(这里用来搜集富文本编辑器的值)  */}
				<Form 
					labelCol={{span:4 }}  
					wrapperCol={{span:16}} 
					//👇输入框的初始化值 
					initialValues={{type:1, content:'this is content' }}>

					{/* 输入框 1 */}
					<Form.Item 
						label="Title"  
						name="title"  
						rules={[{required:true , message:'请输入文章'}]}>
							<Input placeholder='请输入文章标题' style={{witch:400}}/>
					</Form.Item>

					{/* 输入框 2 */}
					<Form.Item 
						label="Channel"  
						name="channel_id"  
						rules={[{required:true , message:'请选择文章频道'}]}>
							<Select placeholder='请输入文章标题' style={{witch:400}}>

								{/* 渲染 api 返回的 channel 数据 */}
								{channelStore.channelList.map( channel => 
									<Option value={channel.id} key={channel.id}> {channel.name} </Option>
								)}
							</Select>
					</Form.Item>

					{/* ⚡️单选项一组 */}
					<Form.Item label="封面">
						<Form.Item name="type">
							<Radio.Group>
								<Radio value={1}>单图</Radio>
								<Radio value={3}>三图</Radio>
								<Radio value={0}>无图</Radio>
							</Radio.Group>
						</Form.Item>

						<Upload 
							name="image" 
							listType='picture-card' 
							className='avatar-uploader' 
							showUploadList
							action="http://geek.itheima.net/v1_0/upload"//调用上传接口
							fileList={fileList}
							onChange={onUploadChange}//上传列表发生变化后会执行这个回调，然后我们要存在 mobx ，把这个状态告诉后端
							>
								{/* icon */}
								<div style={{ marginTop: 8 }}><PlusOutlined/></div>
						</Upload>
					</Form.Item>
					
					<Form.Item
						label="富文本编辑器"
						name="content" //富文本编辑器的内容
						rules={[{ required: true, message: '请输入文章内容' }]}>
						
						{/* 渲染一下富文本编辑器 https://github.com/zenoamaro/react-quill */}
						<ReactQuill theme="snow"/>
					</Form.Item>
					
					<Form.Item wrapperCol={{ offset: 4 }}>
						<Space>
							<Button size="large" type="primary" htmlType="submit">
								发布文章
							</Button>
						</Space>
					</Form.Item>

				</Form>
			
			</Card>
		</div>
	)
}

export default observer(Publish)