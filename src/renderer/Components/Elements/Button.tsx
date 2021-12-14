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
  const { label, type } = props;

  return (
    <button
      className="d-flex button-element justify-content-center"
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
