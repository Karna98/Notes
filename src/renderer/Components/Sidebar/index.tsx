/**
 * index.tsx
 *
 * Description:
 *    Sidebar Component.
 *
 */

import { Link } from 'react-router-dom';
import './sidebar.scss';

type PropsType = {
  title?: string;
  links?: { title: string; URI: string }[];
};

const Sidebar = (props: PropsType) => {
  const { title, links } = props;

  return (
    <div className="sidebar">
      {title && <h4>{title}</h4>}
      <div className="d-flex flex-column">
        {links?.map((link) => (
          <Link key={link?.title} to={link.URI}>
            {link?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
