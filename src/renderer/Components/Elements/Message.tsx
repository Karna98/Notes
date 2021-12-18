/**
 * Message.tsx
 *
 * Description:
 *    Message Component to display different types of messages.
 *
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { clearMessageState } from '../../State/reducer/message';

type PropType = {
  messageState: MessageInterface;
  autoDisappear: boolean;
};

const Message = (props: PropType) => {
  const { messageState, autoDisappear } = props;
  const dispatch = useDispatch();

  if (autoDisappear) {
    setTimeout(() => {
      // Set Message to null.
      dispatch(clearMessageState());
    }, 3000);
  }

  return (
    <div className="message">
      Message : [{messageState.status}] - {messageState.message}
    </div>
  );
};

export default Message;
