/**
 * util.ts
 *
 * Description:
 *    Utility function for Electron's main process.
 *
 */

import { resolve as pathResolve } from 'path';
import { URL } from 'url';

/**
 * Returns URL to be displayed in Electron's Window.
 *
 * @param htmlFileName
 * @returns {string} URL to be loaded.
 */
const resolveHtmlPath = (htmlFileName: string): string => {
  if (process.env.NODE_ENV === 'development') {
    // In DEVELOPMENT MODE
    const port = process.env.PORT || 1234;

    const url = new URL(`http://localhost:${port}`);

    url.pathname = htmlFileName;

    return url.href;
  } else {
    // In PRODUCTION MODE
    return `file://${pathResolve(__dirname, '../renderer/', htmlFileName)}`;
  }
};

/**
 * Splits URI Route on '-'.
 *
 * @param route Simple Route
 * @returns {[]} Array of splitted URI string.
 */
const resolveURI = (route: string): string[] => route.toUpperCase().split(`-`);

export { resolveHtmlPath, resolveURI };
