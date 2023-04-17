import React, { useState } from "react";
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    margin: theme.spacing(2, 0),
  },
  input: {
    display: "none",
  },
}));

export const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    postcode: "",
    state: "",
    clothingTypes: [],
    images: [],
    description: "",
    budget: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClothingTypesChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      clothingTypes: value,
    }));
  };

  const handleImageUpload = (e) => {
    const { files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al backend para procesar la solicitud
    console.log(formData);
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth className={classes.formControl}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                name="state"
                value={formData.state}
                label="State"
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
                <MenuItem value="AR">Arkansas</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="CO">Colorado</MenuItem>
                <MenuItem value="CT">Connecticut</MenuItem>
                <MenuItem value="DE">Delaware</MenuItem>
                <MenuItem value="DC">District Of Columbia</MenuItem>
                <MenuItem value="FL">Florida</MenuItem>
                <MenuItem value="GA">Georgia</MenuItem>
                <MenuItem value="HI">Hawaii</MenuItem>
                <MenuItem value="ID">Idaho</MenuItem>
                <MenuItem value="IL">Illinois</MenuItem>
                <MenuItem value="IN">Indiana</MenuItem>
                <MenuItem value="IA">Iowa</MenuItem>
                <MenuItem value="KS">Kansas</MenuItem>
                <MenuItem value="KY">Kentucky</MenuItem>
                <MenuItem value="LA">Louisiana</MenuItem>
                <MenuItem value="ME">Maine</MenuItem>
                <MenuItem value="MD">Maryland</MenuItem>
                <MenuItem value="MA">Massachusetts</MenuItem>
                <MenuItem value="MI">Michigan</MenuItem>
                <MenuItem value="MN">Minnesota</MenuItem>
                <MenuItem value="MS">Mississippi</MenuItem>
                <MenuItem value="MO">Missouri</MenuItem>
                <MenuItem value="MT">Montana</MenuItem>
                <MenuItem value="NE">Nebraska</MenuItem>
                <MenuItem value="NV">Nevada</MenuItem>
                <MenuItem value="NH">New Hampshire</MenuItem>
                <MenuItem value="NJ">New Jersey</MenuItem>
                <MenuItem value="NM">New Mexico</MenuItem>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="NC">North Carolina</MenuItem>
                <MenuItem value="ND">North Dakota</MenuItem>
                <MenuItem value="OH">Ohio</MenuItem>
                <MenuItem value="OK">Oklahoma</MenuItem>
                <MenuItem value="OR">Oregon</MenuItem>
                <MenuItem value="PA">Pennsylvania</MenuItem>
                <MenuItem value="RI">Rhode Island</MenuItem>
                <MenuItem value="SC">South Carolina</MenuItem>
                <MenuItem value="SD">South Dakota</MenuItem>
                <MenuItem value="TN">Tennessee</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
                <MenuItem value="UT">Utah</MenuItem>
                <MenuItem value="VT">Vermont</MenuItem>
                <MenuItem value="VA">Virginia</MenuItem>
                <MenuItem value="WA">Washington</MenuItem>
                <MenuItem value="WV">West Virginia</MenuItem>
                <MenuItem value="WI">Wisconsin</MenuItem>
                <MenuItem value="WY">Wyoming</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth className={classes.formControl}>
              <InputLabel id="clothing-types-label">
                Types of Clothing
              </InputLabel>
              <Select
                labelId="clothing-types-label"
                name="clothingTypes"
                multiple
                label="Types of Clothing"
                value={formData.clothingTypes}
                onChange={handleClothingTypesChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Blouse">Ethnic Wear - Blouse</MenuItem>
                <MenuItem value="Kurta">Ethnic Wear - Kurta</MenuItem>
                <MenuItem value="Sherwani">Ethnic Wear - Sherwani</MenuItem>
                <MenuItem value="Lehenga">Ethnic Wear - Lehenga</MenuItem>
                <MenuItem value="Saree">Ethnic Wear - Saree</MenuItem>
                <MenuItem value="Salwar">Ethnic Wear - Salwar</MenuItem>
                <MenuItem value="Anarkali">Ethnic Wear - Anarkali</MenuItem>
                <MenuItem value="Gown">Ethnic Wear - Gown</MenuItem>
                <MenuItem value="Dress">Western Wear - Dress</MenuItem>
                <MenuItem value="Jacket">Western Wear - Jacket</MenuItem>
                <MenuItem value="Jeans">Western Wear - Jeans</MenuItem>
                <MenuItem value="Skirt">Western Wear - Skirt</MenuItem>
                <MenuItem value="Top">Western Wear - Top</MenuItem>
                <MenuItem value="Trousers">Western Wear - Trousers</MenuItem>
                <MenuItem value="T-shirt">Western Wear - T-shirt</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
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
        <Grid marginTop={1} container spacing={2}>
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
                  >
                    Submit
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
