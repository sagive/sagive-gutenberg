const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const path = require( 'path' );
const glob = require('glob');

function getEntries() {
	const out = {};
	glob.sync("./includes/blocks/**/index.js").forEach(entry => {
		out[entry.split('/')[3]] = entry;
	});
	return out;
};


module.exports = {
	...defaultConfig,
	entry: getEntries,
	output: {
		filename: '[name]/[name].js',
		path: path.resolve(process.cwd(), 'build')
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
	],
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
};
