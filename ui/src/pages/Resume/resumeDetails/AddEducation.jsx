import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ApiController } from '../../../utils/api';
import EditDialog from '../../../components/EditDialog';
import InputForm from '../../../components/InputForm';
import { useContext, useReducer, useState } from 'react';
import Education from '../../../models/Education';
import { RequestReducer } from '../../../utils/requestReducer';
import ResumeContext from '../../../context/ResumeContext/ResumeContext';
import useResumeParams from '../../../hooks/useResumeParams';

const AddEducation = () => {
  const [ open, setOpen ] = useState(false);

  const [createEducationState, createEducationDispath] = useReducer(RequestReducer.reducer, RequestReducer.defaultState)

  const { educationDispatch } = useContext(ResumeContext);

  const params = useResumeParams();

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const createEducation = async (data) => {
    createEducationDispath(RequestReducer.setLoading(true));
    ApiController.createEducation(data)
      .then((response) => {
        console.log(response);
        createEducationDispath(RequestReducer.setData(response));

        educationDispatch(RequestReducer.setLoading(true));
        ApiController.getEducation(params)
          .then((education) => educationDispatch(RequestReducer.setData(education)))
          .catch((error) => educationDispatch(RequestReducer.setError(error)))
        closeDialog();
      })
      .catch((error) => {
        console.log(error)
        createEducationDispath(RequestReducer.setError(error));
      })
  };


  return (
    <>
      <IconButton onClick={openDialog}>
        <Typography>Add More</Typography>
        <AddIcon />
      </IconButton>
      <EditDialog open={open} setClose={closeDialog} >
        <InputForm formData={new Education()} onSubmit={createEducation} ignoredFields={new Set(['__v', '_id'])} loading={createEducationState.loading} error={createEducationState.error}></InputForm>
      </EditDialog>
    </>
  )
}

export default AddEducation;