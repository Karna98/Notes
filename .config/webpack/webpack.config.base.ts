/**
 * webpack.config.base.ts
 *
 * Description:
 *    Base webpack config for other specific configs.
 *
 */

import { EnvironmentPlugin } from 'webpack';
import webpackPaths from './webpack.paths';

export default {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  /**
   * @TODO : As of now, The Notes (Electron) app runs successfully in both
   *        DEV and PROD mode even if following code is commented. It will be
   *        removed if not required in upcoming PRs when we setup DB.
   */
  // output: {
  //   path: webpackPaths.srcPath,
  //   // https://github.com/webpack/webpack/issues/1114
  //   library: {
  //     type: 'commonjs2',
  //   },
  // },

  resolve: {
    // Determine the array of extensions that should be used to resolve modules.
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
  },
};
