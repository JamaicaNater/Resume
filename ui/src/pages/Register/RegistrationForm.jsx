import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Typography } from "@mui/material"; // Using Material-UI components
import { ApiController } from "../../utils/api";
import { RequestReducer } from "../../utils/requestReducer"
import AuthContext from "../../context/AuthContext/AuthContext";
import InputForm from "../../components/InputForm";

const RegistrationForm = () => {
   const { user, login } = useContext(AuthContext)

   const [createUserState, createUserDispath] = useReducer(RequestReducer.reducer, RequestReducer.defaultState)

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
    username: "",
  });

  const navigate = useNavigate();

  const createUser = async (data) => {
    createUserDispath(RequestReducer.setLoading(true));
    ApiController.createUser(data)
    .then((response) => {
      const newUser = {...user, username: response.username, id: response._id};
      createUserDispath(RequestReducer.setData(newUser));
      login(newUser)
      navigate('/resume')
    } )
    .catch((error) => {
      console.log(error)
      createUserDispath(RequestReducer.setError(error));
    })
  };


  return (
    <>
      <Typography variant="h5">Create an Account</Typography>
      <InputForm 
        formData={formData} 
        setFormData={setFormData}
        onSubmit={createUser}
        loading={createUserState.loading}
        error={createUserState.error}
        disabledFields={new Set(['email'])}
        requiredFields={new Set(Object.keys(formData))}
      />
    </>
  );
};

export default RegistrationForm;
