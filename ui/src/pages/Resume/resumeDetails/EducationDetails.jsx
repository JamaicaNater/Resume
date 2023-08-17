import PropTypes from 'prop-types';
import { Divider, Typography } from '@mui/material';
import DetailsDisplay from './DetailsDisplay';
import { useState } from 'react';
import { ApiController } from '../../../utils/api';
import EditDialog from '../../../components/EditDialog';
import InputForm from '../../../components/InputForm';

const EducationDetails = ({ education }) => {
    const editAddMenuInitialState = {
        isOpen: false,
        apiRequest: () => {}
    }

    const [addEditMenu, setAddEditMenu] = useState(editAddMenuInitialState);

    const closeEditAddMenu = () => {
        setAddEditMenu(editAddMenuInitialState)
    }

    return(
        <>
            <Typography variant="body1">
                <Typography variant="h5">{education.name}</Typography>
                {`
                Major: ${education.major} 
                ${education.minor ? `- Minor: ${education.minor}` : ''} 
                - ${education.degreeType}
                ${education.gpa ? `- GPA: ${education.gpa}` : ''}
                `}
                <br />
                {`
                ${education.enrollmentDate}
                ${education.graduationDate ? ` - ${education.graduationDate}` : ' - Present'}
                `}
                <br />
                {`
                ${education.city ? education.city: ''}
                ${education.state ? education.state: ''}
                ${education.country ? education.country: ''}
                `}
            </Typography>
            { education.details &&
                <DetailsDisplay details={education.details} />
            }
            <EditDialog open={addEditMenu.isOpen} setClose={closeEditAddMenu} >
                {/* <InputForm formData={editedUser} setFormData={setEditedUser} ignoredFields={new Set(['username', '__v', '_id'])}></InputForm> */}
            </EditDialog>
        </>
    );
}

EducationDetails.propTypes = {
    education: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        details: PropTypes.array,
        major: PropTypes.string.isRequired,
        degreeType: PropTypes.string.isRequired,
        minor: PropTypes.string,
        gpa: PropTypes.number,
        enrollmentDate: PropTypes.string.isRequired,
        graduationDate: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
    }).isRequired,
};
  

export default EducationDetails;