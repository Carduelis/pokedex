const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
/* eslint-ensable import/no-extraneous-dependencies */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const manifest = require('./config/manifest');

// const packageJSON = require('./package.json');

// const excludeVendorList = ['extract-text-webpack-plugin', 'react-icons'];
// const vendorsList = Object.keys(packageJSON.dependencies);
//
// const usedModulesRegExp = new RegExp(vendorsList.join('|'));
const extractLess = new ExtractTextPlugin({
	filename: '[name].css?[id]_[contenthash]',
	disable: process.env.NODE_ENV === 'development'
});
module.exports = {
	entry: {
		app: ['babel-polyfill', path.join(__dirname, './app/index')]
	},
	output: {
		path: path.join(__dirname, './build/'),
		filename: '[name].js',
		publicPath: './'
	},
	module: {
		rules: [
			// take all less files, compile them, and bundle them in with our js bundle
			{
				test: /\.less$/,
				use: extractLess.extract({
					use: [
						// "style-loader",
						'css-loader?sourceMap',
						'less-loader?sourceMap'
					]
				})
			},
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
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({ resource }) =>
				// console.log(resource);
				/node_modules/.test(resource)

			// minChunks: ({ resource }) => usedModulesRegExp.test(resource)
		}),
		extractLess,
		new HtmlWebpackPlugin({
			title: manifest.name,
			template: path.join(__dirname, './app/index.ejs'),
			filename: 'index.html',
			files: {
				css: ['main.css']
			}
		}),
		new WebpackPwaManifest(manifest),
		new webpack.DefinePlugin({
			'process.env': {
				// Useful to reduce the size of client-side libraries, e.g. react
				NODE_ENV: JSON.stringify('production'),
				PLATFORM_ENV: JSON.stringify('web')
			}
		}),
		// optimizations
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new UglifyJsPlugin({
			parallel: true,
			uglifyOptions: {
				warnings: false
			}
		})
	]
};
