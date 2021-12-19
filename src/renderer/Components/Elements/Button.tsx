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
  const { label, type, onClick } = props;

  /**
   * Executes onClick() on Button Click.
   */
  const onButtonClick = () => {
    onClick && onClick();
  };

  return (
    <button
      className="d-flex button-element justify-content-center"
      type={type}
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
};

export default Button;
