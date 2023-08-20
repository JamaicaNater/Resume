import { Card, CardMedia, Divider, Typography } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import "../pages.css"

const Register = () => {
    return (
        <>
            <div className="centered-container">
                <Card className="card" >
                    <CardMedia
                        component="img"
                        image={'/logo/DynamicResumeLogoWithWords.png'}
                        alt="Logo"
                    />
                    <Typography variant="h4">First time? Lets get you registered.</Typography>
                    <Divider style={{marginBottom: '1rem'}}/>
                    <RegistrationForm/>
                </Card>
            </div>
        </>
    )
}

export default Register;