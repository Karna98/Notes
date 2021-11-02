/**
 * electron-rebuild.js
 *
 * Description:
 *    Rebuild native modules from sources using electron-rebuild.
 *    https://www.npmjs.com/package/electron-rebuild
 *
 */

import { execSync } from 'child_process';
import { existsSync as fsExistsSync } from 'fs';
import { dependencies } from '../../release/app/package.json';
import webpackPaths from '../webpack/webpack.paths';

if (
  Object.keys(dependencies || {}).length > 0 &&
  fsExistsSync(webpackPaths.appNodeModulesPath)
) {
  const electronRebuildCmd =
    '../../node_modules/.bin/electron-rebuild --parallel --force --types prod,dev,optional --module-dir .';
  const cmd =
    process.platform === 'win32'
      ? electronRebuildCmd.replace(/\//g, '\\')
      : electronRebuildCmd;
  execSync(cmd, {
    cwd: webpackPaths.appPath,
    stdio: 'inherit',
  });
}
