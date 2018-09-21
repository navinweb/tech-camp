const wepback = require('webpack'),
  path = require('path'),
  glob = require('glob'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  PurifyCSSPlugin = require('purifycss-webpack'),
  inProduction = (process.env.NODE_ENV === 'production'),
  BuildManifestPlugin = require('./plugins/BuildManifestPlugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin');
const ChunkHashReplacePlugin = require('chunkhash-replace-webpack-plugin');

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
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/i,
        use: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]'
            }
          },
          'img-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
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
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].css"
    }),

    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'index.html')),
      minimize: inProduction
    }),

    new ChunkHashReplacePlugin({
      src: 'index.html',
      dest: 'index.html',
    }),

    new BuildManifestPlugin(),

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
