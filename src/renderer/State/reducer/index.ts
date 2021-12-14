/**
 * index.ts
 *
 * Description:
 *    Index File for all Reducers.
 *
 */

import message, { updateMessageState } from './message';
import response, { updateResponseState } from './response';

export { updateMessageState, updateResponseState };
export default { message, response };
