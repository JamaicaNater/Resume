import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditDialog from '../../../components/EditDialog';
import InputForm from '../../../components/InputForm';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { PropTypes } from 'prop-types';


const PushResumeData = ({queryKey, data, apiCall, edit}) => {
  const { mutate, isLoading, error } = useMutation({ 
      queryKey: queryKey,
      mutationFn: apiCall,
    });

  const queryClient = useQueryClient();

  const [ open, setOpen ] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const createData = async (data) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey)
        closeDialog();
      },
    })
  };

  return (
    <>
      <IconButton onClick={openDialog}>
        { 
          edit && 
          <EditIcon sx={{fontSize: '1rem'}} />
          || 
          <>
            <Typography>Add More</Typography>
            <AddIcon />
          </>
        }
      </IconButton>
      <EditDialog open={open} setClose={closeDialog} >
        <InputForm 
          formData={data} 
          onSubmit={createData} 
          ignoredFields={new Set(['__v', '_id', 'userId'])} 
          loading={isLoading} 
          error={error}
        />
      </EditDialog>
    </>
  )
}

PushResumeData.propTypes = {
  queryKey: PropTypes.array.isRequired,
  data: PropTypes.any.isRequired,
  apiCall: PropTypes.func.isRequired,
  edit: PropTypes.bool
}

export default PushResumeData;