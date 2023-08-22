import { useContext, useEffect, useReducer, useState } from "react";
import { Button, Card, CardContent, CardMedia, CircularProgress, Container, TextField, Typography } from "@mui/material"; // Using Material-UI components
import { ApiController } from "../../utils/api";
import { RequestReducer } from "../../utils/requestReducer"
import AuthContext from "../../context/AuthContext/AuthContext";
import { camelCaseToCapitalizedWords } from "../../utils/formatting";
import useRedirectFromRegister from "../../hooks/auth/useRedirectFromRegister";

const RegistrationForm = () => {
  const redirecting = useRedirectFromRegister('/resume');
  const { user, login } = useContext(AuthContext)

  const [createUserState, createUserDispath] = useReducer(RequestReducer.reducer, RequestReducer.defaultState)

  useEffect(() => {
    console.log(user)
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, [user])

  const [formData, setFormData] = useState({
    firstName: user?.given_name || "",
    lastName: user?.family_name || "",
    email: user?.email || "",
    username: user?.email?.split("@")[0] || "",
  });

  const createUser = async (event) => {
    event.preventDefault();
    createUserDispath(RequestReducer.setLoading(true));
    ApiController.register(formData, {})
    .then((response) => {
      const newUser = {...user, username: response.username, id: response._id};
      createUserDispath(RequestReducer.setData(newUser));
      login(newUser)
    })
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
    {
      redirecting ? 
      <div className="centered-container">
          <Card sx={{padding: '1.5rem'}}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <CardMedia
                      component="img"
                      style={{
                      width: "50%",
                      height: "auto",
                      borderRadius: "50%", 
                      }}
                      image={user.picture}
                      alt="User Avatar"
                  />
                  <Typography variant="h6">Welcome {user.name}</Typography>
                  <Container>
                      <Typography variant="h6">Redirecting to site</Typography>
                      <CircularProgress/>
                  </Container>
              </CardContent>
          </Card>
      </div> : 
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
    }
    </>
  );
};

export default RegistrationForm;
