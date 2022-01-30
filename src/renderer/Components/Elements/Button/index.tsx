/**
 * index.tsx
 *
 * Description:
 *    Button Component similar to HTML Button.
 *
 */

import './button.scss';

const Button: React.FC<ButtonInterface> = (props) => {
  const { id, label, onClick, type = 'submit', disabled = false } = props;
  /**
   * Executes onClick() on Button Click.
   */
  const onButtonClick = () => {
    // If onClick is defined then execute onClick.
    onClick && onClick();
  };

  return (
    <button
      id={id}
      className={'d-flex button-element justify-content-center'}
      onClick={onButtonClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
