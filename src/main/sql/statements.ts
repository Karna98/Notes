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

/**
 * Generalize UPDATE Statement.
 *
 * @param table Name of the table.
 * @param values Values to be updated.
 * @param condition Conditions to be applied.
 * @returns {string} UPDATE Statement with provided params.
 */
const updateStatement = (
  table: string,
  values: Record<string, unknown>,
  condition: string
) => {
  return `
    UPDATE ${table}
    SET ${Object.keys(values)
      .map((key) => `${key} = ${values[key]}`)
      .join(', ')}
    WHERE ${condition};
  `;
};

// ================================================================================
// Database Statements.
// ================================================================================

/**
 * Statement to create Database for very first time.
 *
 * @returns {string[]}
 */
const createDatabaseStatement = (): string[] => {
  return [
    `
  CREATE TABLE IF NOT EXISTS users (
    _id INTEGER PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    created_at datetime NOT NULL,
    last_logged_in datetime,
    password VARCHAR(60) NOT NULL,
    l_pin VARCHAR(60),
    s_pin VARCHAR(60)
  );
  `,
    `
  CREATE TABLE IF NOT EXISTS spaces (
    _id INTEGER PRIMARY KEY,
    space_name VARCHAR(60) UNIQUE NOT NULL,
    created_at datetime NOT NULL
  );
  `,
  ];
};

/**
 * Statement to insert default data in Database.
 *
 * @returns {string}
 */
const insertDefaultValueStatement = (): string[] => {
  return [
    `
  INSERT INTO spaces
  ( space_name, created_at )
  VALUES
  ('Personal', ${Date.now()});
  `,
  ];
};

// ================================================================================
// Users Statements.
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

/**
 * Get all Users from Database.
 *
 * @returns {string}
 */
const getUsersStatement = (): string => {
  return getStatement(`users`, [`*`]);
};

/**
 * Update User details in Database.
 *
 * @returns {string}
 */
const updateUserStatement = (values: Record<string, unknown>): string => {
  return updateStatement('users', values, `_id = ?`);
};

// ================================================================================
// Spaces Statements.
// ================================================================================

/**
 * Insert new space into Database.
 *
 * @returns {string}
 */
const createSpaceStatement = (): string => {
  return insertStatement(
    `spaces`,
    [`space_name`, `created_at`],
    [`?`, `${Date.now()}`]
  );
};

/**
 * Get all Spaces from Database.
 *
 * @returns {string}
 */
const getSpacesStatement = (): string => {
  return getStatement(`spaces`, [`*`]);
};

export {
  createDatabaseStatement,
  insertDefaultValueStatement,
  // Users
  createUserStatement,
  getUsersCountStatement,
  getUsersStatement,
  updateUserStatement,
  // Spaces
  createSpaceStatement,
  getSpacesStatement,
};
