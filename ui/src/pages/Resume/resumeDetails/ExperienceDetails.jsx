import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import './Details.css'
import TagsDisplay from './TagsDisplay';
import DetailsDisplay from './DetailsDisplay';
import PushResumeData from './PushResumeData';
import { ApiController } from '../../../utils/api';

const ExperienceDetails = ({ experience }) => {
    const updateExperience = async (newData) => {
        await ApiController.updateExperience(newData, experience._id)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ alignSelf: 'flex-end', marginTop: '-1rem' }}>
            <PushResumeData queryKey={['experience']} data={experience} apiCall={updateExperience} edit />
          </div>
          <div style={{ textAlign: 'center', marginTop: '-1.5rem' }}>
            <Typography variant='h5' gutterBottom>
              {experience.name}
              {experience.position && (
                <Typography sx={{ fontStyle: 'italic' }}>{experience.position}</Typography>
              )}
            </Typography>
            {experience.details && <DetailsDisplay details={experience.details} />}
            {experience.tags && <TagsDisplay skills={experience.tags} />}
          </div>
        </div>
      );
    };

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