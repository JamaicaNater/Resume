import { useReducer } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material"; // Using Material-UI components
import { ApiController } from "../utils/api";
import { RequestReducer } from "../utils/requestReducer";
import { camelCaseToCapitalizedWords } from "../utils/formatting";
import { PropTypes } from "prop-types";

const InputForm = ({formData, setFormData, requiredFields, disabledFields}) => {
  const [createdUserState, createdUserDispatch] = useReducer(RequestReducer.reducer, {
    data: null,
    loading: null,
    error: null
  })

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
      {
        Object.keys(formData).map((key, index) => (
          <TextField 
            key={index}
            label={camelCaseToCapitalizedWords(key)}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required = {requiredFields && requiredFields.contains(key)}
            disabled = {disabledFields && disabledFields.contains(key)}
          />
        ))
      }
      {
        createdUserState.loading && <CircularProgress/> ||
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: '1rem'}}>
          Submit
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

InputForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  requiredFields: PropTypes.instanceOf(Set),
  disabledFields: PropTypes.instanceOf(Set),
};

export default InputForm;
