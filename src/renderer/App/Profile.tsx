/**
 * Profile.tsx
 *
 * Description:
 *    Profile Section.
 *
 */

import React from 'react';
import { useAppSelector } from 'renderer/Hooks';

const Profile = () => {
  // Get session value stored in Redux Store.
  const sessionState = useAppSelector((state) => state.session);

  /**
   * Convert Unix Timestamp to LocaleString (readable timestamp).
   *
   * @param timestamp Unix Timestamp
   * @returns LocaleString Timestamp.
   */
  const beautifyTimestamp = (timestamp: number) => {
    if (timestamp == null) return '-';
    return new Date(timestamp).toLocaleString();
  };

  // Profile Details and values to be shown.
  const profileDetails: Record<string, string | number>[] =
    sessionState != null
      ? [
          { label: 'Username', value: sessionState.username },
          {
            label: 'Last Logged In',
            value: beautifyTimestamp(sessionState.last_logged_in),
          },
          {
            label: 'Created on',
            value: beautifyTimestamp(sessionState.created_at),
          },
        ]
      : [];

  return (
    <div className="d-flex flex-column">
      <h2>Profile</h2>
      <table>
        <tbody>
          {profileDetails.map((data: Record<string, string | number>) => (
            <tr key={data.label}>
              <td>
                <b>{data.label}</b>
              </td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
