/**
 * index.tsx
 *
 * Description:
 *    Input Component similar to HTML Input.
 *
 */

import { forwardRef } from 'react';
import './input.scss';

const Input = forwardRef(
  (props: InputInterface, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      id,
      label,
      maxLength,
      name,
      onChange,
      onKeyDown,
      placeholder,
      required,
      type = `text`,
      value = ``,
    } = props;

    /**
     * Apply class name based on input name.
     *
     * @returns {string} Class Names.
     */
    const getClassName = (): string => {
      const defaultClassName = 'd-flex align-items-center';

      switch (id) {
        case 'spaces-space_name':
          return defaultClassName + ' text-align-center';
        default:
          return defaultClassName;
      }
    };

    return (
      <div className="d-flex flex-row justify-content-center align-items-center input-element">
        {label && (
          <label className="d-flex align-items-center unselectable">
            {label}
          </label>
        )}

        <input
          className={getClassName()}
          id={id}
          maxLength={maxLength}
          name={name}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          ref={ref}
          required={required}
          type={type}
          value={value}
        />
      </div>
    );
  }
);

// Property required for using 'forwardRef'
Input.displayName = `Input`;

export default Input;
