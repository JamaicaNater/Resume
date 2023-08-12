import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useLocation } from 'react-router-dom';
import "./Login.css"
import { ApiController } from "../../utils/api";
import { useEffect, useState } from "react";

const Login = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (queryParams.get('code') && !user) {
            authenticate().then((returnedUser) => {
                setUser(returnedUser)
                console.log(returnedUser)
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }, [])

    const authenticate = async () => {
        return ApiController.authenticate(queryParams.get('code'), 'https%3A%2F%2Flocalhost%3A443%2Flogin')
    }

    return (
        <> 
        {
            user && 
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
                            image={user.picture}
                            alt="User Avatar"
                        />
                        <Typography variant="h6">Welcome {user.name}</Typography>
                        <Button 
                            variant="contained" 
                            component={Link} 
                            to='/resume'
                            target="_blank">
                            Continue to site
                        </Button>
                    </CardContent>
                </Card>
            </div>
        }
        {        
            !user &&
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