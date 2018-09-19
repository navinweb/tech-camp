const wepback = require('webpack'),
  path = require('path'),
  glob = require('glob'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  PurifyCSSPlugin = require('purifycss-webpack'),
  inProduction = (process.env.NODE_ENV === 'production'),
  CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = [
  'dist'
]

// the clean options to use
let cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false
}

module.exports = {
  entry: {
    main: [
      './src/main.js',
      './src/main.scss',
    ],
    vendor: ['jquery']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'index.html')),
      minimize: inProduction
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: inProduction,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
