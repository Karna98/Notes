/**
 * webpack.config.prod.main.ts
 *
 * Description:
 *    Webpack config for Electron's main process (PRODUCTION MODE).
 *
 */

import webpackPaths from './webpack.paths';
import baseConfig from './webpack.config.base';
import { merge as webpackMergeConfig } from 'webpack-merge';
import { join as pathJoin } from 'path';
import { EnvironmentPlugin } from 'webpack';
import checkNodeEnv from '../script/check-node-env';

checkNodeEnv('production');

const devtoolsConfig =
  process.env.DEBUG_PROD === `true`
    ? {
        devtool: `source-map`,
      }
    : {};

export default webpackMergeConfig(baseConfig, {
  ...devtoolsConfig,

  mode: `production`,

  target: `electron-main`,

  entry: {
    main: pathJoin(webpackPaths.srcMainPath, `main.ts`),
  },

  output: {
    filename: `[name].js`,
    path: webpackPaths.distMainPath,
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
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
});
