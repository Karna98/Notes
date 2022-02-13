/**
 * Profile.tsx
 *
 * Description:
 *    Profile Section.
 *
 */

import { useAppSelector } from 'renderer/Hooks';
import './profile.scss';

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
    <div className="d-flex flex-column align-items-center profile-card">
      <div className="d-flex flex-row align-items-center profile-heading">
        <h1>Profile</h1>
      </div>

      {profileDetails.map((data: Record<string, string | number>) => (
        <div
          key={data.label}
          className="d-flex flex-row justify-content-between profile-details"
        >
          <p className="detail-label">
            <i>{data.label}:</i>
          </p>

          <p className="detail-value">{data.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
