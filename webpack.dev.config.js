const path = require('path'); // old commonJS pattern for importing modules
const CleanWebpackPlugin = require('clean-webpack-plugin'); // npm install --save-dev clean-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin'); // npm install --save-dev html-webpack-plugin
const CopyPlugin = require('copy-webpack-plugin'); // npm install --save-dev copy-webpack-plugin


// https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
module.exports = {
  // this will be the entry point for the application
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    // the file with the path will be created by webpack
    filename: 'bundle.js',
    // this has to be an absolute path './dist' will not work
    path: path.resolve(__dirname, './dist'),
    // dont forget the ending slash!
    // this can be replaced to http://mywebsite.com/... for example
    // when the site goes public
    publicPath: ''
  }, 
  // mode can be dev/prod/none
  mode: 'development', // https://webpack.js.org/concepts/mode/ --> production enables lot of plugins
  devServer: { //  npm install --save-dev webpack-dev-server
    contentBase: path.resolve(__dirname, './dist'),
    index: 'index.html',
    port: 9000
  },
  // the module property is an object
  module: {
    // the rules property is an array (list of rules)
    rules: [
      // each rule is an object itself
      {
        //the test defines the file type in regex format
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
          // to handle font files (ex.: fontAwesome)
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
          'style-loader', 'css-loader' // npm install --save-dev css-loader style-loader
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // to use sass, we need one more loader . Sass: https://sass-lang.com
          'style-loader', 'css-loader', 'sass-loader' // npm install --save-dev sass-loader node-sass
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // js itself is handled by webpack, but to use babel, we need a loader
          loader: 'babel-loader', // npm install --save-dev @babel/core babel-loader
          options: {
            // env: es6 to es5
            presets: [ '@babel/preset-env' ], // npm install --save-dev @babel/preset-env babel-plugin-transform-class-properties
            // plugins: [ '@babel/plugin-transform-async-to-generator', '@babel/plugin-transform-runtime']
          }
        }
      },
      { 
        test: /\.html$/,
        use: {
          // Exports HTML as string. HTML is minimized when the compiler demands.
          loader: 'html-loader' // npm install --save-dev html-loader
        }
      },

    ]
  },
  // plugin system: we can do more with this than just importing new files
  // minfy, converting, copying, etc...
  plugins: [
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
      { from: './src/img/', to: './img/' }
    ]),
    // more plugins: https://webpack.js.org/plugins/
  ]
};

