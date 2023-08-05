import PropTypes from 'prop-types';
import NoBorderTable from "../../components/NoBordersTable"
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';
import { Typography } from '@mui/material';

const EducationDetails = ({ education }) => {
    let table = {};

    Object.keys(education).forEach((key) => {
        if (ignoredFields.has(key)) {
            return;
        }
        if (!education[key]) {
            return;
        }

        table[camelCaseToCapitalizedWords(key)] = education[key];
    });
    
    return(
        <>
            <NoBorderTable title={education.name} body={table}></NoBorderTable>
            { education.details &&
                <>
                    <Typography>Summary</Typography>
                    {
                        education.details.map((detail, index) => (
                            <p key={index}>{detail}</p>
                        ))
                    }
                </>
            }
        </>
    );
}

EducationDetails.propTypes = {
    education: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        details: PropTypes.array, 
    }).isRequired,
};
  

export default EducationDetails;