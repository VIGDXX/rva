const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/min.js',
  output: {
    filename: 'rva.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      }
    }]
  }
};