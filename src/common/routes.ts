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
  'notes-add': 'NOTES:ADD',
  'notes-update': 'NOTES:UPDATE',
  'spaces-add': 'SPACES:ADD',
  'spaces-get': 'SPACES:GET',
  'spaces-get-space': 'SPACES:GET_SPACE',
};

// Mapped React Routes
const reactRoutes: Record<string, string> = {
  home: '/',
  auth: '/auth',
  auth_login: '/auth/login',
  auth_register: '/auth/register',
  profile: '/profile',
  spaces: '/spaces',
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

export { resolveRoute, reactRoutes };
