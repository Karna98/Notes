/**
 * delete-source-maps.js
 *
 * Description:
 *    Delete source-map in production builds.
 *
 */

import path from 'path';
import rimraf from 'rimraf';
import webpackPaths from '../webpack/webpack.paths';

export default function deleteSourceMaps() {
  rimraf.sync(path.join(webpackPaths.distMainPath, '*.ts.map'));
  rimraf.sync(path.join(webpackPaths.distRendererPath, '*.ts.map'));
}
