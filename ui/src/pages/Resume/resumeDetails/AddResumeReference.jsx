import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ApiController } from '../../../utils/api';
import EditDialog from '../../../components/EditDialog';
import InputForm from '../../../components/InputForm';
import { useContext, useReducer, useState } from 'react';
import Reference from '../../../models/Reference';
import { RequestReducer } from '../../../utils/requestReducer';
import ResumeContext from '../../../context/ResumeContext/ResumeContext';
import useResumeParams from '../../../hooks/useResumeParams';

const AddResumeReference = () => {
  const [ open, setOpen ] = useState(false);

  const [createReferenceState, createReferenceDispath] = useReducer(RequestReducer.reducer, RequestReducer.defaultState)

  const { referenceDispatch } = useContext(ResumeContext);

  const {params} = useResumeParams();

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const createReference = async (data) => {
    createReferenceDispath(RequestReducer.setLoading(true));
    ApiController.createReference(data)
      .then((response) => {
        console.log(response);
        createReferenceDispath(RequestReducer.setData(response));

        referenceDispatch(RequestReducer.setLoading(true));
        ApiController.getReferences(params)
          .then((Reference) => referenceDispatch(RequestReducer.setData(Reference)))
          .catch((error) => referenceDispatch(RequestReducer.setError(error)))
        closeDialog();
      })
      .catch((error) => {
        console.log(error)
        createReferenceDispath(RequestReducer.setError(error));
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
          formData={new Reference()} 
          onSubmit={createReference} 
          ignoredFields={new Set(['__v', '_id'])} 
          loading={createReferenceState.loading} 
          error={createReferenceState.error}
        />
      </EditDialog>
    </>
  )
}

export default AddResumeReference;