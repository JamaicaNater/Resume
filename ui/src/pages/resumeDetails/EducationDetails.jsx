import PropTypes from 'prop-types';
import NoBorderTable from "../../components/NoBordersTable"
import camelCaseToCapitalizedWords from "../../utils/misc";
import { Typography } from '@mui/material';

const EducationDetails = ({education}) => {
    const ignored = new Set(['userId', '_id', 'summary', 'name'])

    let table = {};
    console.log(education);
    if (education == null) {
        console.error('Education is required');
    } else {
        Object.keys(education).forEach((key) => {
            if (ignored.has(key)) {
                return;
            }
            if (table[key] === null) {
                return;
            }

            table[camelCaseToCapitalizedWords(key)] = education[key];
        });
    }
    
    return(
        <>
            <NoBorderTable title={education.name} body={table}></NoBorderTable>
            { education.summary &&
                <>
                    <Typography>Summary</Typography>
                    <p>{education.summary}</p>
                </>
            }
        </>
    );
}

EducationDetails.propTypes = {
    education: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        summary: PropTypes.string, 
    }).isRequired,
};
  

export default EducationDetails;