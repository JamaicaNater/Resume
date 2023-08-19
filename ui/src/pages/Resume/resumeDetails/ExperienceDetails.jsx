import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import './Details.css'
import TagsDisplay from './TagsDisplay';
import DetailsDisplay from './DetailsDisplay';
import PushResumeData from './PushResumeData';
import { ApiController } from '../../../utils/api';

const ExperienceDetails = ({ experience }) => {
    const updateExperience = (newData) => {
        ApiController.updateExperience(newData, experience._id)
    }

    return(
        <>
            <PushResumeData queryKey={['experience']} data={experience} apiCall={updateExperience} edit/>
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
                <TagsDisplay skills={experience.tags} ></TagsDisplay>
            }
        </>
    );
}

ExperienceDetails.propTypes = {
    experience: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired, 
        position: PropTypes.string.isRequired,
        details: PropTypes.arrayOf(PropTypes.string).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired, 
    }).isRequired,
};
  

export default ExperienceDetails;