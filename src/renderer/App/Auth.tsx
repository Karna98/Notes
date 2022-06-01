/**
 * Auth.tsx
 *
 * Description:
 *    Authentication Page (Register, Login).
 *
 */

import { CONSTANT } from 'common';
import { Route, Routes } from 'react-router-dom';
import { AuthPin, Login, Register } from 'renderer/Components';
import './auth.scss';

// Constant String.
const { ENDPOINT } = CONSTANT.REACT;

const Auth = () => {
  // List of Routes.
  const routeList = [
    {
      name: 'Login',
      path: ENDPOINT.LOGIN,
      element: <Login />,
    },
    {
      name: 'Register',
      path: ENDPOINT.REGISTER,
      element: <Register />,
    },
    {
      name: 'Login Pin',
      path: ENDPOINT.PIN,
      element: <AuthPin />,
    },
  ];

  return (
    <div className="auth-card">
      <Routes>
        {routeList.map((route) => (
          <Route key={route.name} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default Auth;
