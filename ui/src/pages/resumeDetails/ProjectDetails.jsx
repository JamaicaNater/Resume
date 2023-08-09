import PropTypes from 'prop-types';
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';
import { Typography } from '@mui/material';
import './Details.css'
import SkillsDisplay from './TagsDisplay';

const ProjectDetails = ({ project }) => {
    let table = {};

    Object.keys(project).forEach((key) => {
        if (ignoredFields.has(key)) {
            return;
        }
        if (!project[key]) {
            return;
        }

        table[camelCaseToCapitalizedWords(key)] = project[key];
    });
    
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
                <>
                    <Typography>Summary</Typography>
                    {
                        project.details.map((detail, index) => (
                            <p key={index}>{detail}</p>
                        ))
                    }
                </>
            }
            {
                project.tags && 
                <SkillsDisplay skills={project.tags} ></SkillsDisplay>
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