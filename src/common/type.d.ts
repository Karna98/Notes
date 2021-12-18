/**
 * type.d.ts
 *
 * Description:
 *    Type Declaration to be accessed across the project..
 *
 */

//  Session Store Type
type SessionStoreType = {
  _id: number;
  last_logged_in: number;
  username: string;
};

// ================================================================================
// Different Form Types.
// ================================================================================

// Login Form
type LoginFormType = {
  [key: string]: string;
  password: string;
  username: string;
};

// Register Form
type RegisterFormType = LoginFormType & {
  retypePassword: string;
};

// Form Types
type FormType = RegisterFormType | LoginFormType;
