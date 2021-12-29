/**
 * ProtectedRoutes.tsx
 *
 * Description:
 *    Wrapper with Condition enabled for React Route Component.
 *
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

// Type Declaration
type ProtectedRouteType = {
  // URL to be redirected to.
  redirectTo: string;
  // Boolean condition to decide render or redirection.
  condition: boolean;
  // Component to be Render
  children: React.ReactElement;
};

/**
 * Protected Route Component is wrapper for Route ELement to decide rendering
 * of child element or rediection base on condition.
 *
 * @param props Object of attributes for ProtectedRoutes Component.
 * @returns {Component} Child or Navigate component.
 */
const ProtectedRoute = (props: ProtectedRouteType): React.ReactElement => {
  const { children, condition, redirectTo } = props;
  return condition ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
