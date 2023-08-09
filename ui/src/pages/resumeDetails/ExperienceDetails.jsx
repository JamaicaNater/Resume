import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import './Details.css'
import SkillsDisplay from './TagsDisplay';
import DetailsDisplay from './DetailsDisplay';

const ExperienceDetails = ({ experience }) => {
    return(
        <>
            <Typography variant='h5' gutterBottom>
                {experience.name}
            {
                experience.position && (
                <Typography sx = {{fontStyle: 'italic',}}>
                {experience.position}
                </Typography>
            )}
            </Typography>
            { 
                experience.details &&
                <DetailsDisplay details={experience.details} />
            }
            {
                experience.tags && 
                <SkillsDisplay skills={experience.tags} ></SkillsDisplay>
            }
        </>
    );
}

ExperienceDetails.propTypes = {
    experience: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        position: PropTypes.string.isRequired,
        details: PropTypes.arrayOf(PropTypes.string).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired, 
    }).isRequired,
};
  

export default ExperienceDetails;