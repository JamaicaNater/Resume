import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ApiController } from '../../../utils/api';
import EditDialog from '../../../components/EditDialog';
import InputForm from '../../../components/InputForm';
import { useContext, useReducer, useState } from 'react';
import Project from '../../../models/Project';
import { RequestReducer } from '../../../utils/requestReducer';
import ResumeContext from '../../../context/ResumeContext/ResumeContext';
import useResumeParams from '../../../hooks/useResumeParams';

const AddProject = () => {
  const [ open, setOpen ] = useState(false);

  const [createProjectState, createProjectDispath] = useReducer(RequestReducer.reducer, RequestReducer.defaultState)

  const { projectDispatch } = useContext(ResumeContext);

  const {params} = useResumeParams();

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const createProject = async (data) => {
    createProjectDispath(RequestReducer.setLoading(true));
    ApiController.createProject(data)
      .then((response) => {
        console.log(response);
        createProjectDispath(RequestReducer.setData(response));

        projectDispatch(RequestReducer.setLoading(true));
        ApiController.getProjects(params)
          .then((Project) => projectDispatch(RequestReducer.setData(Project)))
          .catch((error) => projectDispatch(RequestReducer.setError(error)))
        closeDialog();
      })
      .catch((error) => {
        console.log(error)
        createProjectDispath(RequestReducer.setError(error));
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
          formData={new Project()} 
          onSubmit={createProject} 
          ignoredFields={new Set(['__v', '_id'])} 
          loading={createProjectState.loading} 
          error={createProjectState.error}
        />
      </EditDialog>
    </>
  )
}

export default AddProject;