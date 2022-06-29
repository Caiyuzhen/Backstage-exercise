import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons'
import 'moment/locale/zh-cn'//配置成中文
import locale from 'antd/es/date-picker/locale/zh_CN'//配置成当地的语言-中文
import './index.scss'
import img404 from '@/assets/placeholde-error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import Item from 'antd/lib/list/Item'
import { useNavigation } from 'react-router-dom'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite' //中间件


const { Option } = Select
const { RangePicker } = DatePicker




const Article = () =>{

	const { channelStore } = useStore() //先在 layout 发起请求，再在这里解构出 channelStore 这个方法
	
	//👇👇👇渲染下拉菜单的 channel 列表(数据存储在函数内的方式):——————————————————————————————————————————————————
		// //步骤一: 初始化时去实例化列表的临时数据(用 setChannelList 把数据放入 useState([]) 这个空数组中，并且解构赋值给 channelList) 
	// const [channelList, setChannelList] = useState([])

	  		 	 // //步骤二: 声明一个异步函数调用后端接口（🌟不传参的方式, 没有依赖项, 可以写在外部，一般都是同意放到 useEffect 内的）
	// const loadChannelList = async() =>{
	// 	const ref = await http.get('/channels')//定义一个变量来接收后端接口 url 返回的数据！
	// 	setChannelList(ref.data.channels) //⚡️用 hook 来把从 api 中获取的数据放入 channelList 中
	// }

	    // //步骤三: 实例化调用接口的方法，获得数据(注意，useEffect 这里边不能用 async！)
	// useEffect(()=>{
	// 	loadChannelList()
	// },[])



	//👇👇👇渲染 table 内的文章列表:——————————————————————————————————————————————————
	//步骤一(1): 初始化时去实例化 table 列表的临时数据
	const [tableList, setTableList] = useState({//👇同时管理两个数据的方式, 这样就不需要声明两个 useState
		list:[],	//文章列表 
		count:0		//文章总数，结合下边的 table 分页来配置！（⚡️总数 / 每页显示的数量）
	})

	//步骤一(2): 参数管理：（状态、分页）会影响到 table 列表的数据变化的都需要定义一个变量来管理
	const [params, setParams] = useState({ //params 用作 api 发送请求的携带参数
		page:1,			//当前页
		per_page:5,	//每页显示条数, 结合下边的 table 分页来配置！（⚡️总数 / 每页显示的数量）
	})


	useEffect(() => {
		//步骤二: 声明一个异步函数调用后端接口（🌟传参的方式, 有依赖项 params, 需要写在 useEffect 内部[原则: 只要异步函数内涉及到需要依赖一些数据的变化而重新执行的，都要放到 useEffect 内）
		//⚡️⚡️⚡️这种情况如果写到函数外边的话，每次组件更新都会重新进行 useEffect 函数的初始化，这会非常消耗性能！！写到 useEffect 中，只有依赖项变化才会执行函数
		const loadTableList = async() => {
			const ref = await http.get('/mp/articles', { params })//params 为当前页数, 这种为携带请求参数的写法
			//方法一：用了两次 ref, 比较耗费性能
			setTableList({	//⚡️用 hook 来把从 api 中获取的数据放入 tableList 中, 总共获取两组数据！通过一个对象来承载！
				list:ref.data.results,
				count:ref.data.total_count
			}) 
			//方法二：先解构赋值再调用，节省性能
			// const { result, total_count } = ref.data
			// setTableList({
			// 	list: result,
			// 	count: total_count
			// })
		}
		loadTableList()
	},[params]) //删选、过滤的本质也是修改依赖项，让 useEffect 重新调接口



	//步骤四: 定义点击筛选按钮触发的函数, 点击后修改携带的参数 {params} 来去给后端发送请求
	const onFilter = (values) => {
		console.log(values) //返回的是一个对象，包含了所有筛选信息
		const {channel_id, date, status} = values //解构出【筛选项】的数据
		
		//⚡️⚡️⚡️⚡️用来收集筛选项数据，然后重新传递给后端口 api 来发起请求
		const btn_params = {}   
		
		if(status !== -1){  //如果不是全集(status = -1 的情况)，则表示有筛选项
			btn_params.status = status;
		}
		if(channel_id){   //如果 channel_id 有值
			btn_params.channel_id = channel_id;
		}
		if(date){//如果 date 有值
		//筛选日期 begin_pubdate、end_pubdate 为后端定义的要求，format('YYYY-MM-DD') 为格式化为后端要求的格式
		btn_params.begin_pubdate = date[0].format('YYYY-MM-DD');//开始时间格式化年月日
		btn_params.end_pubdate = date[1].format('YYYY-MM-DD');//开始时间格式化年月日
		}
		
		//⚡️⚡️⚡️⚡️将收集来的筛选项数据用 hook 方法修改给 params
		setParams({
			...params,
			...btn_params
		}) //🍎setState 的方法是整体覆盖, 所以这里需要合并 【page、count 两个参数】 + 【btn_params 过滤按钮增加的参数】
	
	}
	
	
	//🔥🔥🔥点击分页器改变当前页面的事件
	const pageChange = (page) => { //ant 会返回当前 page 的值
	
		setParams({ //一变化就会重新发送请求
			...params,
			page //🔥把新的 page 输入传回给 params，这样重新渲染为当前对应的分页（因为依赖项是 params 的变化！）
		})
	}


	//❌删除 table 内 Article 数据的方法
	const deleteArticle = async(data) => {
		await http.delete(`/mp/articles/${data.id}`)//⚡️⚡️获取当前列的 id , 调用删除接口 并提交给后端！
		console.log(data);
		console.log("成功发送删除接口")

		//删除后更新视图
		setParams({
			...params,
			page:1 //删除后重新获取第一页数据
		})
	}


	//🖌跳转到 article 去编辑
	const navigate = useNavigate()//🔥🔥🔥🔥🔥注意，【hook 函数】只能放在函数外边，不能放里边！

	const goToPublish = (data) => {
		//跳转到编辑页
		navigate(`/publish?id=${data.id}`) //传入当前的列表 id
	}

	
	
	
	//🔥🔥很关键，这里为 table 的数据结构(包含了删除按钮！), 其中的 key 跟后端返回的 key 匹配的
	const columnsTitle = [ 
		{
			title:'封面',
			dataIndex: 'cover',
			width:120,
			render:cover=>{
				return <img src={ cover || img404 } width={148} height={98} alt="" style={{borderRadius:12}}/>
			}
		},
		{
			title: '标题',
			dataIndex: 'title',
			width: 220
		  },
		  {
			title: '状态',
			dataIndex: 'status',
			render: data => <Tag color="green">审核通过</Tag>
		  },
		  {
			title: '发布时间',
			dataIndex: 'pubdate'
		  },
		  {
			title: '阅读数',
			dataIndex: 'read_count'
		  },
		  {
			title: '评论数',
			dataIndex: 'comment_count'
		  },
		  {
			title: '点赞数',
			dataIndex: 'like_count'
		  },
		  {
			title: '操作',//渲染操作按钮！！
			render: data => {
			  return (
				<Space size="middle">
					{/* 点击编辑按钮后，跳转到发布页，需要携带【当前列表的 id 参数】*/}
				    <Button 
						type="primary" 
						shape="circle" 
						icon={<EditOutlined />} 
						onClick={()=>goToPublish(data)}//🍎绑定跳转功能, 需要传入 data, 获取当前列的 id
						/>

				    		{/* 用 pop 组件包裹 button, 点击删除按钮后2会唤起 pop 确认提示 */}
					<Popconfirm 
						title="Confirm to delete article？" 
						placement="topRight"
						onConfirm={()=>deleteArticle(data)} //🍎需要二次确认的写法, 在 pop 上进行确认
						okText="Confirm"
						cancelText="Cancel"
						>
							{/* 点击删除按钮后, 获取当前列的 id, 调用删除 api 接口请求, 更新渲染视图 */}
							<Button
								type="primary"
								danger 
								shape="circle"
								icon={<DeleteOutlined />}
								//🍎不用二次确认的写法: onClick={()=>deleteArticle(data)}//获得当前列的 data, 传入到删除方法当中
							>
							</Button>
					</Popconfirm>
				</Space>
			  )
			}
		  }
	]

	//🔥这里只是静态数据，不会让组件动态的更新 (只是个 mock，用 hook 从后端调用后可以干掉！)
	// const data = [
	// 	{
	// 		id:'8218',
	// 		comment_count: 0,
	// 		cover: {
	// 		  images:['https://images.unsplash.com/photo-1656215662310-26e0ef491d5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'],
	// 		},
	// 		like_count: 0,
	// 		pubdate: '2019-03-11 09:00:00',
	// 		read_count: 2,
	// 		status: 2,
	// 		title: 'wkwebview离线化加载h5资源解决方案' 
	// 	}
	// ]



	return (
		<div>
			{/* 顶部筛选区域 —————————————————————————————————————————————————————————— */}
			<Card 
				// 顶部导航
				title={
					<Breadcrumb separator=">">
						{/* 🍞面包屑导航 */}
						<Breadcrumb.Item>  <Link to="/"> Home </Link>  
						</Breadcrumb.Item>
						<Breadcrumb> Context Management </Breadcrumb>
					</Breadcrumb>
				}
				style={{ margin:"0.75rem", marginBottom:"1.5rem", borderRadius:"1rem"}}
				>
					
				{/* 过滤项, 🔥🔥🔥onFinish 是用来搜集表单组件内的所有值 */}
				<Form  onFinish={onFilter} initialValues={{status:null}}>
					<Form.Item babel="状态" name="status" style={{marginLeft:"0.75rem"}}>
						<Radio.Group>
							<Radio value={null}>All</Radio>
							<Radio value={0}>Draft</Radio>
							<Radio value={1}>Pending</Radio>
							<Radio value={2}>Approved</Radio>
							<Radio value={3}>Rejection</Radio>
						</Radio.Group>
					</Form.Item>

					{/* 下拉选择器 */}
					<Form.Item label="Channel" name="channel_id" style={{marginLeft:"0.75rem"}} >
						<Select placeholder="Select article channel" style={{width:'18rem'}}>

							{/* //👇👇👇渲染下拉菜单的频道列表 -- 步骤四：渲染筛选下拉菜单的数据 */}
							{/* 数据存在函数的写法 */}
							{/* {channelList.map( channel =>
								<Option value={channel.id} key={channel.id}> {channel.name} </Option>
							)} */}
							{/* 数据存在 mobx Store 的写法 */}
							{channelStore.channelList.map( channel => 
								<Option value={channel.id} key={channel.id}> {channel.name} </Option>
							)}
						</Select>
					</Form.Item>

					{/*  */}
					<Form.Item label="Date" name="date" style={{marginLeft:"0.75rem"}}>
						{/* 传入 locale 语言属性 */}
						<RangePicker locale={locale}></RangePicker>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" style={{marginLeft:"0.75rem"}}>筛选</Button>
					</Form.Item>
				{/* 注意，要用个总的 Form 来包裹子集！ */}
				</Form>
			</Card>


			{/* table 内的文章列表区域 ——————————————————————————————————————————————————————————*/}
			<Card title={`根据筛选条件共查询到 ${tableList.count} 条结果：`} style={{borderRadius:"1rem"}}>
        		<Table 
					rowKey="id" 
					columns={columnsTitle}  //表格的整体解构数据
					// dataSource={data} 	//文章的信息数据 (Mock 的数据)

					// 👇👇👇步骤四: 渲染 table 内的文章列表
					dataSource={tableList.list}
					
					//🌟🌟配置分页
					pagination={{
							pageSize: params.per_page, 
							total:    tableList.count,
							onChange: pageChange
						}
					}
					/>   
      		</Card>
		</div>
	)
}

// export default Article
export default observer(Article)//注意，实时同步 mobx 的数据要加 observe







