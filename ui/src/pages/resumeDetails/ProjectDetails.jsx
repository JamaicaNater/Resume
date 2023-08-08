import PropTypes from 'prop-types';
import NoBorderTable from "../../components/NoBordersTable"
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';
import { Chip, Typography } from '@mui/material';
import './Details.css'

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
            <NoBorderTable title={project.name} body={table}></NoBorderTable>
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
                <>
                {
                    project.tags.map((tag, index) => (
                        <Chip className='chip' key={index} label={tag} />
                    ))
                }
                </>
            }
        </>
    );
}

ProjectDetails.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        details: PropTypes.arrayOf(PropTypes.string).isRequired, 
        tags: PropTypes.arrayOf(PropTypes.string).isRequired, 
    }).isRequired,
};
  

export default ProjectDetails;