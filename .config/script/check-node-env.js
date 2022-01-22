/**
 * check-node-env.js
 *
 * Description:
 *    Verify if set NODE_ENV is as expected.
 *
 */

import { whiteBright as chalkWhiteBright } from 'chalk';

export default function checkNodeEnv(expectedEnv) {
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set');
  }

  if (process.env.NODE_ENV !== expectedEnv) {
    console.log(
      chalkWhiteBright.bgRed.bold(
        `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`
      )
    );
    process.exit(2);
  }
}
