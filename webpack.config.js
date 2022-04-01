// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

//自定义Plugin,获取chunkhash
const MyWebpackPlugin = require('./my-plugin/my-webpack-plugin/src/index.js');

const isProduction = process.env.NODE_ENV == 'production';
const config = {
    entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash:10].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new MyWebpackPlugin({
          emit : function(compilation){
            
            //获取编译后的chunkhash
            for (var fileNameWithHash in compilation.assets) {
              let fileParsed = path.parse(fileNameWithHash);
              console.log('===compilation===',fileParsed)
            }
          },
        })
    ],
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
            {
              test: /\.js$/,
              use: [
                {
                  loader: 'example-loader',
                  //loader: path.resolve('my-loader/my-webpack-loader/src/index.js'),
                  options: {},
                },
              ],
            },
        ],
    },
    resolveLoader: {
      alias: {
        'example-loader': require.resolve('./my-loader/my-webpack-loader/src/'),
      },
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        // config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
