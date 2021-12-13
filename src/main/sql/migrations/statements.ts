/**
 * statements.ts
 *
 * Description:
 *    Query Statements related to all migrations.
 *
 */

const updateToSchemaVersion_1 = (): string => {
  // Refer https://github.com/Karna98/Notes/blob/0c6627ed0ddb9d843c6b54a63b0edc9b8a833992/src/main/sql/migrations/statements.ts
  return `
      -- Following is the dummy statement sample one.
      SELECT * FROM users;
    `;
};

export default { updateToSchemaVersion_1 };
