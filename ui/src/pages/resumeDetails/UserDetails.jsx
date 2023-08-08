import PropTypes from 'prop-types';
import NoBorderTable from "../../components/NoBordersTable"
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';
import { Chip, Typography } from '@mui/material';
import './Details.css'

const UserDetails = ({ user }) => {
    let table = {};

    Object.keys(user).forEach((key) => {
        if (ignoredFields.has(key)) {
            return;
        }
        if (!user[key]) {
            return;
        }

        table[camelCaseToCapitalizedWords(key)] = user[key];
    });
    
    return(
        <>
            <NoBorderTable body={table}></NoBorderTable>
            { 
                user.details &&
                <>
                    <Typography>Summary</Typography>
                {
                    user.details.map((detail, index) => (
                        <p key={index}>{detail}</p>
                    ))
                }
                </>
            }
            {
                user.skills && 
                <>
                {
                    user.skills.map((skill, index) => (
                        <Chip className='chip' key={index} label={skill} />
                    ))
                }
                </>
            }
        </>
    );
}

UserDetails.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired, 
        lastName: PropTypes.string.isRequired, 
        details: PropTypes.arrayOf(PropTypes.string).isRequired,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
  

export default UserDetails;