/**
 * index.ts
 *
 * Description:
 *    Index File for all Reducers.
 *
 */

import message, { updateMessageState } from './message';
import response, { updateResponseState } from './response';
import session, { updateSessionState } from './session';

export { updateMessageState, updateResponseState, updateSessionState };
export default { message, response, session };
