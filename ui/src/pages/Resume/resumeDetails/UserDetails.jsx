import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import './Details.css'
import TagsDisplay from './TagsDisplay';
import DetailsDisplay from './DetailsDisplay';
import EditDialog from '../../../components/EditDialog';
import { useState } from 'react';
import InputForm from '../../../components/InputForm';

const UserDetails = ({ user }) => {   
    const [editOpen, setEditOpen] = useState(false);

    const [editedUser, setEditedUser] = useState(user)

    return(
        <>
            {/* <EditIcon className='edit-icon' fontSize='small' onClick={()=>{setEditOpen(true)}} />
            <EditDialog open={editOpen} setClose={() => {setEditOpen(false)}} >
                <InputForm formData={editedUser} setFormData={setEditedUser} onSubmit={()=>{}} ignoredFields={new Set(['username', '__v', '_id'])}></InputForm>
            </EditDialog> */}
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
                <DetailsDisplay details={user.details} />
            }
            {
                user.skills && 
                <TagsDisplay skills={user.skills} ></TagsDisplay>
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
        details: PropTypes.arrayOf(PropTypes.string),
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
  

export default UserDetails;