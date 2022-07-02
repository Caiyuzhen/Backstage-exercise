import './index.scss'
import 'react-quill/dist/quill.snow.css';
import {Card,Breadcrumb,Form,Button,Radio,Input,Upload,Space,Select} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import { http } from '@/utils'


// function Publish(){}


//🔥🔥记得解构出下拉菜单的选项！
const { Option } = Select


const Publish = () =>{

	const { channelStore } = useStore()

	//控制上传图片的列表，临时存储图片(图片是一个数组),🌟fileList 控制图片存 1 张 3 张还是不存
	const[fileList, setFileList] = useState([])

	//🌟🌟11.用 ref 当图片的暂存仓库（存到内存，存放已经上传的图片，会一直存在内存中，不受切换视图的影响
	const cacheImgList = useRef([])



	//上传图片的方法，接收返回值,后端会返回一个对象，包含 url 
	const onUploadChange = ({result}) => {
		//上传成功后，回调返回 url
		const formatList = result.map(file => {
			// 上传完毕 做数据处理
			if (file.response) {
			  return {
				url: file.response.data.url
			  }
			}
			// 否则在上传中时，不做处理
			return file
		  })
		console.log(formatList);
		setFileList(formatList)
		cacheImgList.current = formatList //🌟22.存多一份数据
	}






	//切换图片：下面两个函数都是控制视图显示的
	const [imgCount,setImageCount] = useState(1)//切换图片的 hook 
	const radioChange = (radioData) => {//⚡️切换图片的方法

		const rawValue = radioData.target.value // 当前选中的 radio 值
		setImageCount(rawValue)


		//33.从 ref 仓库中取出图片并交给 fileList 来重新渲染图片
		if( rawValue === 0 ){
			return false
		}
		if( rawValue === 1 ){//radio 为 1，则取 1 张图片
			const img = cacheImgList.current  ?  cacheImgList.current[0]  :  [] //🌟🌟切换 radio 时，如果有暂存数据，则取暂存的数据，没有则取空数组
			setFileList([img])//以数组的形式存入 fileList
		} else if ( rawValue === 3 ){//radio 为 3，则取 所有 图片
			setFileList(cacheImgList.current)	
		}
	}



	
	//提交表单数据(⚡️⚡️先处理拿到的数据，再调接口发送请求)
	const onFinishForm = async (result) =>{
		//🌟步骤一：先看一下返回了什么数据
		console.log(result) 

		//步骤二：解构出数据, 做数据的二次处理, 处理 cover 图片的上传数据
		const { channel_id, content, title, type  } = result
		
		const params = { //存放数据
			channel_id,
			content,
			title,
			type,
			cover:{
				type: type,
				images: fileList.map( file => file.response.data.url )//提取图片列表
			}
		}
		console.log(params)
		//步骤三：调接口发送请求
		await http.post('/mp/articles?draft=false',params)
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
						
				{/* 总的表单,🔥🔥🔥onFinishForm 是用来搜集表单组件内的所有值(这里包含了搜集富文本编辑器的值)  */}
				<Form 
					labelCol={{span:4 }}  
					wrapperCol={{span:16}} 
					//👇输入框的初始化值 
					initialValues={{type:1, content:'this is content' }}
					onFinish={onFinishForm}//收集表单的所有数据
					>

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
							<Radio.Group onChange={radioChange}>
								<Radio value={1}>单图</Radio>
								<Radio value={3}>三图</Radio>
								<Radio value={0}>无图</Radio>
							</Radio.Group>
						</Form.Item>


						{/* 🔥🔥🔥🔥🔥很关键，用于控制视图的显示🔥🔥🔥🔥🔥 */}
						{imgCount > 0 && (//短路运算符，相当于如果 > 0, 那么就显示上传入口，否则不显示
							<Upload 
								name='image'
								listType='picture-card' 
								className='avatar-uploader' 
								showUploadList
								action="http://geek.itheima.net/v1_0/upload"//调用上传接口
								fileList={fileList}
								onChange={onUploadChange}//上传列表发生变化后会执行这个回调，然后我们要存在 mobx ，把这个状态告诉后端
								multiple={imgCount > 1}//是否支持多传图片, 如果是 3 图 （>1 的情况），那么就是 true
								maxCount={imgCount}//最多上传几张图片
								>
									{/* icon */}
									<div style={{ marginTop: 8 }}><PlusOutlined/></div>
							</Upload>)}
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