/**
 * Message.tsx
 *
 * Description:
 *    Message Component to display different types of messages.
 *
 */

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/Hooks';
import { clearMessageState } from 'renderer/State';
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
        <div className="d-flex flex-column justify-content-evenly align-items-center message-card">
          Message : [{messageState.status}] - {messageState.message}
        </div>
      )}
    </>
  );
};

export default Message;
