//添加对于 webpack 的自定义配置

const path = require('path')

module.exports = {
	//webpack 配置
	webpack: {
	//配置别名
		alias: {
			//约定：使用 @ 表示 src 文件的所在路径
			'@': path.resolve(__dirname, 'src')
		}
	}
}