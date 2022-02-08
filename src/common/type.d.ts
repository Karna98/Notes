/**
 * type.d.ts
 *
 * Description:
 *    Type Declaration to be accessed across the project..
 *
 */

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;

type AuthCredentialType = Pick<UsersTableInteface, 'username' | 'password'>;

type SessionType = Pick<
  UsersTableInteface,
  '_id' | 'username' | 'created_at' | 'last_logged_in'
>;

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
