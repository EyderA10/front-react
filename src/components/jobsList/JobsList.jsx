import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  formControl: {
    margin: '0 20px',
    width: "13%",
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const jobsData = [
  {
    id: 1,
    type: "Tailoring",
    making: "Dresses",
    status: "Available",
    quotationCount: 5,
    location: "New York",
  },
  {
    id: 2,
    type: "Embroidery",
    making: "Shirts",
    status: "Available",
    quotationCount: 2,
    location: "London",
  },
  {
    id: 3,
    type: "Printing",
    making: "Hoodies",
    status: "Unavailable",
    quotationCount: 0,
    location: "Paris",
  },
];

export const JobList = () => {
  const classes = useStyles();

  const [jobs, setJobs] = useState(jobsData);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMaking, setSelectedMaking] = useState("");
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleMakingChange = (event) => {
    setSelectedMaking(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSendQuote = () => {
    // send quote
    handleClose();
  };

  const filterJobs = (job) => {
    if (
      selectedLocation !== "" &&
      job.location.toLowerCase() !== selectedLocation.toLowerCase()
    ) {
      return false;
    }
    if (
      selectedMaking !== "" &&
      job.making.toLowerCase() !== selectedMaking.toLowerCase()
    ) {
      return false;
    }
    return true;
  };

  const filteredJobs = jobs.filter(filterJobs);

  return (
    <>
      <Box width={"100%"} sx={{ p: 3 }} display="flex" justifyContent="center">
        <FormControl sx={{ mr: 2 }} className={classes.formControl}>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location-select"
            label="Location"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="new york">New York</MenuItem>
            <MenuItem value="london">London</MenuItem>
            <MenuItem value="paris">Paris</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="making-select-label">Type of Clothing</InputLabel>
          <Select
            labelId="making-select-label"
            id="making-select"
            label="Type of Clothing"
            value={selectedMaking}
            onChange={handleMakingChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="dresses">Dresses</MenuItem>
            <MenuItem value="shirts">Shirts</MenuItem>
            <MenuItem value="hoodies">Hoodies</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">
          Total quotations:{" "}
          {filteredJobs.reduce((total, job) => total + job.quotationCount, 0)}
        </Typography>
      </Box>

      {filteredJobs.length > 0 ? (
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {filteredJobs.map((job) => (
            <Box key={job.id} m={1}>
              <Box border={1} p={2}>
                <Typography variant="h6" textAlign={'center'}>
                  {job.type}
                </Typography>
                <Typography variant="body1">Status: {job.status}</Typography>
                <Typography variant="body1">
                  Location: {job.location}
                </Typography>
                <Typography variant="body1">
                  Quotations: {job.quotationCount}
                </Typography>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(job)}
                >
                  Send quote
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <Typography variant="h5">No jobs available</Typography>
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.modalContainer}>
          {selectedJob && (
            <>
              <Typography variant="h4" textAlign={'center'}>
                {selectedJob.type}
              </Typography>
              <Typography variant="body1">
                Status: {selectedJob.status}
              </Typography>
              <Typography variant="body1">
                Making: {selectedJob.making}
              </Typography>
              <Typography variant="body1">
                Location: {selectedJob.location}
              </Typography>
              <Typography variant="body1">
                Quotations: {selectedJob.quotationCount}
              </Typography>
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                fullWidth
                className={classes.textField}
                value={price}
                onChange={handlePriceChange}
              />
              <TextField
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                className={classes.textField}
                value={comments}
                onChange={handleCommentsChange}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleSendQuote}
              >
                Send quote
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
