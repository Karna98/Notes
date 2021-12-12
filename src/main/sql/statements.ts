/**
 * statements.ts
 *
 * Description:
 *    Query Statements related to all functionalities.
 *
 */

// ================================================================================
// Common Statements.
// ================================================================================

/**
 * Generalize INSERT Statement.
 *
 * @param table Name of the table.
 * @param columns Name of the column/s.
 * @param values Values to be inserted.
 * @returns {string} INSERT Statement with provided params.
 */
const insertStatement = (
  table: string,
  columns: string[],
  values: string[]
) => {
  return `
    INSERT INTO ${table}
    ( ${columns.join(', ')} )
    VALUES ( ${values.join(', ')} );
  `;
};

/**
 * Generalize GET Statement.
 *
 * @param table Name of the table.
 * @param columns Name of the column/s.
 * @returns {string} GET Statement with provided params.
 */
const getStatement = (table: string, columns: string[]) => {
  return `
    SELECT ${columns.join(', ')}
    FROM ${table};
  `;
};

/**
 * Generalize GET Conditonal Statement.
 *
 * @param table Name of the table.
 * @param columns Name of the column/s.
 * @param condition Conditions to be applied.
 * @returns {string} GET Statement with provided params.
 */
// const getConditionalStatement = (
//   table: string,
//   columns: string[],
//   condition: string
// ) => {
//   return `
//     SELECT ${columns.join(', ')}
//     FROM ${table}
//     WHERE ${condition};
//   `;
// };

// ================================================================================
// Create Database Statements.
// ================================================================================

/**
 * Statement to create Database for very first time.
 *
 * @returns {string}
 */
const createDatabaseStatement = (): string => {
  return `
  CREATE TABLE IF NOT EXISTS users (
    _id INTEGER PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    created_at datetime NOT NULL,
    last_logged_in datetime,
    password VARCHAR(60) NOT NULL,
    l_pin VARCHAR(60),
    s_pin VARCHAR(60)
  );
  `;
};

// ================================================================================
// Users Related Statements.
// ================================================================================

/**
 * Insert new user into Database.
 *
 * @returns {string}
 */
const createUserStatement = (): string => {
  return insertStatement(
    `users`,
    [`username`, `created_at`, `password`],
    [`?`, `?`, `?`]
  );
};

/**
 * Get User having provided username from Database.
 *
 * @returns {string}
 */
// const getUserByUsernameStatement = (): string => {
//   return getConditionalStatement(`users`, [`*`], `username = ?`);
// };

/**
 * Get Count of Users from Database.
 *
 * @returns {string}
 */
const getUsersCountStatement = (): string => {
  return getStatement(`users`, [`COUNT(*)`]);
};

export { createDatabaseStatement, createUserStatement, getUsersCountStatement };
