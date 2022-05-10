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
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scryptSync,
} from 'crypto';

/**
 * @TODO
 * In future, replace 'bcryptjs' with 'bcrypt' for more faster operations.
 */

// Salt rounds, higher is safer.
const SALT_ROUNDS = 10;

const ENC_DEC_ALGORITHM = `aes-256-ctr`;
const ENC_DEC_IV = randomBytes(16);
const ENC_DEC_SEPERATOR = `$`;

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

/**
 * Encrypt data using Key.
 *
 * @param key Encryption Key.
 * @param data Data to be encrypted
 * @returns {string} Encrypted Data
 */
const encryptData = (key: string, data: string): string => {
  const cipher = createCipheriv(
    ENC_DEC_ALGORITHM,
    scryptSync(key, 'N0TE$', 32),
    ENC_DEC_IV
  );

  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  return [ENC_DEC_IV.toString(`hex`), encrypted.toString(`hex`)].join(
    ENC_DEC_SEPERATOR
  );
};

/**
 * Decrypt data using Key.
 *
 * @param key Decryption Key.
 * @param data Data to be decrypted
 * @returns {string} Decrypted Data
 */
const decryptData = (key: string, data: string): string => {
  const [IV, encryptedData] = data.split(ENC_DEC_SEPERATOR);

  const decipher = createDecipheriv(
    ENC_DEC_ALGORITHM,
    scryptSync(key, 'N0TE$', 32),
    Buffer.from(IV, `hex`)
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, `hex`)),
    decipher.final(),
  ]);

  return decrypted.toString();
};

export {
  bcryptHash,
  cryptBcryptCompare,
  cryptBcryptHash,
  cryptoHash,
  decryptData,
  encryptData,
};
