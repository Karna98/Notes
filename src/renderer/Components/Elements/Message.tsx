/**
 * Message.tsx
 *
 * Description:
 *    Message Component to display different types of messages.
 *
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { clearMessageState } from '../../State/reducer';
import './message.scss';

type PropType = {
  messageState: MessageInterface;
  autoDisappear: boolean;
};

const Message = (props: PropType) => {
  const { messageState, autoDisappear } = props;
  const dispatch = useDispatch();

  if (autoDisappear) {
    // Clears Message after 3 seconds.
    setTimeout(() => {
      dispatch(clearMessageState());
    }, 3000);
  }

  return (
    <div className="text-align-center message-card">
      Message : [{messageState.status}] - {messageState.message}
    </div>
  );
};

export default Message;
