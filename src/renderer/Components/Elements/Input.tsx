/**
 * Input.tsx
 *
 * Description:
 *    Input Component similar to HTML Input.
 *
 */

import React from 'react';

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
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
