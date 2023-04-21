import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  CardActions,
  Card,
  CardContent,
  IconButton,
  Alert,
  CircularProgress
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Cancel as CancelIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { states, types } from "../../helpers/constants";
import { postJob } from "../../services/api";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginLeft: "auto",
  },
  input: {
    display: "none",
  },
  button: {
    marginRight: theme.spacing(2),
  },
  thumbnail: {
    position: "relative",
    margin: theme.spacing(1),
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  thumbnailRemoveButton: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
  },
}));

export const PostJob = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    postcode: "",
    state: "",
    typeClothing: "",
    images: [],
    description: "",
    budget: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({ message: "", severity: "" });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: validateField(name, value),
    }));
  };

  const handleImageUpload = (e) => {
    const uploadedImages = Array.from(e.target.files);
    const newImages = uploadedImages.map((image) => ({
      id: uuidv4(),
      file: image,
    }));
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleRemoveImage = (id) => {
    const updatedImages = formData.images.filter((image) => image.id !== id);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    const newImages = formData.images.map((image) => image.file);
    const newFormData = {
      ...formData,
      images: newImages,
    };
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      const response = await postJob(newFormData);
      if (response.code === 201) {
        setIsLoading(false);
        setAlert({ message: "Job posted successfully", severity: "success" });
      } else {
        setIsLoading(false);
        setAlert({ message: "Error posting job", severity: "error" });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return !/^[a-zA-Z]+$/.test(value)
          ? "Name can only contain letters"
          : "";
      case "lastName":
        return !/^[a-zA-Z]+$/.test(value)
          ? "Name can only contain letters"
          : "";
      case "phoneNumber":
        return !/^[0-9]/.test(value)
          ? "Phone number must contain only numbers"
          : "";
      case "emailAddress":
        return !/^\S+@\S+.\S+$/.test(value) ? "Invalid email address" : "";
      case "address":
        return value.trim() === "" ? "Address is required" : "";
      case "postcode":
        return !/^[0-9]/.test(value) ? "Postcode must be number" : "";
      case "state":
        return value.trim() === "" ? "State is required" : "";
      case "typeClothing":
        return value.length === 0
          ? "At least one clothing type must be selected"
          : "";
      case "description":
        return value.trim() === "" ? "Description is required" : "";
      default:
        return "";
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName];
      errors[fieldName] = validateField(fieldName, value);
      if (errors[fieldName] === "") {
        delete errors[fieldName];
      }
    });
    return errors;
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Post a Job
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email Address"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              error={Boolean(errors.emailAddress)}
              helperText={errors.emailAddress}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={Boolean(errors.address)}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              error={Boolean(errors.postcode)}
              helperText={errors.postcode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              required
              error={Boolean(errors.state)}
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                name="state"
                value={formData.state}
                label="State"
                onChange={handleInputChange}
                error={Boolean(errors.state)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {states.map((state, idx) => (
                  <MenuItem key={idx} value={state.label}>
                    {state.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              required
              fullWidth
              error={Boolean(errors.typeClothing)}
              className={classes.formControl}
            >
              <InputLabel id="clothing-types-label">
                Types of Clothing
              </InputLabel>
              <Select
                labelId="clothing-types-label"
                name="typeClothing"
                label="Types of Clothing"
                value={formData.typeClothing}
                onChange={handleInputChange}
                error={Boolean(errors.typeClothing)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {types.map((type, idx) => (
                  <MenuItem key={idx} value={type.label}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              variant="outlined"
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="budget"
              name="budget"
              label="Budget"
              type="number"
              value={formData.budget}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid marginTop={1} container spacing={1}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <input
                accept="image/*"
                className={classes.input}
                id="images"
                name="images"
                type="file"
                multiple
                onChange={handleImageUpload}
              />
              <label htmlFor="images">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Images
                </Button>
              </label>
            </Box>
          </Grid>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap={formData.images.length > 2 ? "wrap" : "nowrap"}
            overflow="auto"
            width="100%"
          >
            {formData.images.map((image) => (
              <Grid item key={image.id}>
                <Card className={classes.thumbnail}>
                  <CardContent>
                    <img
                      src={URL.createObjectURL(image.file)}
                      className={classes.thumbnailImage}
                      alt=""
                    />
                    <IconButton
                      className={classes.thumbnailRemoveButton}
                      onClick={() => handleRemoveImage(image.id)}
                      color="error"
                    >
                      <CancelIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
          <Typography
            width={"100%"}
            textAlign={"center"}
            paddingTop={2}
            variant="caption"
          >
            Maximum file size: 10MB per image
          </Typography>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Card>
                <CardActions>
                  <Button
                    variant="contained"
                    className={classes.uploadButton}
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </form>
      {alert.message && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ message: "", severity: "" })}
        >
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};
