/**
 * index.ts
 *
 * Description:
 *    Functions related to Database migrations.
 *
 */

import { Database } from 'better-sqlite3';
import { getClientSchemaVersion, SCHEMA_VERSION } from '../util';

// If Client's schema version is outdated, then it is updated to latest schema version.
const updateDatabaseSchema = (db: Database, clientDbSchemaVersion: number) => {
  console.log(`Client's DB Schema Version : ${clientDbSchemaVersion}`);

  while (clientDbSchemaVersion < SCHEMA_VERSION) {
    // db = performMigrations(db, clientDbSchemaVersion + 1);
    clientDbSchemaVersion = getClientSchemaVersion(db);
    // Temporary Fix till new schema versions are added.
    break;
  }
};

export { updateDatabaseSchema };
