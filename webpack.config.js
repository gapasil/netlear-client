const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: 'inline-source-map',
  target: 'web',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
    new NodePolyfillPlugin()
  ],

  resolve:{
    extensions:['.js','.jsx'],
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs"  : false
    } 
  },

  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/, 
        loader: "babel-loader", 
        options:{
          presets:[ "@babel/preset-react"] 
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|MP4|pdf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[hash]-[name].[ext]',
          },
        }]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader", 
          'css-loader',
        ],
      },

    ]
  },
  devServer: {
    historyApiFallback: true,
  }
}
