import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress, TextField, Typography } from "@mui/material"; // Using Material-UI components
import { ApiController } from "../../utils/api";
import { RequestReducer } from "../../utils/requestReducer"
import AuthContext from "../../context/AuthContext/AuthContext";
import InputForm from "../../components/InputForm";
import { camelCaseToCapitalizedWords } from "../../utils/formatting";

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
    email: user.email,
    username: "",
  });

  const navigate = useNavigate();

  const createUser = async (data) => {
    createUserDispath(RequestReducer.setLoading(true));
    ApiController.register(data)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <>
      <Typography variant="h5">Create an Account</Typography>
      <form onSubmit={createUser} style={{ display: "flex", flexDirection: "column" }}>
      {
        Object.keys(formData).map((key, index) => 
            <TextField 
              sx={{ marginBottom: '.5rem'}}
              key={index}
              label={camelCaseToCapitalizedWords(key)}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              disabled={['email'].includes(key)}
            />
          )
      }
      {
        createUserState.loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50px' }}>
            <CircularProgress />
          </div>
        ) : (
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
            Submit
          </Button>
        )
      }
      {
        createUserState.error &&
        <>
          <Typography color={'red'}>Error: {createUserState.error?.response?.data?.error}</Typography>
        </>
      }
      </form>
    </>
  );
};

export default RegistrationForm;
