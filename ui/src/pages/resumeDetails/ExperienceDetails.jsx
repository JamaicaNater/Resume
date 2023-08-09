import PropTypes from 'prop-types';
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';
import { Typography } from '@mui/material';
import './Details.css'
import SkillsDisplay from '../../components/SKillsDisplay';

const ExperienceDetails = ({ experience }) => {
    let table = {};

    Object.keys(experience).forEach((key) => {
        if (ignoredFields.has(key)) {
            return;
        }
        if (!experience[key]) {
            return;
        }

        table[camelCaseToCapitalizedWords(key)] = experience[key];
    });
    
    return(
        <>
            <Typography variant='h5' gutterBottom>
                {experience.name}
            </Typography>
            <Typography variant='body1'>
            {
                experience.position && (
                <Typography>
                {experience.position}
                </Typography>
            )}
            </Typography>
            { 
                experience.details &&
                <>
                    <Typography>Summary</Typography>
                    {
                        experience.details.map((detail, index) => (
                            <p key={index}>{detail}</p>
                        ))
                    }
                </>
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