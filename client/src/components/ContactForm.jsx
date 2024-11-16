import { useState } from "react";
import { Stack, TextField, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import apiRequest from "../lib/apiRequest";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  company: "",
  jobTitle: "",
};

const ContactForm = () => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!values.firstName) newErrors.firstName = "First name is required";
    if (!values.lastName) newErrors.lastName = "Last name is required";
    if (!values.email) newErrors.email = "Email is required";
    if (!values.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!values.company) newErrors.company = "Company is required";
    if (!values.jobTitle) newErrors.jobTitle = "Job title is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await apiRequest.post("api/contacts", values);
        if (response.status == 200) {
          console.log("Form Submission successfull:", response.data);
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
      setValues(defaultValues);
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="50px" height="80vh">
      <Box>
        <Typography
          variant="h4"
          sx={{ padding: "5px", display: "flex", justifyContent: "flex-start" }}
        >
          Contact Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={400}>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              value={values.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={values.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              name="email"
              label="Email"
              placeholder="youremail@gmail.com"
              variant="outlined"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={values.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <TextField
              name="company"
              label="Company"
              variant="outlined"
              value={values.company}
              onChange={handleChange}
              error={!!errors.company}
              helperText={errors.company}
            />
            <TextField
              name="jobTitle"
              label="Job Title"
              variant="outlined"
              value={values.jobTitle}
              onChange={handleChange}
              error={!!errors.jobTitle}
              helperText={errors.jobTitle}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/">
                <Button size="medium" variant="contained">
                  View Contacts
                </Button>
              </Link>
              <Button size="medium" type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
