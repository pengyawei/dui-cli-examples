const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getModuleConfig = require('./module.js')
const { resolve } = require('path')
const { printSuccess } = require('../../utils/message.js')
const { pathf } = require('../../utils/string.js')

function getCompilerConfig(opts, pkg) {
  return {
    mode: 'development',
    module: getModuleConfig(opts),
    entry: {
      app: resolve(opts.workPath, 'src/index.js')
    },
    output: {
      path: resolve(opts.workPath, 'dist'),
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[id].[chunkhash].js'
    },
    resolveLoader: {
      modules: [
        pathf('{{prd}}/node_modules')
      ]
    },
    resolve: {
      modules: [
        pathf('{{prd}}/node_modules'),
        'node_modules'
      ],
      extensions: [
        '.js', '.vue', '.json', '.styl', '.stylus', '.pug'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve(opts.workPath, 'src')
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        favicon: resolve(__dirname, 'favicon.png'),
        template: resolve(__dirname, 'template.js'),
        templateParameters: {
          appName: opts.name,
          appAuthor: pkg.author,
          appDescription: pkg.description,
          appKeywords: pkg.keywords,
          appVersion: pkg.version,
          appTitle: 'dev⚡' + opts.title
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new FriendlyErrorsPlugin()
    ]
  }
}

function getDevServerConfig(opts) {
  const { port, host, ...otherOpts } = opts.devServer
  return {
    open: true,
    quiet: true,
    compress: true,
    historyApiFallback: true,
    contentBase: resolve(opts.workPath, 'dist'),
    index: '/index.html',
    ...otherOpts
  }
}

module.exports = function(opts, pkg) {
  const host = opts.devServer.host
  const port = opts.devServer.port
  const compilerConfig = getCompilerConfig(opts, pkg)
  const compiler = webpack(compilerConfig)
  const devServerConfig = getDevServerConfig(opts)
  const devServer = new WebpackDevServer(compiler, devServerConfig)
  devServer.listen(
    port,
    host,
    () => printSuccess(`Starting server on http://${host}:${port}\n`)
  )
}
