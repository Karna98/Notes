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

export { resolveRoute };
