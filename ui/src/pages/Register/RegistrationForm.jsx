import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Typography } from "@mui/material"; // Using Material-UI components
import { ApiController } from "../../utils/api";
import AuthContext from "../../context/AuthContext/AuthContext";
import InputForm from "../../components/InputForm";

const RegistrationForm = () => {
   const { user, login } = useContext(AuthContext)

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

  const onSucessfulSubmission = (createdData) => {
    const newUser = {...user, username: createdData.username, id: createdData._id};
    login(newUser)
    navigate('/resume')
  }

  return (
    <>
      <Typography variant="h5">Create an Account</Typography>
      <InputForm 
        formData={formData} 
        setFormData={setFormData} 
        apiRequest={ApiController.createUser}
        onSucessfulSubmission = {onSucessfulSubmission}
        disabledFields={new Set(['email'])}
        requiredFields={new Set(Object.keys(formData))}
      />
    </>
  );
};

export default RegistrationForm;
