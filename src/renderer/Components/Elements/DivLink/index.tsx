/**
 * index.tsx
 *
 * Description:
 *    Division acting as anchor link.
 *
 */

import { useNavigate } from 'react-router-dom';

const DivLink = ({
  id,
  to,
  className,
  customFunction,
  children,
}: DivLinkInterface) => {
  const navigate = useNavigate();

  const navigateOnClick = () => {
    customFunction && customFunction(id);
    navigate(to);
  };

  return (
    <div
      id={id}
      role="link"
      onClick={() => navigateOnClick()}
      onKeyPress={(event) => event.key === ` ` && navigateOnClick()}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
};

export default DivLink;
