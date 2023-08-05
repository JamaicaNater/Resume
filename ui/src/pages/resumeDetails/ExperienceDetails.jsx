import PropTypes from 'prop-types';
import NoBorderTable from "../../components/NoBordersTable"
import camelCaseToCapitalizedWords from "../../utils/misc";
import { Typography } from '@mui/material';

const ExperienceDetails = ({experience}) => {
    const ignored = new Set(['userId', '_id', 'details', 'name', 'tags'])

    let table = {};
    console.log(experience);
    if (experience == null) {
        console.error('Experience is required');
    } else {
        Object.keys(experience).forEach((key) => {
            if (ignored.has(key)) {
                return;
            }
            if (table[key] === null) {
                return;
            }

            table[camelCaseToCapitalizedWords(key)] = experience[key];
        });
    }
    
    return(
        <>
            <NoBorderTable title={experience.name} body={table}></NoBorderTable>
            { experience.details &&
                <>
                    <Typography>Summary</Typography>
                    <p>{experience.details}</p>
                </>
            }
        </>
    );
}

ExperienceDetails.propTypes = {
    experience: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        details: PropTypes.string, 
    }).isRequired,
};
  

export default ExperienceDetails;