import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import './Details.css'
import SkillsDisplay from './TagsDisplay';
import DetailsDisplay from './DetailsDisplay';

const UserDetails = ({ user }) => {   
    return(
        <>
            <Typography variant='body1'>
            {
                user.phoneNumber && (
                <Typography>
                Phone: {user.phoneNumber}
                </Typography>
            )}
            {
                user.email && (
                <Typography>
                Email: {user.email}
                </Typography>
            )}
            </Typography>

            { 
                user.details &&
                <DetailsDisplay details={user.details} />
            }
            {
                user.skills && 
                <SkillsDisplay skills={user.skills} ></SkillsDisplay>
            }
        </>
    );
}

UserDetails.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired, 
        lastName: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        details: PropTypes.arrayOf(PropTypes.string).isRequired,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
  

export default UserDetails;