//⚡️统一管理所有的工具函数，把所有的工具函数导出的模块在这里导入然后再去统一导出

import  {http}  from './http'


export { http }

//🌟🌟其他地方需要用到的话，直接👇这样导入就行了
//import { http } from '@/utils'