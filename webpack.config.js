/*-----     -----     -----     -----     -----     -----     -----     ----- 
webpack.config.js

Description: Webpack configuration based on ENV passed as arguments and return two seperate webpack config targeting Elctron's Main and Renderer process.

Version  : 0.0.1
Date     : 10-10-2021
Author   : Vedant Wakalkar
Email    : developer.karna98@gmail.com
-----     -----     -----     -----     -----     -----     -----     -----*/

const getConfig = (env) => {
  const { resolve } = require('path');
  const { merge } = require('webpack-merge');
  const { DefinePlugin } = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  const APP_DIRECTORY = resolve(__dirname);
  const isDevelopmentMode = env === `development` ? true : false;
  console.log(isDevelopmentMode);
  let plugins = [
    new DefinePlugin({
      'process.env': {
        // Set NODE_ENV
        NODE_ENV: JSON.stringify(
          isDevelopmentMode ? `development` : `production`
        ),
        // Set CUSTOM_ENV
        CUSTOM_ENV: JSON.stringify(
          isDevelopmentMode ? `CUSTOM_ENV_VAR_DEV` : `CUSTOM_ENV_VAR_PROD`
        ),
      },
    }),
  ];

  let commonConfig = {
    mode: isDevelopmentMode ? `development` : `production`,
    devtool: isDevelopmentMode ? `cheap-module-source-map` : `source-map`,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: 'babel-loader',
          exclude: [
            resolve(APP_DIRECTORY, `node_modules`),
            resolve(APP_DIRECTORY, `build`),
          ],
        },
        {
          test: /\.(s*)css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?:|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins,
  };

  // Configuration targeting Electron's Main process.
  const mainConfig = merge(commonConfig, {
    target: 'electron-main',
    entry: {
      main: resolve(APP_DIRECTORY, `src`, `main`, `index.ts`),
    },
    output: {
      filename: `[name].bundle.js`,
      path: resolve(APP_DIRECTORY, `build`, `main`),
      clean: true,
    },
  });

  // Configuration targeting Electron's Renderer process.
  const rendererConfig = merge(commonConfig, {
    target: 'electron-renderer',
    entry: {
      renderer: resolve(APP_DIRECTORY, `src`, `renderer`, `index.tsx`),
    },
    output: {
      filename: `[name].${isDevelopmentMode ? 'bundle' : '[contenthash]'}.js`,
      path: resolve(APP_DIRECTORY, `build`, `renderer`),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(APP_DIRECTORY, `src`, `renderer`, `index.html`),
      }),
    ],
    // TODO: On adding following optimization, throws 'Reference error: global is not defined'.
    // optimization: {
    //   moduleIds: 'deterministic',
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         chunks: 'all',
    //       },
    //     },
    //   },
    // },
  });

  return [rendererConfig, mainConfig];
};

module.exports = (envArgs) => {
  // Extract environment variable passed as argument.
  const { env } = envArgs;
  console.log(env);
  return getConfig(env);
};
