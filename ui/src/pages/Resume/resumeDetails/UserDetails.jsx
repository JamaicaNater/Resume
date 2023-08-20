import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import './Details.css'
import DetailsDisplay from './DetailsDisplay';
import PushResumeData from './PushResumeData';
import { ApiController } from '../../../utils/api';
import TagsFilter from './TagsFilter';

const UserDetails = ({ user }) => {   
    const updateSelf = async (user) => {
        await ApiController.updateMe(user)
    }
    return(
        <div className='resume-section-div'>
            <div className='resume-section-icon-div'>
                <PushResumeData queryKey={['user']} data={user} apiCall={updateSelf} edit />
            </div>
            <div className='resume-section-content-div'>
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

            { user.details && <DetailsDisplay details={user.details} />}
            { user.skills && <TagsFilter tags={user.skills} />}
            </div>
        </div>
    );
}

UserDetails.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired, 
        lastName: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        details: PropTypes.arrayOf(PropTypes.string),
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
  

export default UserDetails;