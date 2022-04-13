/**
 * status-codes.ts
 *
 * Description:
 *    File maintaining different status codes related to request fulfillment.
 *
 */

//  Mapped Status Code. { Status : Status-Number}
const statusCode: Record<string, number> = {
  // intialized
  progress: 0,
  // success, creation-success
  success: 200,
  // bad-request, unauthorized
  'client-error': 400,
  // server-side, database-error
  'server-error': 500,
};

/**
 * Return Status Code.
 *
 * @param statusString
 * @returns {number} Status Code for respective statusString.
 */
const getStatusCode = (statusString: string) => {
  if (statusCode.hasOwnProperty(statusString)) return statusCode[statusString];
  else throw new Error('Invalid Error Code Request');
};

export { getStatusCode };
