/**
 * Message.tsx
 *
 * Description:
 *    Message Component to display different types of messages.
 *
 */

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks';
import { clearMessageState } from '../../State/reducer';
import './message.scss';

const Message = () => {
  // Get message value stored in Redux Store.
  const messageState = useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();

  useEffect(() => {
    messageState?.message &&
      // Clears Message after 3 seconds.
      setTimeout(() => {
        dispatch(clearMessageState());
      }, 3000);
  }, [messageState]);

  return (
    <>
      {messageState.message && (
        <div className="text-align-center message-card">
          Message : [{messageState.status}] - {messageState.message}
        </div>
      )}
    </>
  );
};

export default Message;
