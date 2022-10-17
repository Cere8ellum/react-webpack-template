const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist'; // в продакшен режиме используем browserslist
}

const devServer = {
  historyApiFallback: true,
  open: true,
  compress: true,
  allowedHosts: "all",
  hot: true, // Включает автоматическую перезагрузку страницы при изменениях
  static: path.resolve(__dirname, './src'),
  port: 3000,
}

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new webpack.HotModuleReplacementPlugin(), // применять изменения только при горячей перезагрузке
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  devServer,
  target,
  plugins,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут складываться в dist/assets
    clean: true,
    
  },
  
  module: {
    rules: [
      // --- Загрузчик для html (html-loader)
      { test: /\.(html)$/, use: ['html-loader'] },
      // --- Загрузчики стилей
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // --- Поддержка изображений
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        // В продакшен режиме
        // изображения размером до 8кб будут инлайнится в код
        // В режиме разработки все изображения будут помещаться в dist/assets
        type: mode === 'production' ? 'asset' : 'asset/resource',
      },
      // --- Поддержка шрифтов
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // --- Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
          },
        },
      },
    ],
  },
};