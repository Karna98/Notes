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
}) => {
  return (
    <div className="d-flex flex-row align-items-center element-textarea">
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
      />
    </div>
  );
};

export default TextArea;
