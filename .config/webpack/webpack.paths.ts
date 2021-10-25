/**
 * webpack.paths.ts
 *
 * Description:
 *    Project structure paths for webpack.config.* files.
 *
 */

import { join as pathJoin } from 'path';

const rootPath = pathJoin(__dirname, `..`, `..`);

const dllPath = pathJoin(__dirname, '../dll');

const srcPath = pathJoin(rootPath, 'src');
const srcMainPath = pathJoin(srcPath, 'main');
const srcRendererPath = pathJoin(srcPath, 'renderer');

const releasePath = pathJoin(rootPath, 'release');
const appPath = pathJoin(releasePath, 'app');
const appPackagePath = pathJoin(appPath, 'package.json');
const appNodeModulesPath = pathJoin(appPath, 'node_modules');
const srcNodeModulesPath = pathJoin(srcPath, 'node_modules');

const distPath = pathJoin(appPath, 'dist');
const distMainPath = pathJoin(distPath, 'main');
const distRendererPath = pathJoin(distPath, 'renderer');

const buildPath = pathJoin(releasePath, 'build');

export default {
  rootPath,
  dllPath,
  srcPath,
  srcMainPath,
  srcRendererPath,
  releasePath,
  appPath,
  appPackagePath,
  appNodeModulesPath,
  srcNodeModulesPath,
  distPath,
  distMainPath,
  distRendererPath,
  buildPath,
};
