/**
 * Auth.tsx
 *
 * Description:
 *    Authentication Page (Register, Login).
 *
 */

import { Route, Routes } from 'react-router-dom';
import { Login, Register } from 'renderer/Components';
import './auth.scss';

const Auth = () => {
  // List of Routes.
  const routeList = [
    {
      name: 'Login',
      path: '/login',
      element: <Login />,
    },
    {
      name: 'Register',
      path: `/register`,
      element: <Register />,
    },
  ];

  return (
    <div className="card auth-card">
      <Routes>
        {routeList.map((route) => (
          <Route key={route.name} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default Auth;
