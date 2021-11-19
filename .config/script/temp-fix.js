/**
 * temp-fix.js
 *
 * Description:
 *    Temporary fix.
 *    - Copy 'assets' folder for prdouction mode.
 *
 */

import { join as pathJoin } from 'path';
import { copySync as fsCopySync } from 'fs-extra';
import webpackPaths from '../webpack/webpack.paths';

export const copyAssetsFolder = () => {
  fsCopySync(
    pathJoin(webpackPaths.srcPath, `assets`),
    pathJoin(webpackPaths.distPath, `assets`)
  );
};
