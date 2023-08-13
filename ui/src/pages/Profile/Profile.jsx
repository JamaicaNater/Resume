import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="centered-container">
          <Card sx={{padding: '1.5rem'}}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <Typography variant='h3'>Profile</Typography>
                <Divider/>
                <Typography>Name: {user?.name}</Typography>
                  <Button 
                      variant="contained" 
                      component={Link} 
                      to='/resume'
                  >
                      Go back to resume
                  </Button>
              </CardContent>
          </Card>
      </div>
    );
}

export default Profile