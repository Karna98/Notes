/**
 * routes.ts
 *
 * Description:
 *    Routes Declaration.
 *
 */

// Mapped React Routes
const reactRoutes: Record<string, string> = {
  root: '/',
  auth: '/auth',
  auth_login: '/auth/login',
  auth_register: '/auth/register',
  auth_pin: '/auth/l-pin',
  profile: '/profile',
  spaces: '/spaces',
  space: '/spaces/{space_id}',
  notes: '/spaces/{space_id}/notes',
  credentials: '/spaces/{space_id}/credentials',
};

/**
 * Gets React Route with parameters replaced (if any).
 *
 * @param route Simple React Route
 * @returns {string} Route string with passed parameter.
 */
const resolveReactRoutes = (
  route: string,
  params?: Record<string, string | number>
): string => {
  if (reactRoutes.hasOwnProperty(route)) {
    let url: string = reactRoutes[route];
    if (params !== undefined) {
      for (const key in params) {
        url = url.replace(`{${key}}`, <string>params[key]);
      }
    }
    return url;
  } else throw new Error('Invalid Route Request.');
};

export { resolveReactRoutes };
