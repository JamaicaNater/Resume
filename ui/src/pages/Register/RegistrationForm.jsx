import { useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, CircularProgress } from "@mui/material"; // Using Material-UI components
import { ApiController } from "../../utils/api";
import { RequestReducer } from "../../utils/requestReducer";

const RegistrationForm = () => {
  const debug = async () => {
    try {
      await ApiController.getUsers(formData)
    } catch (error) {
        console.error(error.message)
    }   
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [createdUserState, createdUserDispatch] = useReducer(RequestReducer.reducer, {
    data: null,
    loading: null,
    error: null
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createUser = async () => {
    try {
        createdUserDispatch(RequestReducer.setLoading(true))
        let createdUser = await ApiController.createUser(formData)
        createdUserDispatch(RequestReducer.setData(createdUser))
        navigate('/resume')
    } catch (error) {
        createdUserDispatch(RequestReducer.setError(error))
        console.error(error.message)
    }   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createUser()
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">Create an Account</Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {
        createdUserState.loading && <CircularProgress/> ||
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: '1rem'}}>
          Create Account
        </Button>
      }
      <Button variant="contained" onClick={debug} color="primary" sx={{marginTop: '1rem'}}>
          debug
        </Button>
      {
        createdUserState.error && 
        <>
          <Typography color={'red'}>Error: {createdUserState.error?.response?.data?.error}</Typography>
        </>
      }
    </form>
  );
};

export default RegistrationForm;
