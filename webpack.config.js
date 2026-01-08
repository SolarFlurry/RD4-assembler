import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export default {
	mode: 'development',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ts$/i,
				use: ['ts-loader'],
				exclude: /node_modules/
			}
		],
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};