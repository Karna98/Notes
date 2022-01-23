/**
 * webpack.config.prod.renderer.ts
 *
 * Description:
 *    Webpack config for Electron's renderer process (PRODUCTION MODE).
 *
 */

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { join as pathJoin } from 'path';
import { EnvironmentPlugin } from 'webpack';
import { merge as webpackMergeConfig } from 'webpack-merge';
import checkNodeEnv from '../script/check-node-env';
import deleteSourceMaps from '../script/delete-source-maps';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

checkNodeEnv('production');

deleteSourceMaps();

const isDevelopmentMode = process.env.NODE_ENV === `development`;

const devtoolsConfig =
  process.env.DEBUG_PROD === `true`
    ? {
        devtool: `source-map`,
      }
    : {};

export default webpackMergeConfig(baseConfig, {
  ...devtoolsConfig,

  mode: `production`,

  target: `electron-renderer`,

  entry: {
    renderer: pathJoin(webpackPaths.srcRendererPath, `index.tsx`),
    launch: pathJoin(webpackPaths.srcRendererPath, `launch`, `index.tsx`),
  },

  output: {
    filename: `[name].js`,
    path: webpackPaths.distRendererPath,
    publicPath: './',
    library: {
      type: 'umd',
    },
  },

  module: {
    rules: [
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

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: pathJoin(webpackPaths.srcRendererPath, 'index.html'),
      chunks: [`renderer`],
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      isBrowser: false,
      isDevelopment: isDevelopmentMode,
    }),

    new HtmlWebpackPlugin({
      filename: 'launch.html',
      template: pathJoin(webpackPaths.srcRendererPath, `launch`, 'launch.html'),
      chunks: [`launch`],
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
    }),
  ],
});
