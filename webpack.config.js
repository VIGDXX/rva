const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'wind.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory:true,
            presets: ['env','transform-runtime']
          }
        }
      }
    ]
  }
};
