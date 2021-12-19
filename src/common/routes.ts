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
};

// Mapped React Routes
const reactRoutes: Record<string, string> = {
  auth: '/',
  space: '/spaces',
  profile: '/profile',
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
