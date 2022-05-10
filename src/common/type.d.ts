/**
 * type.d.ts
 *
 * Description:
 *    Type Declaration to be accessed across the project..
 *
 */

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

type SubRequestResponseType = Pick<IPCRequestInterface, 'data'> & {
  message: MessageInterface | undefined;
};

type AuthCredentialType = Pick<UsersTableInteface, 'username' | 'password'>;

type PinStatusType = { lPinStatus: boolean; sPinStatus: boolean };

type SessionType = Pick<
  UsersTableInteface,
  | '_id'
  | 'username'
  | 'password'
  | 'l_pin'
  | 's_pin'
  | 'created_at'
  | 'last_logged_in'
> &
  PinStatusType;

type NoteStoreType = Pick<NotesTableInterface, '_id' | 'note' | 'updated_at'>;

type CredentialStoreType = Omit<
  CredentialsTableInterface,
  'space_id' | 'credential'
> & {
  credential: {
    title: string;
    secure: ElementObjectInterface[];
  };
};

type AuthPinRequestType = SessionType & {
  data: CredentialStoreType;
};
