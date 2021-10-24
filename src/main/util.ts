/**
 * util.ts
 *
 * Description:
 *    Utility function for Electron's main process.
 *
 */

import { URL } from 'url';
import path from 'path';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1234;

  resolveHtmlPath = (htmlFileName: string) => {
    // In DEVELOPMENT MODE
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  // In PRODUCTION MODE
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };
}
