import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import DetailsDisplay from './DetailsDisplay';

const EducationDetails = ({ education }) => {   
    return(
        <>
            <Typography variant="body1">
                {`
                Major: ${education.major} 
                ${education.minor ? `- Minor: ${education.minor}` : ''} 
                - ${education.degreeType}
                ${education.gpa ? `- GPA: ${education.gpa}` : ''}
                `}
                <br />
                {`
                ${education.enrollmentDate}
                ${education.graduationDate ? ` - ${education.graduationDate}` : ' - Present'}
                `}
                <br />
                {`
                ${education.city ? education.city: ''}
                ${education.state ? education.state: ''}
                ${education.country ? education.country: ''}
                `}
            </Typography>
            { education.details &&
                <DetailsDisplay details={education.details} />
            }
        </>
    );
}

EducationDetails.propTypes = {
    education: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        details: PropTypes.array,
        major: PropTypes.string.isRequired,
        degreeType: PropTypes.string.isRequired,
        minor: PropTypes.string,
        gpa: PropTypes.number,
        enrollmentDate: PropTypes.string.isRequired,
        graduationDate: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
    }).isRequired,
};
  

export default EducationDetails;