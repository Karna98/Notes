/**
 * Button.tsx
 *
 * Description:
 *    Button Component similar to HTML Button.
 *
 */

import React from 'react';
import './button.scss';

const Button: React.FC<ButtonElementInterface> = (props) => {
  const { label, type, onClick, className } = props;

  /**
   * Executes onClick() on Button Click.
   */
  const onButtonClick = () => {
    onClick && onClick();
  };

  return (
    <button
      className={
        className === undefined
          ? 'd-flex button-element justify-content-center'
          : className
      }
      type={type}
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
};

export default Button;
