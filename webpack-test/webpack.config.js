module.exports = {
	entry: {
		main: './src/script/main.js',
		a: './src/script/a.js'
	},
	output: {
		path: './dist/js',
		filename: '[name]-[hash].js'
	}
}