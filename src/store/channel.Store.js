import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'



//管理下拉菜单的 channel 数据
class ChannelStore {

	channelList = [] //存放 Channel 数据
	
	constructor(){
		makeAutoObservable(this)
	}
	
	//在 layout 这个公共模块去发起请求, 因为有两个地方都需要用到(article 和 publish 都用到)
	loadChannelList = async () => {
		const ref = await http.get('/channels')
		this.channelList = ref.data.channels()
	}
}

export default ChannelStore