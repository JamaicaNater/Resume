import PropTypes from 'prop-types';
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';
import { Typography } from '@mui/material';

const EducationDetails = ({ education }) => {
    let table = {};

    Object.keys(education).forEach((key) => {
        if (ignoredFields.has(key)) {
            return;
        }
        if (!education[key]) {
            return;
        }

        table[camelCaseToCapitalizedWords(key)] = education[key];
    });
    
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
                <>
                    <Typography>Summary</Typography>
                    {
                        education.details.map((detail, index) => (
                            <p key={index}>{detail}</p>
                        ))
                    }
                </>
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