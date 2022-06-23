//封装存储 token 到 localStorage 的方法

const key = 'pc-key'


//封装函数时，记得 return 写返回值！

//存
const setToken = (token) =>{
	return window.localStorage.setItem(key, token)
}

//取
const getToken = () =>{
	return window.localStorage.getItem(key)
}

//删除
const removeToken = () =>{
	return window.localStorage.removeItem(key)
}

export {
	setToken,
	getToken,
	removeToken
}