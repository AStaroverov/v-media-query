var webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "v-media-query.js",
    library: ["vMediaQuery"],
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      }
    ]
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = "v-media-query.min.js",
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
  ];
} else {
  module.exports.devtool = '#source-map'
}
