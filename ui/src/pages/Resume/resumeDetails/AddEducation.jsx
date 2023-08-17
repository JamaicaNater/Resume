import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ApiController } from '../../../utils/api';
import EditDialog from '../../../components/EditDialog';
import InputForm from '../../../components/InputForm';
import { useReducer, useState } from 'react';
import Education from '../../../models/Education';
import { RequestReducer } from '../../../utils/requestReducer';

const AddEducation = () => {
  const [ open, setOpen ] = useState(false);

  const [createEducationState, createEducationDispath] = useReducer(RequestReducer.reducer, RequestReducer.defaultState)

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