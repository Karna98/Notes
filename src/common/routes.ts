/**
 * routes.ts
 *
 * Description:
 *    Routes Declaration.
 *
 */

// Mapped Routes. { Simple-Route : Normalized-Route}
const definedRoutes: Record<string, string> = {
  'auth-status': 'AUTH:STATUS',
  'auth-register': 'AUTH:REGISTER',
  'auth-login': 'AUTH:LOGIN',
  'spaces-get': 'SPACES:GET',
  'spaces-add': 'SPACES:ADD',
  'notes-get': 'NOTES:GET',
  'notes-add': 'NOTES:ADD',
  'notes-update': 'NOTES:UPDATE',
};

// Mapped React Routes
const reactRoutes: Record<string, string> = {
  auth: '/',
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
