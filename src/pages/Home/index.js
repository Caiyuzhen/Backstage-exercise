import './index.scss'
import Bar from '@/components/EchartBar' //记得是用 @ + / 进行导入
import { Card } from 'antd'
//思路：
//1.把 echarts 加入项目(需要在 react 中获取 DOM 元素, 用 useRef 方法获取，在 useEffect 时机去渲染 DOM 节点)
//2.先不抽离定制化的参数，把最小化的 demo 跑起来
//3.按照需求，抽象出自定义的参数进行封装，让用户可以自定义传参来生成图表



const Home = () => {

	return( 
		<Card
			style={{ margin:"0.75rem", marginBottom:"1.5rem", borderRadius:"1rem"}}
			>
			<div>
				{/* 👇渲染图表组件, 因为做了抽象，可以自由的传递参数！ */}
				<Bar 
					title='Product Satisfaction' 
					xData={['功能', '交互', '视觉', '动画', '性能']}
					yData={[5, 20, 36, 10, 10, 20]}
					style={{width:"500px", height:"400px"}}
					/>
				<Bar 
					title='Mainstream frameworks'
					xData={['React', 'Vue', 'Angular']}
					yData={[5, 20, 36, 10]}
					style={{width:"200px", height:"320px"}}
					/>
			</div>
		</Card>
	)
}

export default Home