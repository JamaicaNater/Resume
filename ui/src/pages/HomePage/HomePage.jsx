// Home.js
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
          <div className="centered-container">
            <Card sx={{padding: '1.5rem'}}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <Typography variant='h2'>Dynamic Resu.me</Typography>
                    <Button 
                        variant="contained" 
                        component={Link} 
                        to='/login'
                    >
                        Get Started
                    </Button>
                </CardContent>
            </Card>
        </div>
  );
};

export default HomePage;
