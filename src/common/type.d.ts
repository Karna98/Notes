/**
 * type.d.ts
 *
 * Description:
 *    Type Declaration to be accessed across the project..
 *
 */

//  Session Store Type
type SessionStoreType = {
  username: string;
};

// ================================================================================
// Different Form Types.
// ================================================================================

// Login Form
type LoginFormType = {
  [key: string]: string;
  username: string;
  password: string;
};

// Register Form
type RegisterFormType = LoginFormType & {
  retypePassword: string;
};

// Form Types
type FormType = RegisterFormType | LoginFormType;
