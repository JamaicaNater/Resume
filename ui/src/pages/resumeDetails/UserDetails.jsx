import PropTypes from 'prop-types';
import camelCaseToCapitalizedWords from "../../utils/misc";
import { ignoredFields } from './utils';
import { Typography } from '@mui/material';
import './Details.css'
import SkillsDisplay from './TagsDisplay';

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
            <Typography variant='body1'>
            {
                user.phoneNumber && (
                <Typography>
                Phone: {user.phoneNumber}
                </Typography>
            )}
            {
                user.email && (
                <Typography>
                Email: {user.email}
                </Typography>
            )}
            </Typography>

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
                <SkillsDisplay skills={user.skills} ></SkillsDisplay>
            }
        </>
    );
}

UserDetails.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired, 
        lastName: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        details: PropTypes.arrayOf(PropTypes.string).isRequired,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
  

export default UserDetails;