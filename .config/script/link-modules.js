/**
 * link-modules.js
 *
 * Description:
 *    Linking node_modules installed for `package.json` and reusing them  for
 *    `release/app/package.json`.
 *
 */

import { existsSync as fsExistsSync, symlinkSync as fsSymlinkSync } from 'fs';

import webpackPath from '../webpack/webpack.paths';

if (!fsExistsSync(webpackPath.srcNodeModulesPath) && fsExistsSync(webpackPath.appNodeModulesPath)) {
  fsSymlinkSync(webpackPath.appNodeModulesPath, webpackPath.srcNodeModulesPath, 'junction');
}
