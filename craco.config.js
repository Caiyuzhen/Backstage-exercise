//添加对于 webpack 的自定义配置
const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')


module.exports = {
	//用 craco 来进行 webpack 的配置
	webpack: {
	//配置别名
		alias: {
			//约定：使用 @ 表示 src 文件的所在路径
			'@': path.resolve(__dirname, 'src')
		},
		//配置 CDN, 减小包体积
		//定义 webpackConfig 将会自动注入的 webpack 配置对象,可以在这个函数中对它进行详细的自定义配置,只要最后return出去就行
		configure: (webpackConfig) => {
			let cdn = {
			  js: [],
			  css: []
			}

			// 只有生产环境才配置
			whenProd(() => {
			  // key:需要不参与打包的具体的包
			  // value: cdn 文件中 挂载于全局的变量名称 为了替换之前在开发环境下通过 import 导入的 react / react-dom
			  webpackConfig.externals = {
				react: 'React',
				'react-dom': 'ReactDOM'
			  }

			  // 配置现成的cdn 资源数组 现在是公共为了测试, 实际开发的时候 用公司自己花钱买的cdn服务器
			  cdn = {
				js: [
				  'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
				  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
				],
				css: []
			  }
			})
	  
			// 👇都是为了在 public/index.html(🌍小地球那个文件)  入口文件去配置 htmlWebpackPlugin 插件, 在渲染时候会自动注入上边写的 cdn 资源
			const { isFound, match } = getPlugin(
			  webpackConfig,
			  pluginByName('HtmlWebpackPlugin')
			)
	  
			if (isFound) {
			  // 找到了HtmlWebpackPlugin的插件
			  match.userOptions.cdn = cdn
			}
	  
			return webpackConfig
		}
		
	}
}