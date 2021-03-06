import './index.scss'
import 'react-quill/dist/quill.snow.css';
import {Card,Breadcrumb,Form,Button,Radio,Input,Upload,Space,Select, message} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { http } from '@/utils'


// function Publish(){}


//ð¥ð¥è®°å¾è§£æåºä¸æèåçéé¡¹ï¼
const { Option } = Select


const Publish = () =>{

	const { channelStore } = useStore()

	//æ§å¶ä¸ä¼ å¾ççåè¡¨ï¼ä¸´æ¶å­å¨å¾ç(å¾çæ¯ä¸ä¸ªæ°ç»),ðfileList æ§å¶å¾çå­ 1 å¼  3 å¼ è¿æ¯ä¸å­
	const[fileList, setFileList] = useState([])

	//ðð11.ç¨ ref å½å¾ççæå­ä»åºï¼å­å°åå­ï¼å­æ¾å·²ç»ä¸ä¼ çå¾çï¼ä¼ä¸ç´å­å¨åå­ä¸­ï¼ä¸ååæ¢è§å¾çå½±å
	const cacheImgList = useRef([])



	//ä¸ä¼ å¾ççæ¹æ³ï¼ä» fileList ä¸­æåè¿åå¼,ä¼è¿åä¸ä¸ªå¯¹è±¡ï¼æåä¸ä¸ªæåçå¯¹è±¡åå« url 
	const onUploadChange = ({ fileList }) => {
		//éæ°æ®æ ¼å¼å, ä¸ä¼ æåå, åè°è¿å url
		const formatList = fileList.map(file => {
			// ä¸ä¼ å®æ¯å, åæ°æ®æ ¼å¼çå¤ç, æ response å¤çæ url
			if (file.response) { //å ä¸ºä¸ä¼ å®æ¯åï¼response æå­å¨, æä»¥å¤æ­ response æ¯å¦å­å¨
			  return {
				url: file.response.data.url
			  }
			}
			// å¦åå°±æ¯å¨ä¸ä¼ ä¸­çç¶æ,åä¸åå¤ç
			return file
		  })
		// console.log(formatList);
		setFileList(formatList)
		cacheImgList.current = formatList //ð22.å­å¤ä¸ä»½æ°æ®
	}






	//åæ¢å¾çï¼ä¸é¢ä¸¤ä¸ªå½æ°é½æ¯æ§å¶è§å¾æ¾ç¤ºç
	const [imgCount, setImageCount] = useState(1)//åæ¢å¾çç hook 
	const radioChange = (radioData) => {//â¡ï¸åæ¢å¾ççæ¹æ³
		//åæ¢ãæ°éç radio è§å¾ã
		const rawValue = radioData.target.value // å½åéä¸­ç radio å¼
		setImageCount(rawValue)


		//33.ä» ref ä»åºä¸­ååºå¾çå¹¶äº¤ç» fileList æ¥éæ°ãæ¸²æå¾çã
		
		// æ å¾æ¨¡å¼
		if( cacheImgList.current.length === 0 ){ 
			return false
		}
		// 1 å¾æ¨¡å¼
		if( rawValue === 1 ){//radio ä¸º 1ï¼åå 1 å¼ å¾ç
			// åæ³äºï¼const img = cacheImgList.current  ?  cacheImgList.current[0]  :  [] //ððåæ¢ radio æ¶ï¼å¦æææå­æ°æ®ï¼ååæå­çæ°æ®ï¼æ²¡æååç©ºæ°ç»
			const img = cacheImgList.current[0]
			setFileList([img])//ä»¥æ°ç»çå½¢å¼å­å¥ fileList
		// 3 å¾æ¨¡å¼
		} else if ( rawValue === 3 ){//radio ä¸º 3ï¼åå ææ å¾ç
			setFileList(cacheImgList.current)	
		}
	}



	
	//æäº¤è¡¨åæ°æ®(â¡ï¸â¡ï¸åå¤çæ¿å°çæ°æ®ï¼åè°æ¥å£åéæ¥å£è¯·æ±ãæ°å¢æ¥å£ãããæ´æ°æ¥å£ã)
	const navigate = useNavigate()
	const onFinishForm = async (result) =>{
		//ðæ­¥éª¤ä¸ï¼åçä¸ä¸è¿åäºä»ä¹æ°æ®
		console.log(result) 

		//æ­¥éª¤äºï¼è§£æåºæ°æ®, åæ°æ®çäºæ¬¡å¤ç, å¤ç cover å¾ççä¸ä¼ æ°æ®
		const { channel_id, content, title, type  } = result
		
		const params = { //å­æ¾æ°æ®
			channel_id,
			content,
			title,
			type,
			cover:{
				type: type,
				images: fileList.map( file => file.url )//æåå¾çåè¡¨
			}
		}
		// console.log(params)

		if(id){
			//æ id åæ¯ç¼è¾æï¼æ´æ°åå®¹
			await http.put(`/mp/articles/${id}?draft=false`,params)
			// navigate('/article')
			// message.success('æ´æ°æå')

		}else{
			//æ²¡æ id åæ¯æ°å¢
			//æ­¥éª¤ä¸ï¼è°æ¥å£åéè¯·æ±
			await http.post('/mp/articles?draft=false',params)//ãæ°å¢æ¥å£ã
			// navigate('/article')
			// message.success('åå¸æå')
		}
		navigate('/article')
		message.success(`${id ? 'æ´æ°æå' : 'åå¸æå'}`) //å¤æ­ææ²¡æ id ï¼ æ¯ç¼è¾æè¿æ¯æ°å¢æ ï¼
	}



	//âï¸âï¸ä»æç« åè¡¨è¿å¥è¯¦æé¡µçãç¼è¾æã
	//111.è·¯ç±åæ° id æ¥å¤æ­æ¯åªä¸é¡µ, ç¨ useSearchParams() æ¹æ³ï¼ æ­¤å¤è¿ä¸ª id ä¹å¯ä»¥å¤æ­æ¯ãæ°å¢ããè¿æ¯ãç¼è¾ã
	const [params] = useSearchParams()
	const id = params.get('id')//åå id
	console.log(id)





	//ððæ°æ®åå¡«(ðæååçæ°æ®æ·è´åç¼è¾é¡µä¸­ï¼ï¼ç¨ id è°ç¨æ¥å£  => 1.åå¡«è¡¨å  2.åå¡«æå­åè¡¨  3.åå¡«Upload ç»ä»¶ç fileList
	//ð1-1.è·å form çå®ä¾å¯¹è±¡
	const form = useRef(null)

	useEffect(() => {
		const loadDetail = async () => {
			const res = await http.get(`/mp/articles/${id}`) //æºå¸¦ id åæ°åéè¯·æ±ï¼æ¿å°è¯¦æé¡µçæ°æ®æ¥åå¡«

			//ð1-3.åå¡«ãåè¡¨ã+ãå¾çãæ°æ®å° form å®ä¾å¯¹è±¡å, éè¾¹ä¹å­æ¾äº cover ç URL æ°æ®, è¦å¤çä¸ä¸
			// console.log("åè¡¨æ°æ®",res)
			const resData = res.data  //ååºåè¡¨ç data æ°æ®
			//setFieldsValue åå¡«åè¡¨
			form.current.setFieldsValue({...resData, type: resData.cover.type})  //ð¥ð¥ç¨ä¸ä¸ªå¯¹è±¡åæ¬æ¥{ç´æ¥ä¼ å + è§£æä¼ å}çåæ³ï¼
			//setFileList åå¡«ãå¾çã
			setFileList(resData.cover.images.map(url => {
				return{
					url
				}
			})) //åå¡«å¾çåè¡¨(éè¿ä¸ä¸ªæ°ç»çææ°æ°ç»ï¼å°±ç¨ map æ¹æ³)

			//åå¡«æå­å¾ç radio åè¡¨çæ°æ®, éè¦éæ°å¤çæ°æ®æ ¼å¼,åæå­åè¡¨çæ°æ®æ ¼å¼ä¿æä¸è´
			cacheImgList.current = resData.cover.images.map(url => {
				return{
					url
				}
			})
		}


		//å¿é¡»æ article id æä¼åéè¯·æ±(ç¼è¾æ)
		if (id) {
			loadDetail()
			// console.log(form.current)   //çä¸ä¸ form å®ä¾å¯¹è±¡ç current å±æ§æä»ä¹æ¹æ³
		}
	},[id])//å¨ id ååä¹åéæ°è¯·æ±æ°æ®ï¼ä¸è¿è¿éåªè¯·æ±ä¸æ¬¡å°±è¡äºï¼åäº id ä¹æ²¡å³ç³»




	return(
		<div className='publish'>
			<Card
				title={
					//ð¥ð¥ä¸¤ä¸ªå¹¶åçé¢åå±å¤éè¦å å¤ä¸å±ï¼è· form ä¸æ ·çé»è¾
					<Breadcrumb separator=">">
						<Breadcrumb.Item>
							<Link to="/home">Home</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>	
							{/* 222.å¤æ­ header æ é¢æ¯ãåå¸ãè¿æ¯ãç¼è¾ãçææ¡ */}
							{ id ? 'ç¼è¾æç« ' : 'åå¸æç« ' }
						</Breadcrumb.Item>
					</Breadcrumb>}>
						
				{/* æ»çè¡¨å,ð¥ð¥ð¥onFinishForm æ¯ç¨æ¥æéè¡¨åç»ä»¶åçææå¼(è¿éåå«äºæéå¯ææ¬ç¼è¾å¨çå¼)  */}
				<Form 
					labelCol={{span:4 }}  
					wrapperCol={{span:16}} 
					//ðè¾å¥æ¡çåå§åå¼ 
					initialValues={{type:1, content:'this is content' }}
					onFinish={onFinishForm}//æ¶éè¡¨åçæææ°æ®
					//ð1-2.ç»å® form çå®ä¾å¯¹è±¡
					ref={form}
					>

					{/* è¾å¥æ¡ 1 */}
					<Form.Item 
						label="Title"  
						name="title"  
						rules={[{required:true , message:'è¯·è¾å¥æç« '}]}>
							<Input placeholder='è¯·è¾å¥æç« æ é¢' style={{witch:400}}/>
					</Form.Item>

					{/* è¾å¥æ¡ 2 */}
					<Form.Item 
						label="Channel"  
						name="channel_id"  
						rules={[{required:true , message:'è¯·éæ©æç« é¢é'}]}>
							<Select placeholder='è¯·è¾å¥æç« æ é¢' style={{witch:400}}>

								{/* æ¸²æ api è¿åç channel æ°æ® */}
								{channelStore.channelList.map( channel => 
									(<Option value={channel.id} key={channel.id}> {channel.name} </Option>)
								)}
							</Select>
					</Form.Item>

					{/* â¡ï¸åéé¡¹ä¸ç» */}
					<Form.Item label="å°é¢">
						<Form.Item name="type">
							<Radio.Group onChange={radioChange}>
								<Radio value={1}>åå¾</Radio>
								<Radio value={3}>ä¸å¾</Radio>
								<Radio value={0}>æ å¾</Radio>
							</Radio.Group>
						</Form.Item>


						{/* ð¥ð¥ð¥ð¥ð¥å¾å³é®ï¼ç¨äºæ§å¶è§å¾çæ¾ç¤ºð¥ð¥ð¥ð¥ð¥ */}
						{imgCount > 0 && (//ç­è·¯è¿ç®ç¬¦ï¼ç¸å½äºå¦æ > 0, é£ä¹å°±æ¾ç¤ºä¸ä¼ å¥å£ï¼å¦åä¸æ¾ç¤º
							<Upload 
								name='image'
								listType='picture-card' 
								className='avatar-uploader' 
								showUploadList
								action="http://geek.itheima.net/v1_0/upload"//è°ç¨ä¸ä¼ æ¥å£
								fileList={fileList}
								onChange={onUploadChange}//ä¸ä¼ åè¡¨åçåååä¼æ§è¡è¿ä¸ªåè°ï¼ç¶åæä»¬è¦å­å¨ mobx ï¼æè¿ä¸ªç¶æåè¯åç«¯
								multiple={imgCount > 1}//æ¯å¦æ¯æå¤ä¼ å¾ç, å¦ææ¯ 3 å¾ ï¼>1 çæåµï¼ï¼é£ä¹å°±æ¯ true
								maxCount={imgCount}//æå¤ä¸ä¼ å å¼ å¾ç
								>
									{/* icon */}
									<div style={{ marginTop: 8 }}><PlusOutlined/></div>
							</Upload>
							)}
					</Form.Item>
					
					<Form.Item
						label="å¯ææ¬ç¼è¾å¨"
						name="content" //å¯ææ¬ç¼è¾å¨çåå®¹
						rules={[{ required: true, message: 'è¯·è¾å¥æç« åå®¹' }]}>
						
						{/* æ¸²æä¸ä¸å¯ææ¬ç¼è¾å¨ https://github.com/zenoamaro/react-quill */}
						<ReactQuill theme="snow"/>
					</Form.Item>
					
					<Form.Item wrapperCol={{ offset: 4 }}>
						<Space>
							<Button size="large" type="primary" htmlType="submit">
								{/* 3.å¤æ­ Button æ é¢æ¯ãåå¸ãè¿æ¯ãç¼è¾ãçææ¡ */}
								{ id ? 'ç¼è¾æç« ' : 'åå¸æç« ' }
							</Button>
						</Space>
					</Form.Item>

				</Form>
			
			</Card>
		</div>
	)
}

export default observer(Publish)