MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { pathf } = require('../../utils/string.js')

// *******************************
// 资源解析
// *******************************

const imgRule = {
  test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'imgs/[name].[hash:7].[ext]'
      }
    }
  ]
}

const fontRule = {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
  ]
}

// *******************************
// html模版解析
// *******************************

const htmlRule = {
  test: /\.html$/,
  use: [
    'html-loader'
  ]
}

const pugRule = {
  test: /\.pug$/,
  oneOf: [
    {
      resourceQuery: /^\?vue/,
      use: [
        'pug-plain-loader'
      ]
    },
    {
      use: [
        'raw-loader',
        'pug-plain-loader'
      ]
    }
  ]
}

// *******************************
// css样式解析
// *******************************

const cssRule = {
  test: /\.css$/,
  use: [
    'vue-style-loader',
    MiniCssExtractPlugin.loader,
    'css-loader'
  ]
}

const stylusRule = {
  test: /\.styl(us)?$/,
  use: [
    ...cssRule.use,
    'stylus-loader'
  ]
}

// *******************************
// js脚本解析
// *******************************

const babelRule = {
  test: /\.js?$/,
  exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          pathf('{{prd}}/node_modules/@babel/preset-env')
        ],
        plugins: [
          pathf('{{prd}}/node_modules/@babel/plugin-transform-runtime')
        ]
      }
    }
  ]
}

// *******************************
// 框架解析
// *******************************

const vueRule = {
  test: /\.vue$/,
  use: [
    {
      loader: 'vue-loader'
    }
  ]
}

const vueDocRule = {
  resourceQuery: /blockType=docs/,
  loader: function (source, map) {
    this.callback(
      null,
      `export default function (Component) {
        Component.options.__docs = ${JSON.stringify(source)}
      }`,
      map
    )
  }
}

// *******************************
// 导出
// *******************************

module.exports = function () {
  return {
    rules: [
      imgRule, fontRule, // 资源
      htmlRule, pugRule, // 模版
      cssRule, stylusRule, // 样式
      babelRule, // 脚本
      vueRule // 框架
    ]
  }
}
