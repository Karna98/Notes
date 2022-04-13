/**
 * index.tsx
 *
 * Description:
 *    Message Component to display different types of messages/notifications.
 *
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  const getClassName = () => {
    const className =
      'd-flex flex-column justify-content-evenly align-items-center message-card';

    switch (messageState.status) {
      case 0:
        return className + ` message-progress`;

      case 200:
        return className + ` message-success`;

      case 400:
        return className + ` message-error-low`;

      case 500:
        return className + ` message-error-high`;

      default:
        return className;
    }
  };

  return createPortal(
    <>
      {messageState.message && (
        <div className="notification-message unselectable">
          <div className={getClassName()}>
            <b>{messageState.message}</b>
          </div>
        </div>
      )}
    </>,
    document.getElementById(`portal-notification`) as HTMLElement
  );
};

export default Message;
