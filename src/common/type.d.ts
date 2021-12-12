/**
 * type.d.ts
 *
 * Description:
 *    Type Declaration.
 *
 */

// ================================================================================
// Different Form Types.
// ================================================================================

// Register Form
type RegisterFormType = {
  [key: string]: string;
  username: string;
  password: string;
  retypePassword: string;
};
