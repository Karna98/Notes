/**
 * statements.ts
 *
 * Description:
 *    Query Statements related to all migrations.
 *
 */

export const updateStatementToSchemaVersion_1 = (): string => {
  return `
    -- Create 'logs' table
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY,
        timestamp datetime DEFAULT CURRENT_TIMESTAMP,
        message TEXT NOT NULL
    );
    
    -- Move data from sample to logs table
    INSERT INTO logs (id, message) 
    SELECT t1, t2 FROM sample;
    
    -- Drop 'sample' table
    DROP TABLE sample;
  `;
};
