import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const ReferenceDetails = ({ reference }) => {    
    return(
        <>
            <Typography variant='body1'>
            {
                reference.phoneNumber && (
                <Typography>
                Phone: {reference.phoneNumber}
                </Typography>
            )}
            {
                reference.email && (
                <Typography>
                Email: {reference.email}
                </Typography>
            )}
            {
                reference.relationship && (
                <Typography>
                Relationship: {reference.relationship}
                </Typography>
            )}
            </Typography>
        </>
    );
}

ReferenceDetails.propTypes = {
    reference: PropTypes.shape({
        firstName: PropTypes.string.isRequired, 
        lastName: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        relationship: PropTypes.string,
    }).isRequired,
};
  

export default ReferenceDetails;