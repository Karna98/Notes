/**
 * statements.ts
 *
 * Description:
 *    Query Statements related to all functionalities.
 *
 */

import { Database, Statement } from 'better-sqlite3';
import { SCHEMA_VERSION } from './util';

// Prepare Statement for DB queries.
export const dbPrepare = <T>(db: Database, query: string): Statement<T> => {
  const result = db.prepare<T>(query);
  return result;
};

// Statements for creating Database for first time.
export const createDatabaseStatement = (
  schemaVersion: number = SCHEMA_VERSION
): string => {
  switch (schemaVersion) {
    case 0:
      return `
        CREATE TABLE IF NOT EXISTS sample (
          t1 INTEGER PRIMARY KEY,
          t2 TEXT
        );
      `;
    case 1:
      return `
        CREATE TABLE IF NOT EXISTS logs (
          id INTEGER PRIMARY KEY,
          timestamp datetime DEFAULT CURRENT_TIMESTAMP,
          message TEXT NOT NULL
        );
      `;
    default:
      throw new Error('Invalid Schema Version');
  }
};

// Return all the logs from Database
export const getAllLogsStatement = <T>(db: Database): Statement<T> => {
  if (SCHEMA_VERSION == 0) {
    // For SCHEMA_VERSION = 0
    return dbPrepare(db, `SELECT * FROM sample`);
  } else {
    // For SCHEMA_VERSION = 1
    return db.prepare(`SELECT * FROM logs`);
  }
};

// Insert log into Database
export const insertLogStatement = <T>(db: Database): Statement<T> => {
  if (SCHEMA_VERSION == 0) {
    // For SCHEMA_VERSION = 0
    return dbPrepare(db, `INSERT INTO sample (t2) VALUES (?)`);
  } else {
    // For SCHEMA_VERSION = 1
    return db.prepare('INSERT INTO logs (message) VALUES (?)');
  }
};
