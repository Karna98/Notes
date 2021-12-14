/**
 * Input.tsx
 *
 * Description:
 *    Input Component similar to HTML Input.
 *
 */

import React from 'react';
import './input.scss';

const Input: React.FC<InputElementInterface> = (props) => {
  const {
    value,
    label,
    name,
    placeholder,
    type = 'text',
    required,
    onChange,
  } = props;

  return (
    <div className="d-flex flex-row input-element">
      {label && <label className="d-flex align-items-center">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="d-flex align-items-center"
      />
    </div>
  );
};

export default Input;
