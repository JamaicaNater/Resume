import PropTypes from 'prop-types';
import NoBorderTable from "../../components/NoBordersTable"
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';
import { Typography } from '@mui/material';

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
            <NoBorderTable title={experience.name} body={table}></NoBorderTable>
            { experience.details &&
                <>
                    <Typography>Summary</Typography>
                    {
                        experience.details.map((detail, index) => (
                            <p key={index}>{detail}</p>
                        ))
                    }
                </>
            }
        </>
    );
}

ExperienceDetails.propTypes = {
    experience: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        details: PropTypes.array, 
    }).isRequired,
};
  

export default ExperienceDetails;