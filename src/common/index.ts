/**
 * index.ts
 *
 * Description:
 *    Index file for shared logic and data.
 *
 */

export { default as CONSTANT } from './constant';
export { resolveReactRoutes } from './routes';
export { getStatusCode } from './status-codes';
export { createMessage, IPCRequestObject, IPCResponseObject } from './util';
