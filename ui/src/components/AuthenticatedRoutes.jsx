import { Outlet } from 'react-router-dom';
import useRequireAuth from '../hooks/auth/useRequireAuth';

const AuthRoutes = ({ children }) => {
  useRequireAuth()

  return children ?? <Outlet />;
};

export default AuthRoutes

