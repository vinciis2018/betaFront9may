import path from 'path';

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: 'source-map',
  module: {
    noParse: /(mapbox-gl)\.js$/,
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: 'babel-loader'
    }]
  }
};

export default config;