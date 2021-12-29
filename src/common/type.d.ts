/**
 * type.d.ts
 *
 * Description:
 *    Type Declaration to be accessed across the project..
 *
 */

type AuthCredentialType = Pick<UsersTableInteface, 'username' | 'password'>;

type SessionType = Pick<
  UsersTableInteface,
  '_id' | 'username' | 'created_at' | 'last_logged_in'
>;
