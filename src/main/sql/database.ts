/**
 * database.ts
 *
 * Description:
 *    Function related to database objects.
 *
 */

import Database from 'better-sqlite3';
import { existsSync as fsExistsSync } from 'fs';
import { resolve as pathResolve } from 'path';
import { updateDatabaseSchema } from './migrations';
import {
  createDatabaseStatement,
  createUserStatement,
  getUsersCountStatement,
} from './statements';
import { schemaVersionMismatch, setClientSchemaVersion } from './util';

const isDevelopmentMode = process.env.NODE_ENV === `development`;

// Database Name
const DATABASE_NAME = `${isDevelopmentMode ? `notes_dev` : `notes`}.sqlite`;

// Path to Database
const DATABASE_PATH = pathResolve(__dirname);

/**
 * Check if Database already exists on Client's file system.
 *
 * @returns {boolean} Returns status of database file exists or not.
 */
const checkIfDbExsts = () => {
  return fsExistsSync(pathResolve(DATABASE_PATH, DATABASE_NAME));
};

/**
 * Return Database Object.
 *
 * @returns {Database} db Database Object
 */
const dbInstance = () => {
  const databaseOptions = isDevelopmentMode
    ? {
        verbose: console.log,
      }
    : {};

  const db = new Database(
    pathResolve(DATABASE_PATH, DATABASE_NAME),
    databaseOptions
  );

  return db;
};

/**
 * Initialize the Database by creating new or verifying exisitng database and
 * upgrading to latest schema version if required.
 */
const init = () => {
  // Creates new database
  console.log(`[DATABASE] : No Database Found.`);
  console.log(`[DATABASE] : Creating Notes Database ...`);

  try {
    const db = dbInstance();
    db.prepare(createDatabaseStatement()).run();
    setClientSchemaVersion(db);
    db.close();
  } catch (error) {
    console.log(error);
    throw new Error('Database creation failed.');
  }
};

/**
 * Update Database to latest Schema.
 */
const updateDatabase = () => {
  const db = dbInstance();

  const [mismatchStatus, clientVersion]: [boolean, number] =
    schemaVersionMismatch(db);

  // If Client's database schema version is not latest schema version.
  if (mismatchStatus) {
    console.log(`[DATABASE] : Upgrading Database Schema Version ..`);
    updateDatabaseSchema(db, clientVersion);
  }

  db.close();
};

/**
 * Create new User in Database.
 *
 * @param value Array of data required.
 * @returns {number} Returns status of new user creation.
 */
const createNewUser = (value: Array<string | number | unknown>) => {
  const db = dbInstance();
  const results = db.prepare(createUserStatement()).run(value);
  db.close();

  return results.changes;
};

/**
 * Get total count of users from Database.
 *
 * @returns {number} results
 */
const getUsersCount = () => {
  const db = dbInstance();
  const results = db.prepare(getUsersCountStatement()).pluck(true).get();
  db.close();

  return results;
};

export default {
  getUsersCount,
  createNewUser,
  init,
  checkIfDbExsts,
  updateDatabase,
};
