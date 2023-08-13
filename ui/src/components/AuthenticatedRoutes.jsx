import { Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { PropTypes } from 'prop-types';
import useLoginRedirect from '../hooks/auth/useLoginRedirect';

const AuthRoutes = ({ children }) => {
  const redirecting = useLoginRedirect()

  return (
    <>
    {console.log(redirecting)}
    {
        redirecting && <CircularProgress/>
    }
    {
        !redirecting && (children ?? <Outlet />)
    }
    </>
    )
};

export default AuthRoutes

AuthRoutes.propTypes = {
    children: PropTypes.node,
}