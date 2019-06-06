const path = require('path'); // old commonJS pattern for importing modules
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // npm install --save-dev mini-css-extract-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); // npm install --save-dev clean-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin'); // npm install --save-dev html-webpack-plugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');  // npm install --save-dev optimize-css-assets-webpack-plugin
const CopyPlugin = require('copy-webpack-plugin'); // npm install --save-dev copy-webpack-plugin
const webpack = require('webpack');


// https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
module.exports = {
  // this will be the entry point for the application
  entry: './src/index.js',
  output: {
    // the file with the path will be created by webpack
    filename: 'bundle.[contenthash].js',
    // this has to be an absolute path './dist' will not work
    path: path.resolve(__dirname, './dist'),
    // dont forget the ending slash!
    // this can be replaced to http://mywebsite.com/... for example
    // when the site goes public
    publicPath: ''
  }, 
  // mode can be dev/prod/none
  mode: 'production', // https://webpack.js.org/concepts/mode/ --> production enables lot of plugins
  // the module property is an object
  module: {
    // the rules property is an array (list of rules)
    rules: [
      // each rule is an object itself
      {
        //the test defines the file type
        test: /\.(png|jpg)$/,
        use: [
          // here we can specify which loader should be used
          // for the given file type
          'file-loader' // npm install --save-dev file-loader
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // css-loader will read the css from the file
          // style-loader will create style tags in our html
          MiniCssExtractPlugin.loader, 'css-loader' // npm install --save-dev css-loader style-loader
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // css-loader will read the css from the file
          // style-loader will create style tags in our html
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' // npm install --save-dev sass-loader node-sass
        ]
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // npm install --save-dev @babel/core babel-loader
          options: {
            // env: es6 to es5
            presets: [ '@babel/env' ], // npm install --save-dev @babel/preset-env babel-plugin-transform-class-properties
            plugins: [ '@babel/plugin-transform-async-to-generator', '@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader' // npm install --save-dev raw-loader
        }
      }
    ]
  },
  // plugin system: we can do more with this than just importing new files
  // minfy, converting, 
  plugins: [
    new OptimizeCSSAssetsPlugin({}),
    // extracts the css into a separate file
    new MiniCssExtractPlugin({
      filename: 'styles[contenthash].css'
    }),
    // cleans the dist folder every time we build
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ // more options> https://github.com/jantimon/html-webpack-plugin
      title: 'Hello World',
      filename: 'index.html',
      template: './src/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      }
    }),
    new CopyPlugin([
      { from: './src/img/icons.svg', to: './img/' }
    ]),
    // more plugins: https://webpack.js.org/plugins/
    // fetch polyfill: https://cdn.polyfill.io/ https://stackoverflow.com/questions/51285711/how-do-i-add-certain-script-tags-inside-head-and-body-tags-when-using-htmlwe 
  ]
};

