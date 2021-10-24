/**
 * webpack.config.base.ts
 *
 * Description:
 *    Builds the DLL for Electron's renderer process (DEVELOPMENT MODE).
 *
 */

import { join as pathJoin } from 'path';
import { DllPlugin, EnvironmentPlugin, LoaderOptionsPlugin } from 'webpack';
import { merge as webapckMerge } from 'webpack-merge';
import { dependencies } from '../../package.json';
import checkNodeEnv from '../script/check-node-env';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

checkNodeEnv('development');

export default webapckMerge(baseConfig, {
  context: webpackPaths.rootPath,

  devtool: 'eval',

  mode: 'development',

  target: 'electron-renderer',

  /**
   * Use `module` from `webpack.config.renderer.dev.js`
   */
  module: require('./webpack.config.dev.renderer').default.module,

  entry: {
    renderer: Object.keys(dependencies || {}),
  },

  output: {
    path: webpackPaths.dllPath,
    filename: '[name].dev.dll.js',
    library: {
      name: 'renderer',
      type: 'var',
    },
  },

  plugins: [
    new DllPlugin({
      path: pathJoin(webpackPaths.dllPath, '[name].json'),
      name: '[name]',
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks.
     */
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new LoaderOptionsPlugin({
      debug: true,
      options: {
        context: webpackPaths.srcPath,
        output: {
          path: webpackPaths.dllPath,
        },
      },
    }),
  ],
});
