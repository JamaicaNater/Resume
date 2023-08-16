import { useReducer } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material"; // Using Material-UI components
import { RequestReducer } from "../utils/requestReducer";
import { camelCaseToCapitalizedWords } from "../utils/formatting";
import { PropTypes } from "prop-types";

const InputForm = ({formData, setFormData, apiRequest, requiredFields, disabledFields, ignoredFields, onSucessfulSubmission, onFailedSubmission}) => {
  const [createdDataState, createdDataDispatch] = useReducer(RequestReducer.reducer, {
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

  const createData = async () => {
    try {
        createdDataDispatch(RequestReducer.setLoading(true))
        let createdData = await apiRequest(formData);
        createdDataDispatch(RequestReducer.setData(createdData))
        onSucessfulSubmission && onSucessfulSubmission(createdData);
    } catch (error) {
        createdDataDispatch(RequestReducer.setError(error));
        onFailedSubmission && onFailedSubmission(error);
    }   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createData()
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      {
        Object.keys(formData).map((key, index) => {
          if (ignoredFields && ignoredFields.has(key)) {
            return null;
          }

          return (
            <TextField 
              key={index}
              label={camelCaseToCapitalizedWords(key)}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required={requiredFields && requiredFields.has(key)}
              disabled={disabledFields && disabledFields.has(key)}
            />
          );
        })
      }
      {
        createdDataState.loading && <CircularProgress/> ||
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: '1rem'}}>
          Submit
        </Button>
      }
      {
        createdDataState.error && 
        <>
          <Typography color={'red'}>Error: {createdDataState.error?.response?.data?.error}</Typography>
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
  ignoredFields: PropTypes.instanceOf(Set),
  apiRequest: PropTypes.func.isRequired,
  onSucessfulSubmission: PropTypes.func.isRequired,
  onFailedSubmission: PropTypes.func.isRequired,
};

export default InputForm;
