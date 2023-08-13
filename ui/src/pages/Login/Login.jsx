import { Button, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material"
import { Link, useLocation } from 'react-router-dom';
import "./Login.css"
import { ApiController } from "../../utils/api";
import { useEffect, useReducer } from "react";
import { RequestReducer } from "../../utils/requestReducer";

const Login = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [userState, userDispatch] = useReducer(RequestReducer.reducer, {
        loading: false,
        data: null,
        error: null,
    })

    useEffect(() => {
        if (queryParams.get('code') && !userState.data) {
            userDispatch(RequestReducer.setLoading(true))
            authenticate().then((returnedUser) => {
                console.log(returnedUser)
                userDispatch(RequestReducer.setData(returnedUser))
            })
            .catch((error) => {
                userDispatch(RequestReducer.setError(error))
                if (error.response) {
                    console.log('Error Status:', error.response.status);
                    console.log('Error Data:', error.response.data);
                } else {
                    console.log('Error:', error.message);
                }
            })
        } 
        console.log(userState)
    }, [])

    const authenticate = async () => {
        return ApiController.authenticate(queryParams.get('code'), 'https%3A%2F%2Flocalhost%3A443%2Flogin')
    }

    return (
        <> 
        {        
            userState.loading &&
            <div className="centered-container">
                <Card sx={{padding: '1.5rem'}}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <Typography variant="h6">Logging in</Typography>
                        <CircularProgress/>
                    </CardContent>
                </Card>
            </div>
        }
        {        
            userState.error &&
            <div className="centered-container">
                <Card sx={{padding: '1.5rem'}}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <Typography variant="h6">Failed to login</Typography>
                        <Button 
                            variant="contained" 
                            component={Link} 
                            to={'https://accounts.google.com/o/oauth2/auth?' +
                                'client_id=851224273053-5p8dg1psgjf5ts80aqgq62crjtm4g3i1.apps.googleusercontent.com&' +
                                'redirect_uri=https://localhost:443/login&response_type=code&' +
                                'scope=https://www.googleapis.com/auth/userinfo.email&access_type=offline&prompt=consent'} 
                            >
                            Try again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        }
        {
            userState.data && 
            <div className="centered-container">
                <Card sx={{padding: '1.5rem'}}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <CardMedia
                            component="img"
                            style={{
                            width: "50%",
                            height: "auto",
                            borderRadius: "50%", 
                            }}
                            image={userState.data.picture}
                            alt="User Avatar"
                        />
                        <Typography variant="h6">Welcome {userState.data.name}</Typography>
                        <Button 
                            variant="contained" 
                            component={Link} 
                            to='/resume'
                        >
                            Continue to site
                        </Button>
                    </CardContent>
                </Card>
            </div>
        }
        {        
            !userState.data &&
            <div className="centered-container">
                <Card sx={{padding: '1.5rem'}}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <Typography variant="h6">You must login to continue</Typography>
                        <Button 
                            variant="contained" 
                            component={Link} 
                            to={'https://accounts.google.com/o/oauth2/auth?' +
                                'client_id=851224273053-5p8dg1psgjf5ts80aqgq62crjtm4g3i1.apps.googleusercontent.com&' +
                                'redirect_uri=https://localhost:443/login&response_type=code&' +
                                'scope=https://www.googleapis.com/auth/userinfo.email&access_type=offline&prompt=consent'} 
                            >
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        }
        </>
    );
}

export default Login;