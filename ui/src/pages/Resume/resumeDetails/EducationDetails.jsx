import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import DetailsDisplay from './DetailsDisplay';
import { ApiController } from '../../../utils/api';
import PushResumeData from './PushResumeData';

const EducationDetails = ({ education }) => {
    const updateEducation = async (newData) => {
        await ApiController.updateEducatione(newData, education._id)
    }


    return(
        <div className='resume-section-div'>
            <div className='resume-section-icon-div'>
                <PushResumeData queryKey={['education']} data={education} apiCall={updateEducation} edit />
            </div>
            <div className='resume-section-content-div'>
                <Typography variant="body1">
                <Typography variant="h5">{education.name}</Typography>
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
            </div>
        </div>
    );
}

EducationDetails.propTypes = {
    education: PropTypes.shape({
        _id: PropTypes.string.isRequired,
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