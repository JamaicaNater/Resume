import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { ApiController } from '../../../utils/api';
import PushResumeData from './PushResumeData';

const ReferenceDetails = ({ reference }) => {
    const updateReference = async (newData) => {
        await ApiController.updateReference(newData, reference._id)
    }


    return(
        <div className='resume-section-div'>
            <div className='resume-section-icon-div'>
                <PushResumeData queryKey={['references']} data={reference} apiCall={updateReference} edit />
            </div>
            <div className='resume-section-content-div'>
                <Typography variant="body1">
                {reference.firstName} {reference.lastName}
                {reference.email && <Typography>Email: {reference.email}</Typography>}
                {reference.phoneNumber && <Typography>Phone: {reference.phoneNumber}</Typography>}
                {reference.relationship && <Typography>Relationship: {reference.relationship}</Typography>}
                </Typography>
            </div>
        </div>
    );
}

ReferenceDetails.propTypes = {
    reference: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired, 
        lastName: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        relationship: PropTypes.string,
    }).isRequired,
};
  

export default ReferenceDetails;