/**
 * index.ts
 *
 * Description:
 *    Functions related to Database migrations.
 *
 */

import { Database } from 'better-sqlite3';
import { getClientSchemaVersion, SCHEMA_VERSION } from '../util';
import { updateStatementToSchemaVersion_1 } from './statements';

// If Client's schema version is outdated, then it is updated to latest schema version.
export const updateDatabaseSchema = (
  db: Database,
  clientDbSchemaVersion: number
) => {
  console.log(`Client's DB Schema Version : ${clientDbSchemaVersion}`);

  while (clientDbSchemaVersion < SCHEMA_VERSION) {
    db = performMigrations(db, clientDbSchemaVersion + 1);
    clientDbSchemaVersion = getClientSchemaVersion(db);
  }
};

// Function to perform migration to specific schema version.
const performMigrations = (db: Database, clientDbSchemaVersion: number) => {
  console.log(
    `Performing Migration to Schema Verson : ${clientDbSchemaVersion}`
  );
  switch (clientDbSchemaVersion) {
    case 1:
      console.log(`Migration Started`);

      // Transaction Query to perform all the queries successfully or rollback on failure
      db.transaction(() => {
        // Execute Migration Query Execution
        db.exec(updateStatementToSchemaVersion_1());

        // Update schema version
        db.pragma(`schema_version = ${clientDbSchemaVersion}`);

        // Update user version
        db.pragma(`user_version = ${clientDbSchemaVersion}`);
      })();
      return db;
    default:
      throw new Error(`Invalid Migration - ${{ clientDbSchemaVersion, db }}`);
  }
};
