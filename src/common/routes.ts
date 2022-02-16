/**
 * routes.ts
 *
 * Description:
 *    Routes Declaration.
 *
 */

// Mapped Routes. { Simple-Route : Normalized-Route}
const definedRoutes: Record<string, string> = {
  'auth-login': 'AUTH:LOGIN',
  'auth-register': 'AUTH:REGISTER',
  'auth-status': 'AUTH:STATUS',
  'credentials-add': 'CREDENTIALS:ADD',
  'credentials-update': 'CREDENTIALS:UPDATE',
  'notes-add': 'NOTES:ADD',
  'notes-update': 'NOTES:UPDATE',
  'spaces-add': 'SPACES:ADD',
  'spaces-get': 'SPACES:GET',
  'spaces-get-space': 'SPACES:GET_SPACE',
};

// Mapped React Routes
const reactRoutes: Record<string, string> = {
  root: '/',
  auth: '/auth',
  auth_login: '/auth/login',
  auth_register: '/auth/register',
  profile: '/profile',
  spaces: '/spaces',
  notes: '/spaces/{space_id}/notes',
  credentials: '/spaces/{space_id}/credentials',
};

/**
 * Gets Normalized Route of Simple Route and splits Normalized Route on ':'.
 *
 * @param route Simple Route
 * @returns {[]} Array of splitted Normalized Route.
 */
const resolveRoute = (route: string): string[] => {
  if (definedRoutes.hasOwnProperty(route))
    return definedRoutes[route].split(':');
  else throw new Error('Invalid Route Request.');
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

export { resolveReactRoutes, resolveRoute };
