import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, CircularProgress } from "@mui/material"; // Using Material-UI components
import { ApiController } from "../../utils/api";
import { RequestReducer } from "../../utils/requestReducer";
import AuthContext from "../../context/AuthContext/AuthContext";
import useLoginRedirect from "../../hooks/auth/useLoginRedirect";

const RegistrationForm = () => {
   const { user } = useContext(AuthContext)
  
  // This page should only be access by an authenticated User
  const redirecting = useLoginRedirect()

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, [user])

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
        disabled
      />
      {
        createdUserState.loading && <CircularProgress/> ||
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: '1rem'}}>
          Create Account
        </Button>
      }
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
