/**
 * webpack.config.base.ts
 *
 * Description:
 *    Base webpack config for other specific configs.
 *
 */

import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

export default {
  externals: [...Object.keys(externals || {})],
  stats: 'errors-only',
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
  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  resolve: {
    // Determine the array of extensions that should be used to resolve modules.
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
  },
};
