/**
 * link-modules.js
 *
 * Description:
 *    Linking node_modules installed for `package.json` and reusing them  for
 *    `release/app/package.json`.
 *
 */

import { existsSync as fsExistsSync, symlinkSync as fsSymlinkSync } from 'fs';

import {
  appNodeModulesPath,
  srcNodeModulesPath,
} from '../webpack/webpack.paths';

if (!fsExistsSync(srcNodeModulesPath) && fsExistsSync(appNodeModulesPath)) {
  fsSymlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}
