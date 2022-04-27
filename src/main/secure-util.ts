/**
 * secure-utils.ts
 *
 * Description:
 *    Utility functions related to security.
 *
 */

import {
  compareSync as bcryptCompareSync,
  hashSync as bcryptHashSync,
} from 'bcryptjs';
import { createHash } from 'crypto';

/**
 * @TODO
 * In future, replace 'bcryptjs' with 'bcrypt' for more faster operations.
 */

// Salt rounds, higher is safer.
const SALT_ROUNDS = 10;

/**
 * Compute Hash using SHA256 Algorithm.
 *
 * @param key
 * @returns {string} SHA256 Hash value of key.
 */
const cryptoHash = (key: string) => {
  return createHash('sha256').update(key).digest('hex');
};

/**
 * Compute Hash using Bcrypt.
 *
 * @param key
 * @returns {string} Bcrypt Hash value of key.
 */
const bcryptHash = (key: string) => {
  return bcryptHashSync(key, SALT_ROUNDS);
};

/**
 * Compute double Hash using SHA256 & Bcrypt.
 *
 * @param key
 * @returns {string} Hash value of key.
 */
const cryptBcryptHash = (key: string) => {
  return bcryptHash(cryptoHash(key));
};

/**
 * Compare key with Bcrypt Hash.
 *
 * @param key
 * @param hash Hash value to be compared with.
 * @returns {boolean} Returns Status of key matches the hash or not.
 */
const cryptBcryptCompare = (key: string, hash: string, keyHashed = false) => {
  if (keyHashed) return bcryptCompareSync(key, hash);

  return bcryptCompareSync(cryptoHash(key), hash);
};

export { bcryptHash, cryptBcryptCompare, cryptBcryptHash, cryptoHash };
