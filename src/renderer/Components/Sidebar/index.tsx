/**
 * index.tsx
 *
 * Description:
 *    Sidebar Component.
 *
 */

import NOTES_LOGO_256 from 'assets/logo/png/256x256.png';
import { CONSTANT } from 'common';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DivLink, Form } from 'renderer/Components';
import { useAppDispatch, useAppSelector } from 'renderer/Hooks';
import {
  clearSessionState,
  clearSpacesState,
  clearVolatileState,
} from 'renderer/State';
import { resolveReactRoutes } from 'renderer/util';
import './sidebar.scss';

// Constant String.
const { ROUTE } = CONSTANT.REACT;

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
        URI: ROUTE.SPACES.LIST,
      },
    ],
    secondary: [
      {
        title: `Notes`,
        URI: resolveReactRoutes(ROUTE.SPACES.SPACE.NOTE.LIST, {
          space_id: Number(space_id),
        }),
      },
      {
        title: `Credentials`,
        URI: resolveReactRoutes(ROUTE.SPACES.SPACE.CREDENTIAL.LIST, {
          space_id: Number(space_id),
        }),
      },
    ],
    others: [
      {
        title: `Profile`,
        URI: ROUTE.PROFILE,
      },
    ],
  };

  // Local State to track the current Sidebar link selected.
  const [currentSelection, setCurrentSelection] = useState(links.main[0].title);

  /**
   * Submit Logout form.
   */
  const logoutFormAction = () => {
    // Clear all redux stores on logout.
    dispatch(clearSessionState());
    dispatch(clearSpacesState());
    dispatch(clearVolatileState());
  };

  /**
   * Set recently clicked Link.
   *
   * @param selectedLink Link recently clicked.
   */
  const linkOnClick = (selectedLink: string) => {
    setCurrentSelection(selectedLink);
  };

  /**
   * Return Element <DivLink/>.
   *
   * @param title Link Label.
   * @param url  Link URL
   * @returns {void}
   */
  const customDevLink = (title: string, url: string) => (
    <DivLink
      key={title}
      id={title}
      to={url}
      customFunction={linkOnClick}
      className="links"
    >
      {currentSelection === title ? <b>{title}</b> : title}
    </DivLink>
  );

  return (
    <nav className="d-flex flex-column">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <img
          src={NOTES_LOGO_256}
          alt="Notes Logo"
          className="icon unselectable"
          draggable={false}
        />
      </div>

      <div className="d-flex flex-column justify-content-between align-items-center links-section unselectable">
        <div className="d-flex flex-column align-items-center main-secondary-links-section">
          <div className="d-flex flex-column align-items-center main-links">
            {links.main.map((link) => customDevLink(link?.title, link.URI))}
          </div>

          {location.pathname.startsWith(ROUTE.SPACES.LIST + `/`) && (
            <div className="d-flex flex-column align-items-center secondary-links">
              <h5>{currentSpaceDetails?.space_name}</h5>

              {space_id &&
                links.secondary.map((link) =>
                  customDevLink(link?.title, link.URI)
                )}
            </div>
          )}
        </div>

        <div className="d-flex flex-column align-items-center other-links">
          {links.others.map((link) => customDevLink(link?.title, link.URI))}

          <Form id="sidebar-logout-form" submitAction={logoutFormAction} />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
