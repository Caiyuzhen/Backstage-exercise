import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import 'moment/locale/zh-cn'//配置成中文
import locale from 'antd/es/date-picker/locale/zh_CN'//配置成当地的语言-中文
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/placeholde-error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import Item from 'antd/lib/list/Item'


const { Option } = Select
const { RangePicker } = DatePicker


const Article = () =>{

//👇👇👇渲染下拉菜单的频道列表:——————————————————————————————————————————————————
	//步骤一: 初始化时去实例化列表的临时数据(用 setCahnnelList 把数据放入 useState([]) 这个空数组中，并且解构赋值给 channelList) 
	const [channelList, setChannelList] = useState([])

	//步骤二: 声明一个异步函数调用后端接口（🌟不传参的方式, 没有依赖项, 可以写在外部，一般都是同意放到 useEffect 内的）
	const loadChannelList = async() =>{
		const ref = await http.get('/channels')//定义一个变量来接收后端接口 url 返回的数据！
		setChannelList(ref.data.channels) //⚡️用 hook 来把从 api 中获取的数据放入 channelList 中
	}

	//步骤三: 实例化调用接口的方法，获得数据(注意，useEffect 这里边不能用 async！)
	useEffect(()=>{
		loadChannelList()
	},[])



//👇👇👇渲染 table 内的文章列表:——————————————————————————————————————————————————
	//步骤一(1): 初始化时去实例化 table 列表的临时数据
	const [tableList, setTableList] = useState({//👇同时管理两个数据的方式, 这样就不需要声明两个 useState
		list:[],	//文章列表 
		count:0		//文章总数
	})

	//步骤一(2): 参数：（状态、分页）会影响到 table 列表的数据变化的都需要定义一个变量来管理
	const [params, setParams] = useState({
		page:1,			//当前页
		per_page:10,	//每页显示条数
	})


	useEffect(() => {
		//步骤二: 声明一个异步函数调用后端接口（🌟传参的方式, 有依赖项 params, 需要写在 useEffect 内部[原则: 只要异步函数内涉及到需要依赖一些数据的变化而重新执行的，都要放到 useEffect 内）
		//⚡️⚡️⚡️这种情况如果写到函数外边的话，每次组件更新都会重新进行 useEffect 函数的初始化，这会非常消耗性能！！写到 useEffect 中，只有依赖项变化才会执行函数
		const loadTableList = async() => {
			const ref = await http.get('mp/articles', { params })//params 为当前页数

			//方法一：用了两次 ref, 比较耗费性能
			setTableList({	//⚡️用 hook 来把从 api 中获取的数据放入 params 中, 总共获取两组数据！通过一个对象来承载！
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
	},[params])




	const onFinish = (values) => {
		console.log(values)
	}


	const columnsTitle = [ //很关键，这里数据结构的 key 跟后端返回的 key 是配的
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
			title: '操作',
			render: data => {
			  return (
				<Space size="middle">
					{/* 两个操作按钮 */}
				  <Button type="primary" shape="circle" icon={<EditOutlined />} />
				  <Button
					type="primary"
					danger
					shape="circle"
					icon={<DeleteOutlined />}
				  />
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
					
				{/* 过滤项 */}
				<Form  onFinish={onFinish} initialValues={{status:null}}>
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
							{channelList.map( channel =>
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

					// 👇👇👇渲染 table 内的文章列表:步骤四
					dataSource={tableList.list}
					/>   
      		</Card>
		</div>
	)
}

export default Article








