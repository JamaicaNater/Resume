// Home.js
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "../pages.css"

const HomePage = () => {
  return (
          <div className="centered-container">
            <Card sx={{padding: '1.5rem'}}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <Typography variant='h2'>Dynamic Resu.me</Typography>
                    <Button 
                        variant="contained" 
                        component={Link} 
                        to='/resume'
                    >
                        Get Started
                    </Button>
                </CardContent>
            </Card>
        </div>
  );
};

export default HomePage;
