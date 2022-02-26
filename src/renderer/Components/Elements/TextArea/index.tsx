/**
 * index.tsx
 *
 * Description:
 *    Textarea Component similar to HTML TextArea Input.
 *
 */
import './textarea.scss';

const TextArea: React.FC<TextAreaInputInterface> = ({
  id,
  label,
  name,
  onChange,
  placeholder,
  readonly = false,
  required = false,
  value,
  tabIndex,
}) => {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center textarea-element">
      {label && <label className="d-flex align-items-center">{label}</label>}

      <textarea
        id={id}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={`d-flex align-items-center ${
          readonly ? 'textarea-readonly' : ''
        }`}
        readOnly={readonly}
        tabIndex={tabIndex}
      />
    </div>
  );
};

export default TextArea;
