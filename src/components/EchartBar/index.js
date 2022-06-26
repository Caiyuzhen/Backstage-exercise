//封装图表组件

//⚡️需要 【标题 title】，横向数据 【xData】，纵向数据 【yData】， 样式 【style】 可以定制

import * as echarts from 'echarts' //表示所有的导出都会放在 echarts 这个对象上
import { useEffect, useRef } from 'react'



function Bar({title, xData, yData, style}){
	const domRef = useRef()

	const chartInit = () => {
		// 基于准备好的dom，初始化echarts实例
		const myChart = echarts.init(domRef.current); //⚡️用 domRef 这个阶段来渲染图表！
		// 绘制图表
		myChart.setOption({
			title: {
				// text:满意度
				text: title
			},
			tooltip: {},
			xAxis: {
				// data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
				data:xData
			},
			yAxis: {},
			series: [
				{
				name: '销量',
				type: 'bar',
				// data: [5, 20, 36, 10, 10, 20]
				data:yData
				}
			]
		})
	}


	//选择一个时机执行初始化的图标
	useEffect(()=>{
		chartInit();
	},[])//[]空依赖，只执行一次

	return( 
		<div>
			{/* 👇准备一个用来挂载 DOM 节点的 ref 元素 */}
			<div 
				ref={domRef} 
				// style={{width:"500px", height:"400px"}}
				style={style}
				>
			</div> 
		</div>
	)
}


export default Bar 