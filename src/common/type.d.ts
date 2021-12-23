/**
 * type.d.ts
 *
 * Description:
 *    Type Declaration to be accessed across the project..
 *
 */

// ================================================================================
// Redux Store Types.
// ================================================================================

//  Store Session Type
type SessionStoreType = {
  _id: number;
  created_at: number;
  last_logged_in: number;
  username: string;
};

//  Store Spaces Type
type SpacesType = {
  metaData: Record<string, unknown>;
  list: SpaceDetailType[];
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

// Spaces Form
type SpaceFormType = {
  [key: string]: string;
  space_name: string;
};

// Form Types
type FormType = LoginFormType | RegisterFormType | SpaceFormType;

// ================================================================================
// Uncategorized Types.
// ================================================================================

type SpaceDetailType = SpaceFormType & {
  _id?: number;
  created_at?: string;
};
