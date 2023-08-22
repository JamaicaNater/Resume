import { Card, CardContent, CardMedia, CircularProgress, Container, Typography } from "@mui/material"
import "../pages.css"
import { ApiController } from "../../utils/api";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import useRedirectFromLogin from "../../hooks/auth/useRedirectFromLogin";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const redirecting = useRedirectFromLogin('/resume');

    const navigate = useNavigate()

    const { user, login } = useContext(AuthContext);

    return (
        <> 
        {
            redirecting && 
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
                        <Container>
                            <Typography variant="h6">Redirecting to site</Typography>
                            <CircularProgress/>
                        </Container>
                    </CardContent>
                </Card>
            </div>
        }
        {        
            !user &&
            <div className="centered-container">
                <Card sx={{padding: '1.5rem'}}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <CardMedia
                            component="img"
                            image={'/logo/DynamicResumeLogoWithWords.png'}
                            alt="Logo"
                        />
                        <Typography variant="h3">Welcome to Dynamic Resume</Typography>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                try {
                                    ApiController.authenticate(credentialResponse.credential).then((user) => login(user))
                                    .catch(error => {
                                        if (error.response.status === 404) {
                                            login(error.response.data)
                                            navigate('/register')
                                        }
                                    })
                                } catch (error) {
                                    console.error("Error decoding JWT:", error);
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                        />
                    </CardContent>
                </Card>
            </div>
        }
        </>
    );
}

export default Login;