/**
 * type.d.ts
 *
 * Description:
 *    Type Declaration to be accessed across the project..
 *
 */

/**
 * GENERALIZED TYPES
 */

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

/**
 * REQUEST TYPES
 */

type AuthPinRequestType = SessionType & {
  data: CredentialDataType | number;
};

type CredentialRequestType = {
  s_pin: string;
  data: CredentialDataType | number;
};

type SpaceRequestType = Pick<SpacesTableInterface, '_id' | 'space_name'>;

/**
 * RESPONSE TYPES
 */

type SubRequestResponseType = Pick<IPCRequestInterface, 'data'> & {
  message: MessageInterface | undefined;
};

/**
 * STORE TYPES
 */

type SessionType = UsersTableInteface & PinStatusType;

type NoteStoreType = Pick<NotesTableInterface, '_id' | 'note' | 'updated_at'>;

type CredentialStoreType = Omit<
  CredentialsTableInterface,
  'space_id' | 'credential'
> & {
  credential: CredentialBodyType;
};

type CredentialDataType = OptionalExceptFor<
  Omit<CredentialsTableInterface, 'credential'>,
  '_id'
> & {
  credential: CredentialBodyType;
};

/**
 * SUPPORTING TYPES
 */

// Credential Body Type
type CredentialBodyType = {
  title: string;
  secure?: ElementObjectInterface[];
};

// @TODO: To replaced everything which is in key value pair.
type KeyValuePairType = {
  name: string;
  value: string | number | readonly string[] | undefined;
};

type AuthRequestType = Pick<UsersTableInteface, 'username' | 'password'>;

type PinStatusType = { lPinStatus: boolean; sPinStatus: boolean };
