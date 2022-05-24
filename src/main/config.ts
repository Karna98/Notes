/**
 * config.ts
 *
 * Description:
 *    Declaring all static values for Main Process.
 *
 */

import { join as pathJoin, resolve as pathResolve } from 'path';

// Check Development Mode.
const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === `development`;

// Paths.
const PATH = {
  // Path to Database
  DATABASE: pathResolve(__dirname),
  // Path to Assets Directory.
  ASSETS: pathJoin(__dirname, `..`, `assets`),
};

// Database Name
const DATABASE_NAME = `${IS_DEVELOPMENT_MODE ? `notes_dev` : `notes`}.sqlite`;

// Maximum number of Spaces allowed.
const SPACES_MAX_COUNT_ALLOWED = 4;

// IPC Channel BUS
const ALLOWED_CHANNEL_BUS = {
  TO: [`toMain`],
  FROM: [`fromMain`],
};

export default {
  ALLOWED_CHANNEL_BUS,
  DATABASE_NAME,
  IS_DEVELOPMENT_MODE,
  PATH,
  SPACES_MAX_COUNT_ALLOWED,
};
