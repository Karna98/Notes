/**
 * index.tsx
 *
 * Description:
 *    Input Component similar to HTML Input.
 *
 */

import './input.scss';

const Input: React.FC<InputInterface> = (props) => {
  const {
    id,
    value,
    label,
    name,
    placeholder,
    type = 'text',
    required,
    onChange,
  } = props;

  /**
   * Apply class name based on input name.
   *
   * @returns {string} Class Names.
   */
  const getClassName = () => {
    const defaultClassName = 'd-flex align-items-center';
    switch (id) {
      case 'spaces-space_name':
        return defaultClassName + ' text-align-center';
      default:
        return defaultClassName;
    }
  };

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
        className={getClassName()}
      />
    </div>
  );
};

export default Input;
