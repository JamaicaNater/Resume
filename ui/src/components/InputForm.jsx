import { useEffect, useState } from "react";
import { TextField, Button, Typography, CircularProgress, TextareaAutosize } from "@mui/material"; // Using Material-UI components
import { camelCaseToCapitalizedWords } from "../utils/formatting";
import { PropTypes } from "prop-types";

const InputForm = ({formData, onSubmit, requiredFields, disabledFields, ignoredFields, loading, error}) => {
  const [newFormData, setNewFormData] = useState(formData);

  useEffect(() => {
    console.log('formdata',formData)
  },[formData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onSubmit(newFormData)
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

          if (key === 'details') {
            return (
              <TextareaAutosize
                key={index}
                //TODO: chnage when dark mode
                style={{backgroundColor: 'white', color: 'gray'}}
                sx={{ marginBottom: '.5rem', width: '40vh'}}
                minRows={3}
                placeholder="Enter details..."
                name={key}
                value={newFormData[key]}
                onChange={handleChange}
                required={requiredFields && requiredFields.has(key)}
                disabled={disabledFields && disabledFields.has(key)}
              />
            )
          }

          return (
            <TextField 
              sx={{ marginBottom: '.5rem', width: '40vh' }}
              key={index}
              label={camelCaseToCapitalizedWords(key)}
              name={key}
              value={newFormData[key]}
              onChange={handleChange}
              required={requiredFields && requiredFields.has(key)}
              disabled={disabledFields && disabledFields.has(key)}
            />
          );
        })
      }
      {
        loading && <CircularProgress/> ||
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: '1rem'}}>
          Submit
        </Button>
      }
      {
        error && 
        <>
          <Typography color={'red'}>Error: {error?.response?.data?.error}</Typography>
        </>
      }
    </form>
  );
};

InputForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  requiredFields: PropTypes.instanceOf(Set),
  disabledFields: PropTypes.instanceOf(Set),
  ignoredFields: PropTypes.instanceOf(Set),
  loading: PropTypes.bool,
  error: PropTypes.node,
};

export default InputForm;
