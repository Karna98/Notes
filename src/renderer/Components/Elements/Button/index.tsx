/**
 * index.tsx
 *
 * Description:
 *    Button Component similar to HTML Button.
 *
 */

import './button.scss';

const Button: React.FC<ButtonInterface> = (props) => {
  const { id, label, onClick, type = `submit`, disabled = false } = props;
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
  const getClassName = () => {
    const defaultClassName = `d-flex align-items-center`;

    switch (id) {
      case `sidebar-button-logout`:
        return defaultClassName + ` button-logout`;
      default:
        return defaultClassName + ` justify-content-center button-element`;
    }
  };

  return (
    <button
      id={id}
      onClick={onButtonClick}
      type={type}
      disabled={disabled}
      className={getClassName()}
    >
      {label}
    </button>
  );
};

export default Button;
