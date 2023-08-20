import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import './Details.css'
import TagsDisplay from './TagsDisplay';
import DetailsDisplay from './DetailsDisplay';
import PushResumeData from './PushResumeData';
import { ApiController } from '../../../utils/api';
import DeleteResumeData from './DeleteResumeData';
import useResumeParams from '../../../hooks/useResumeParams';

const ProjectDetails = ({ project }) => { 
    const { canEdit } = useResumeParams();

    const updateProject = async (newData) => {
        await ApiController.updateProject(newData, project._id)
    }

    const deleteProject = async () => {
        await ApiController.deleteProject(project._id);
    }

    return(
        <div className={canEdit ? 'resume-section-div': ''}>
            <div className={canEdit ? 'resume-section-icon-div' : ''}>
                {
                canEdit && <>
                    <PushResumeData queryKey={['projects']} data={project} apiCall={updateProject} edit />
                    <DeleteResumeData queryKey={['projects']} apiCall={deleteProject}/>
                </>
                }
            </div>
            <div className={canEdit ? 'resume-section-content-div' : ''}>
                <Typography variant='h5'>
            {
                project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.name}
                </a>
            ) : (
                project.name
            )}
            </Typography>
            { project.details && <DetailsDisplay details={project.details} /> }
            { project.tags && <TagsDisplay skills={project.tags} /> }
            </div>
        </div>
    );
}

ProjectDetails.propTypes = {
    project: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired, 
        link: PropTypes.string,
        details: PropTypes.arrayOf(PropTypes.string).isRequired, 
        tags: PropTypes.arrayOf(PropTypes.string).isRequired, 
    }).isRequired,
};
  

export default ProjectDetails;