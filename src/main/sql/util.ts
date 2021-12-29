/**
 * util.ts
 *
 * Description:
 *    Support Functions for database.
 *
 */

import { Database } from 'better-sqlite3';

// Latest Schema Version.
const SCHEMA_VERSION = 0;

// ================================================================================
// Database Helpers.
// ================================================================================

/**
 * NOTE:
 * If Schema version is set in PRAGMA `schema_version` then any operation done
 * to modify database updates the `schema_version`, making it hard to identify
 * the original schema version.
 *
 * So instead of `schema_version`, we will set the Schema version in
 * PRAGMA `user_version`
 */

/**
 * Return Client's Schema version of Database.
 *
 * @param {Database} db Database Object.
 * @return {object} Client's Schema version.
 */
const getClientSchemaVersion = (db: Database): number => {
  return db.pragma(`user_version`, { simple: true });
};

/**
 * Set user version of Client's Database.
 *
 * @param {Database} db Database Object.
 * @return {object} Client's Schema version.
 */
const setClientSchemaVersion = (db: Database): number => {
  return db.pragma(`user_version = ${SCHEMA_VERSION}`);
};

/**
 * Check if the current schema matches the CLient's Database Schema version.
 *
 * @param {Database} db Database Object.
 * @return {[boolean, number]}  Return's Schema mismatch status and current Schema version of Client's Database.
 */
const schemaVersionMismatch = (db: Database): [boolean, number] => {
  const clientSchemaVersion = getClientSchemaVersion(db);

  return [
    clientSchemaVersion != SCHEMA_VERSION ? true : false,
    clientSchemaVersion,
  ];
};

export {
  SCHEMA_VERSION,
  getClientSchemaVersion,
  setClientSchemaVersion,
  schemaVersionMismatch,
};
