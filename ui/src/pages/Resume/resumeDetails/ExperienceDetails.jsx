import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import './Details.css'
import TagsDisplay from './TagsDisplay';
import DetailsDisplay from './DetailsDisplay';
import PushResumeData from './PushResumeData';
import { ApiController } from '../../../utils/api';
import DeleteResumeData from './DeleteResumeData';
import useResumeParams from '../../../hooks/useResumeParams';

const ExperienceDetails = ({ experience }) => {
    const { canEdit } = useResumeParams();

    const updateExperience = async (newData) => {
        await ApiController.updateExperience(newData, experience._id)
    }

    const deleteExperience = async () => {
        await ApiController.deleteExperience(experience._id);
    }

    return (
        <div className={canEdit ? 'resume-section-div' : ''}>
            <div className={canEdit ? 'resume-section-icon-div' : ''}>
            {
                canEdit && 
                <>
                    <PushResumeData queryKey={['experience']} data={experience} apiCall={updateExperience} edit />
                    <DeleteResumeData queryKey={['experience']} apiCall={deleteExperience}/>
                </>
            }
            </div>
            <div className={canEdit ? 'resume-section-content-div' : ''}>
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