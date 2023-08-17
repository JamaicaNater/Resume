import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ApiController } from '../../../utils/api';
import EditDialog from '../../../components/EditDialog';
import InputForm from '../../../components/InputForm';
import { useContext, useReducer, useState } from 'react';
import Experience from '../../../models/Experience';
import { RequestReducer } from '../../../utils/requestReducer';
import ResumeContext from '../../../context/ResumeContext/ResumeContext';
import useResumeParams from '../../../hooks/useResumeParams';

const AddExperience = () => {
  const [ open, setOpen ] = useState(false);

  const [createExperienceState, createExperienceDispath] = useReducer(RequestReducer.reducer, RequestReducer.defaultState)

  const { experienceDispatch } = useContext(ResumeContext);

  const {params} = useResumeParams();

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const createExperience = async (data) => {
    createExperienceDispath(RequestReducer.setLoading(true));
    ApiController.createExperience(data)
      .then((response) => {
        console.log(response);
        createExperienceDispath(RequestReducer.setData(response));

        experienceDispatch(RequestReducer.setLoading(true));
        ApiController.getExperience(params)
          .then((experience) => experienceDispatch(RequestReducer.setData(experience)))
          .catch((error) => experienceDispatch(RequestReducer.setError(error)))
        closeDialog();
      })
      .catch((error) => {
        console.log(error)
        createExperienceDispath(RequestReducer.setError(error));
      })
  };


  return (
    <>
      <IconButton onClick={openDialog}>
        <Typography>Add More</Typography>
        <AddIcon />
      </IconButton>
      <EditDialog open={open} setClose={closeDialog} >
        <InputForm 
          formData={new Experience()} 
          onSubmit={createExperience} 
          ignoredFields={new Set(['__v', '_id'])} 
          loading={createExperienceState.loading} 
          error={createExperienceState.error}
        />
      </EditDialog>
    </>
  )
}

export default AddExperience;