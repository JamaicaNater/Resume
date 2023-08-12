import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import './Details.css'
import TagsDisplay from './TagsDisplay';
import DetailsDisplay from './DetailsDisplay';

const ProjectDetails = ({ project }) => {   
    return(
        <>
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
            { 
                project.details &&
                <DetailsDisplay details={project.details} />
            }
            {
                project.tags && 
                <TagsDisplay skills={project.tags} />
            }
        </>
    );
}

ProjectDetails.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        link: PropTypes.string,
        details: PropTypes.arrayOf(PropTypes.string).isRequired, 
        tags: PropTypes.arrayOf(PropTypes.string).isRequired, 
    }).isRequired,
};
  

export default ProjectDetails;