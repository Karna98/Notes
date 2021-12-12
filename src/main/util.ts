/**
 * util.ts
 *
 * Description:
 *    Utility function for Electron's main process.
 *
 */

import { URL } from 'url';
import path from 'path';

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
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  }
};

export { resolveHtmlPath };
