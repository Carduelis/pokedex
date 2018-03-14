const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
/* eslint-enable import/no-extraneous-dependencies */
const manifest = require('./config/manifest');
module.exports = {
	devServer: {
		// this is to forcing reload while index.ejs is changed
		contentBase: [
			path.join(__dirname, './app/index.ejs'),
			path.join(__dirname, './config')
		],
		watchContentBase: true
	},
	devtool: 'cheap-module-eval-source-map',
	entry: [
		// 'webpack-hot-middleware/client',
		'babel-polyfill',
		path.join(__dirname, './app/index')
	],
	output: {
		path: path.join(__dirname, './public'),
		filename: 'bundle.js',
		// web-dev requires simple slash `/` unless web-bundle, it needs dot-slash `./`
		publicPath: '/'
	},
	module: {
		rules: [
			{
				// for the external css files
				test: /\.css$/,
				use: ['style-loader', 'css-loader?sourceMap']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader?sourceMap', 'less-loader?sourceMap']
			},
			// {
			// 	test: /\.ejs$/,
			// 	use: ['ejs-loader']
			// },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: [
								'transform-decorators-legacy'
								/* should always be the first plugin! */
							],
							presets: ['react', 'env', 'stage-1']
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 5000 }
					},
					'image-webpack-loader'
				]
			},
			{
				test: /\.json$/,
				use: ['json-loader']
			}
		]
	},
	plugins: [
		// new DashboardPlugin(),
		new HtmlWebpackPlugin({
			title: manifest.name,
			template: path.join(__dirname, './app/index.ejs'),
			filename: 'index.html'
		}),
		// new webpack.HotModuleReplacementPlugin(),
		new WebpackPwaManifest(manifest),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				PLATFORM_ENV: JSON.stringify('web')
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin()
	]
};
