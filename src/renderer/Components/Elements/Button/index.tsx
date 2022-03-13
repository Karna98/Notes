/**
 * index.tsx
 *
 * Description:
 *    Button Component similar to HTML Button.
 *
 */

import './button.scss';

const Button: React.FC<ButtonInterface> = ({
  disabled = false,
  id,
  label,
  onClick,
  className,
  type = `submit`,
}) => {
  /**
   * Executes onClick() on Button Click.
   */
  const onButtonClick = () => {
    // If onClick is defined then execute onClick.
    onClick && onClick();
  };

  /**
   * Apply class name based on button id.
   *
   * @returns {string} Class Names.
   */
  const getClassName = () =>
    `d-flex flex-row align-items-center justify-content-center `;

  return (
    <button
      id={id}
      onClick={onButtonClick}
      type={type}
      disabled={disabled}
      className={
        className === undefined ? getClassName() : getClassName() + className
      }
    >
      {label}
    </button>
  );
};

export default Button;
