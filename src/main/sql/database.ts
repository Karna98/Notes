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
  createSpaceStatement,
  createUserStatement,
  getSpacesStatement,
  getUsersCountStatement,
  getUsersStatement,
  insertDefaultValueStatement,
  updateUserStatement,
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
 * DB transactions functions
 *
 * @param db Database Object.
 * @param statements Array of Statements to be executed in transactions.
 * @param data Data to be passed for required statements during transaction
 * @returns {Array} Results Array for statements which returns data.
 */
const dbTransaction = (
  db: Database.Database,
  statements: string[],
  data?: object
): unknown[] => {
  // Create Prepared Statements
  const preparedStatements = statements.map((statement) =>
    db.prepare(statement)
  );

  const result: unknown[] = [];

  try {
    return db.transaction((data = {}) => {
      for (const statement of preparedStatements) {
        if (statement.reader) {
          // Whether the prepared statement returns data.
          result.push(statement.get(data));
        } else {
          statement.run(data);
        }
      }
      return result;
    })(data);
  } catch (err) {
    console.log(err);
    if (!db.inTransaction)
      // (transaction was forcefully rolled back)
      throw err;
    return result;
  }
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

    // Create Tables
    dbTransaction(db, createDatabaseStatement());

    // Insert Default Values
    dbTransaction(db, insertDefaultValueStatement());

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

/**
 * Get all users from Database.
 *
 * @returns {object} Returns all users details.
 */
const getUsers = () => {
  const db = dbInstance();
  const results = db.prepare(getUsersStatement()).get();
  db.close();

  return results;
};

/**
 * Update user details in Database.
 */
const updateUser = (value: Record<string, unknown>, _id: number) => {
  const db = dbInstance();
  db.prepare(updateUserStatement(value)).run(_id);
  db.close();
};

/**
 * Create new Space in Database.
 *
 * @param value Array of data required.
 * @returns {number} Returns status of new user creation.
 */
const createNewSpace = (value: Array<string | number | unknown>) => {
  const db = dbInstance();
  const results = db.prepare(createSpaceStatement()).run(value);
  db.close();

  return results.changes;
};

/**
 * Get all spaces from Database.
 *
 * @returns {object} Returns all users details.
 */
const getSpaces = (): SpaceInterface[] => {
  const db = dbInstance();
  const results = db.prepare(getSpacesStatement()).all();
  db.close();

  return results;
};

export default {
  // Database
  checkIfDbExsts,
  init,
  updateDatabase,
  // Users
  createNewUser,
  getUsers,
  getUsersCount,
  updateUser,
  // Spaces
  createNewSpace,
  getSpaces,
};
