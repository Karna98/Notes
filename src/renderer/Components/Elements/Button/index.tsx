/**
 * index.tsx
 *
 * Description:
 *    Button Component similar to HTML Button.
 *
 */

import React from 'react';
import './button.scss';

const Button: React.FC<ButtonInterface> = (props) => {
  const { label, onClick } = props;

  /**
   * Executes onClick() on Button Click.
   */
  const onButtonClick = () => {
    // If onClick is defined then execute onClick.
    onClick && onClick();
  };

  return (
    <button
      className={'d-flex button-element justify-content-center'}
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
};

export default Button;
