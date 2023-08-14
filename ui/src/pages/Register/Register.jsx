import { Card, Divider, Typography } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import "../pages.css"

const Register = () => {
    return (
        <>
            <div className="centered-container">
                <Card className="card" >
                    <Typography variant="h4">First time? Lets get you registered.</Typography>
                    <Divider/>
                    <RegistrationForm/>
                </Card>
            </div>
        </>
    )
}

export default Register;