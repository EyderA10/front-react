import React, { useEffect, useState } from "react";
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
  Grid,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { states, types } from "../../helpers/constants";
import { apiUrl, getJobById, getJobs, sendQuote } from "../../services/api";

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
    margin: "0 20px",
    width: "13%",
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
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
}));

export const JobList = () => {
  const classes = useStyles();

  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMaking, setSelectedMaking] = useState("");
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");
  const [quotations, setQuotations] = useState(0);
  const [alert, setAlert] = useState({ message: "", severity: "" });

  useEffect(() => {
    const gettingJobs = async () => {
      const data = await getJobs(selectedLocation, selectedMaking);
      setJobs(data);
      let total = 0;
      data.forEach((job) => {
        total += job.quotations.length;
      });
      setQuotations(total);
    };
    gettingJobs();
  }, [selectedLocation, selectedMaking]);

  const handleOpen = async (job) => {
    const jobSelected = await getJobById(job.id);
    setSelectedJob(jobSelected);
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

  const handleSendQuote = async () => {
    const response = await sendQuote({price, comments}, selectedJob?.id)
    if (response?.code === 200) {
      setAlert({ message: response?.message, severity: "success" });
    }else {
      setAlert({ message: "Error to send a quote", severity: "error" });
      console.log(response);
    }
    handleClose();
  };

  return (
    <>
    {alert.message && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ message: "", severity: "" })}
        >
          {alert.message}
        </Alert>
      )}
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
            {states.map((state, idx) => (
              <MenuItem key={idx} value={state.label}>
                {state.label}
              </MenuItem>
            ))}
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
            {types.map((type, idx) => (
              <MenuItem key={idx} value={type.label}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">Total quotations: {quotations}</Typography>
      </Box>

      {jobs.length > 0 ? (
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {jobs.map((job) => (
            <Box key={job.id} m={1}>
              <Box border={1} p={2}>
                <Typography variant="h6" textAlign={"center"}>
                  {job.type_clothing}
                </Typography>
                <Typography variant="body1">Status: {job.status}</Typography>
                <Typography variant="body1">Location: {job.state}</Typography>
                <Typography variant="body1">
                  Quotations: {job.quotations.length}
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
              <Typography variant="h4" textAlign={"center"}>
                {selectedJob.type_clothing}
              </Typography>
              <Typography variant="body1">
                Customer: {`${selectedJob.first_name} ${selectedJob.last_name}`}
              </Typography>
              <Typography variant="body1">
                Phone Number: {selectedJob.phone_number}
              </Typography>
              <Typography variant="body1">
                Status: {selectedJob.status}
              </Typography>
              <Typography variant="body1">
                Making: {selectedJob.description}
              </Typography>
              <Typography variant="body1">
                Location: {selectedJob.state}
              </Typography>
              <Typography variant="body1">
                Quotations: {selectedJob.quotations.length}
              </Typography>
              <Typography variant="body1">
                Images:
              </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexWrap={selectedJob.imageUrls.length > 2 ? "wrap" : "nowrap"}
                  overflow="auto"
                  width="100%"
                >
                  {selectedJob.imageUrls.map((image, idx) => (
                    <Grid item key={idx}>
                      <Card className={classes.thumbnail}>
                        <CardContent>
                          <img
                            src={apiUrl + image}
                            className={classes.thumbnailImage}
                            alt=""
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Box>
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
