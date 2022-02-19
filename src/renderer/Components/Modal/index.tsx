/**
 * index.tsx
 *
 * Description:
 *    Modal Component.
 *
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '..';
import './modal.scss';

const formButtons: Record<string, ButtonInterface> = {
  close: {
    id: `modal-button-close`,
    name: `button-close`,
    label: `❌`,
    type: `button`,
  },
};

const Modal = ({ onClickClose, children }: ModalInterface) => {
  /**
   * Close Modal on click.
   */
  const closeModal = () => {
    (
      document.getElementsByClassName(`spaces`)[0] as HTMLElement
    ).style.overflowY = `overlay`;
    onClickClose(false);
  };

  useEffect(() => {
    (
      document.getElementsByClassName(`spaces`)[0] as HTMLElement
    ).style.overflowY = `hidden`;
  }, []);

  return createPortal(
    <>
      <div className="d-flex flex-row justify-content-center align-items-center modal-background">
        <div className="modal-box">
          <div className="d-flex flex-row justify-content-center align-items-center modal-close">
            <Button {...formButtons.close} onClick={closeModal} />
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center modal-body">
            {children}
          </div>
        </div>
      </div>
    </>,
    document.getElementById(`portal-root`) as HTMLElement
  );
};

export default Modal;
