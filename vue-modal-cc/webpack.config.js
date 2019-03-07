const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: "production",
	entry: './src/lib/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "index.js",
		libraryTarget: "umd",   // 可以让用户以各种方式使用我们的文件
		library: "vueModalHandler"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	]

}