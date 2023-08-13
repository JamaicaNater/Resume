import { Outlet } from 'react-router-dom';
import useRequireAuth from '../hooks/auth/useRequireAuth';
import { CircularProgress } from '@mui/material';
import { PropTypes } from 'prop-types';

const AuthRoutes = ({ children }) => {
  const { loadingUser } = useRequireAuth()

  return (
    <>
    {
            loadingUser && <CircularProgress/> ||
            (children ?? <Outlet />)
    }
    </>
    )
};

export default AuthRoutes

AuthRoutes.propTypes = {
    children: PropTypes.node,
}