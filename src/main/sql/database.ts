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
  getAllLogsStatement,
  insertLogStatement,
} from './statements';
import {
  schemaVersionMismatch,
  SCHEMA_VERSION,
  setClientSchemaVersion,
} from './util';

const isDevelopmentMode = process.env.NODE_ENV === `development`;

const DATABASE_PATH = pathResolve(__dirname);
const DATABASE_NAME = `notes.sqlite`;

// Check if Database already exists on Client's file system.
const checkIfDbExsts = () => {
  return fsExistsSync(pathResolve(DATABASE_PATH, DATABASE_NAME));
};

// Return Database Object.
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

// Initialize the Database by creating new or verifying exisitng database and upgrading to latest schema version if required.
export const init = () => {
  if (checkIfDbExsts()) {
    // If Database aready exists
    console.log(`Database Found.`);

    const dbObject = dbInstance();

    const [mismatchStatus, clientVersion]: [boolean, number] =
      schemaVersionMismatch(dbObject);

    // If Client's database schema version is not latest schema version.
    if (mismatchStatus) {
      console.log(`Upgrading Database Schema Version ..`);
      updateDatabaseSchema(dbObject, clientVersion);
    }

    dbObject.close();
  } else {
    // Creates new database
    console.log(`No Database Found`);
    console.log(`Creating Notes Database ...`);

    const dbObject = dbInstance();

    dbObject.exec(createDatabaseStatement());

    setClientSchemaVersion(dbObject, SCHEMA_VERSION);

    dbObject.close();
  }
};

// Get all the logs from database.
export const getLogs = () => {
  const db = dbInstance();

  const results = getAllLogsStatement(db).all([]);

  db.close();

  return results;
};

// Insert new log into Database.
export const createLogs = (value: string) => {
  const db = dbInstance();

  insertLogStatement(db).run(value);

  db.close();
};
