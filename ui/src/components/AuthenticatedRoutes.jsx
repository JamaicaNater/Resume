import { Outlet } from 'react-router-dom';
import { Card, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import useLoginRedirect from '../hooks/auth/useLoginRedirect';

const AuthRoutes = ({ children }) => {
  const redirecting = useLoginRedirect()

  return (
    <>
    {
        redirecting && 
        <Card sx={{padding: '1.5rem'}}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <Container>
                    <Typography variant="h6">Redirecting to login</Typography>
                    <CircularProgress/>
                </Container>
            </CardContent>
        </Card>
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