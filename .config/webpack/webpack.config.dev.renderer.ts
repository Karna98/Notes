/**
 * webpack.config.dev.renderer.ts
 *
 * Description:
 *    Webpack config for Electron's renderer process (DEVELOPMENT MODE).
 *
 */

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { black as chalkBlack } from 'chalk';
import { execSync, spawn } from 'child_process';
import { existsSync as fsExistsSync } from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { join as pathJoin, resolve as pathResolve } from 'path';
import {
  DllReferencePlugin,
  EnvironmentPlugin,
  LoaderOptionsPlugin,
} from 'webpack';
import { merge as webpackMergeConfig } from 'webpack-merge';
import checkNodeEnv from '../script/check-node-env';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

const isDevelopmentMode = process.env.NODE_ENV === `development`;

// When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// at the dev webpack config is not accidentally run in a production environment
if (!isDevelopmentMode) {
  checkNodeEnv('development');
}

const port = process.env.PORT || 1234;
const manifest = pathResolve(webpackPaths.dllPath, 'renderer.json');
// Note: 'module.parent' is deprecated but when replaced by 'require.main', it breaks the DLL build.
const requiredByDLLConfig = module.parent!.filename.includes(
  'webpack.config.dev.renderer.dll'
);

/**
 * Warn if the DLL is not built
 */
if (
  !requiredByDLLConfig &&
  !(fsExistsSync(webpackPaths.dllPath) && fsExistsSync(manifest))
) {
  console.log(
    chalkBlack.bgYellow.bold(
      'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"'
    )
  );
  execSync('npm run postinstall');
}

export default webpackMergeConfig(baseConfig, {
  devtool: 'inline-source-map',

  mode: `development`,

  target: ['web', 'electron-renderer'],

  entry: {
    renderer: [
      `webpack-dev-server/client?http://localhost:${port}/dist`,
      'webpack/hot/only-dev-server',
      pathJoin(webpackPaths.srcRendererPath, `index.tsx`),
    ],
    launch: pathJoin(webpackPaths.srcRendererPath, `launch`, `index.tsx`),
  },

  output: {
    filename: '[name].dev.js',
    path: webpackPaths.distRendererPath,
    publicPath: '/',
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
    ...(requiredByDLLConfig
      ? []
      : [
          new DllReferencePlugin({
            context: webpackPaths.dllPath,
            manifest: require(manifest),
            sourceType: 'var',
          }),
        ]),

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
      NODE_ENV: 'development',
    }),

    new LoaderOptionsPlugin({
      debug: true,
    }),

    new ReactRefreshWebpackPlugin(),

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
      env: process.env.NODE_ENV,
      isDevelopment: isDevelopmentMode,
      nodeModules: webpackPaths.appNodeModulesPath,
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

  node: {
    __dirname: false,
    __filename: false,
  },

  devServer: {
    port,
    compress: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      publicPath: '/',
    },
    historyApiFallback: {
      verbose: true,
    },
    setupMiddlewares(middlewares) {
      console.log('Starting Main Process...');

      spawn('npm', ['run', 'dev:main'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', (code: number) => process.exit(code!))
        .on('error', (spawnError) => console.error(spawnError));

      return middlewares;
    },
  },
});
