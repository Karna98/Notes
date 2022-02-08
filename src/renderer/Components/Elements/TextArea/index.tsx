/**
 * index.tsx
 *
 * Description:
 *    Input Component similar to HTML TextArea Input.
 *
 */

import './textarea.scss';

const TextAreaInput: React.FC<TextAreaInputInterface> = (props) => {
  const {
    id,
    value,
    label,
    name,
    placeholder,
    required = false,
    onChange,
  } = props;

  return (
    <div className="d-flex flex-row input-textarea-element">
      {label && <label className="d-flex align-items-center">{label}</label>}
      <textarea
        id={id}
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

export default TextAreaInput;
