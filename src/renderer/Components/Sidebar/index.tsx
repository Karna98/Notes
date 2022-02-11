/**
 * index.tsx
 *
 * Description:
 *    Sidebar Component.
 *
 */

import NOTES_LOGO_256 from 'assets/logo/png/256x256.png';
import { resolveReactRoutes } from 'common';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'renderer/Hooks';
import { clearSessionState, clearSpacesState } from 'renderer/State';
import { Form } from '..';
import './sidebar.scss';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Get spaces value stored in Redux Store.
  const spacesState = useAppSelector((state) => state.spaces);

  // Infer space_id from Spaces Store.
  const space_id = spacesState?.currentSpace?.space_id;

  // Get Space details regarding space_id.
  const currentSpaceDetails = spacesState?.list.filter(
    ({ _id }: SpacesTableInterface) => _id == Number(space_id)
  )[0];

  const links = {
    main: [
      {
        title: `Spaces`,
        URI: resolveReactRoutes(`spaces`),
      },
    ],
    secondary: [
      {
        title: `Notes`,
        URI: resolveReactRoutes(`notes`, { space_id: Number(space_id) }),
      },
      {
        title: `Credentials`,
        URI: resolveReactRoutes(`credentials`, { space_id: Number(space_id) }),
      },
    ],
    others: [
      {
        title: `Profile`,
        URI: resolveReactRoutes(`profile`),
      },
    ],
  };

  /**
   * Clears all store data.
   */
  const logoutFormSubmitAction = () => {
    // Clear all redux stores on logout.
    dispatch(clearSessionState());
    dispatch(clearSpacesState());
  };

  return (
    <div className="d-flex flex-column sidebar">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <img src={NOTES_LOGO_256} alt="Notes Logo" className="icon" />
      </div>

      <div className="d-flex flex-column justify-content-between align-items-center links-section">
        <div className="d-flex flex-column align-items-center top-section">
          <div className="d-flex flex-column align-items-center main-links">
            {links.main.map((link) => (
              <Link key={link?.title} to={link.URI}>
                {link?.title}
              </Link>
            ))}
          </div>

          {location.pathname.startsWith(resolveReactRoutes(`spaces`) + `/`) && (
            <div className="d-flex flex-column align-items-center secondary-links">
              <h5>{currentSpaceDetails?.space_name}</h5>

              {space_id &&
                links.secondary.map((link) => (
                  <Link key={link?.title} to={link.URI}>
                    {link?.title}
                  </Link>
                ))}
            </div>
          )}
        </div>

        <div className="d-flex flex-column align-items-center other-links">
          {links.others.map((link) => (
            <Link key={link?.title} to={link.URI}>
              {link?.title}
            </Link>
          ))}

          <Form
            id="sidebar-logout-form"
            submitAction={logoutFormSubmitAction}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
