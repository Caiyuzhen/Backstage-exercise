//⚡️统一管理所有的工具函数，把所有的工具函数导出的模块在这里导入然后再去统一导出
//这样在别处进行 import 时就不用一个个 import 了

import  {http}  from './http'
import { 
	setToken,
	getToken,
	removeToken } from './token'


export { 
		http,
		setToken,
		getToken,
		removeToken }

//🌟🌟其他地方需要用到的话，直接👇这样导入就行了
//import { http } from '@/utils'