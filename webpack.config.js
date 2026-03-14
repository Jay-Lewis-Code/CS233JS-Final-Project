const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Load the correct .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev';
require('dotenv').config({ path: envFile });

module.exports = (env, argv) =>
{
  // flag Used to check if the environment is production or not
  const isProduction = (process.env.NODE_ENV === 'production');
  // Include hash to filenames for cache busting - only at production
  const fileNamePrefix = isProduction ? '[chunkhash].' : '';
  const config = {
    // stats: 'verbose',
    mode: !isProduction ? 'development' : 'production',
    entry: {
      // my pages here
      home: './src/js/home.js',
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: fileNamePrefix + '[name].js',
      assetModuleFilename: "assets/[name][ext]",
      clean: true,
    },
    target: 'web',
    devServer: {
      static: "./dist"
    },
    /* avoid source maps in production; keep fast source maps for development */
    devtool: isProduction ? false : 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.css$/i,
          /* separate js code and css in production */
          use: isProduction ?
            [MiniCssExtractPlugin.loader, 'css-loader'] :
            ['style-loader', 'css-loader']
        },
        {
          test: /\.(svg|eot|ttf|woff|woff2)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        chunks: ["home"],
        inject: "body",
        filename: "index.html",
      }),
      new copyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets/images"),
            to: path.resolve(__dirname, "dist/assets/images"),
            noErrorOnMissing: true,
          },
        ],
      }),
      /* app uses global SERVER_URL rather than process.env.SERVER_URL */
      new webpack.DefinePlugin({
        SERVER_URL: JSON.stringify(process.env.SERVER_URL),
      }),
    ],
    /* separates js (and css) that is shared between bundles - allows browser to cache */
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    /*
      Use realistic performance budgets:
      - disable noisy hints during development
      - keep production warnings, but with thresholds that fit shared vendor chunks
    */
    performance: isProduction ? {
      hints: 'warning',
      maxAssetSize: 350 * 1024,
      maxEntrypointSize: 600 * 1024,
    } : {
      hints: false,
    },
    watchOptions: {
      ignored: /node_modules|dist|\/System Volume Information/
    }
  }

  /**
   * Production only plugins
   */
  if (isProduction)
  {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: fileNamePrefix + "[name].css",
      })
    );
  }
  return config;
}
