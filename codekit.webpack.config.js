/* jshint ignore:start */

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: './src',
    filename: 'app.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ],
    loaders: [
	    {
	      test: /\.jsx$/,
	      exclude: /node_modules/,
	      loader: 'babel-loader'
	    }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
};

/* jshint ignore:end */