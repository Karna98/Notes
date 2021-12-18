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
const definedReactRoutes: Record<string, Record<string, string>> = {
  home: {
    value: '/',
    redirect: '/auth',
  },
  auth: {
    value: '/auth',
    redirect: '/',
  },
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
 * Gets React Route.
 *
 * @param route React Route alias.
 * @returns {string} URL calue of route.
 */
const resolveReactRoute = (route: string, redirect = false) => {
  if (definedReactRoutes.hasOwnProperty(route))
    return redirect
      ? definedReactRoutes[route]['redirect']
      : definedReactRoutes[route]['value'];
  else throw new Error('Invalid React Route Request.');
};

export { resolveRoute, resolveReactRoute };
