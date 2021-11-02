/**
 * util.ts
 *
 * Description:
 *    Support Functions for database.
 *
 */

import { Database } from 'better-sqlite3';

// Latest Schema Version.
export const SCHEMA_VERSION = 0;

// Return schema version of Client's Database.
export const getClientSchemaVersion = (db: Database): number => {
  return db.pragma(`schema_version`, { simple: true });
};

// Sets schema version of Client's Database.
export const setClientSchemaVersion = (
  db: Database,
  version: number
): number => {
  return db.pragma(`schema_version = ${version}`);
};

// Return user version of Client's Database.
export const getUserVersion = (db: Database): number => {
  return db.pragma(`user_version`, { simple: true });
};

// Set user version of Client's Database.
export const setUserVersion = (db: Database, version: number): number => {
  return db.pragma(`user_version = ${version}`);
};

// Check if the current schema matches the CLient's Database schema version.
export const schemaVersionMismatch = (db: Database): [boolean, number] => {
  const clientSchemaVersion = getClientSchemaVersion(db);

  return [
    clientSchemaVersion != SCHEMA_VERSION ? true : false,
    clientSchemaVersion,
  ];
};
