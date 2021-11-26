import * as React from "react";
import {
  TextField,
  Dialog,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Mail, Add, Phone, Person } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateRangeIcon from '@mui/icons-material/DateRange';

export default function DialogNewTimesheet() {
    const [usersCol, loadings, errors] = useCollection(collection(db, "Users"), {
        snapshotListenOptions: { includeMetadataChanges: true },
      });
 
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [dateError, setdateError] = React.useState(false);
  const [dateHelper, setdateHelper] = React.useState("");
  const [started, setStarted] = React.useState();
  const [ended, setEnded] = React.useState();
  const [time, setTime] = React.useState("");
  const [selectedUID, setSelectedUserID] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameHelper, setFirstNameHelper] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameHelper, setLastNameHelper] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const err: string = "This is a required field";

  const handleClickOpen = () => {
    setOpen(true);
  };

  function checkFirstName(e: string) {
    setFirstName(e);
    if (e.length != 0) {
      setFirstNameError(false);
      setFirstNameHelper("");
    } else {
      setFirstNameError(true);
      setFirstNameHelper(err);
    }
  }

  function checkLastName(e: string) {
    setLastName(e);
    if (e.length != 0) {
      setLastNameError(false);
      setLastNameHelper("");
    } else {
      setLastNameError(true);
      setLastNameHelper(err);
    }
  }


  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedUserID(event.target.value[0] as string);
    setFirstName(event.target.value[1] as string);
    setLastName(event.target.value[2] as string);
    console.log(event.target.value);
  };

  function parseMillisecondsIntoReadableTime(milliseconds: number) {
    //Get hours from milliseconds
    var hours = milliseconds / (1000 * 60 * 60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

    return h + ":" + m + ":" + s;
  }


  const createTimesheet = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (firstName && lastName && date && started) {
      try {
        let diff: any;
        if (ended) {
          var date1 = new Date(started); // 9:00 AM
          var date2 = new Date(ended); // 5:00 PM
          diff = date2.valueOf() - date1.valueOf();
          var readableTime = parseMillisecondsIntoReadableTime(diff);
          const docRef = await addDoc(collection(db, "timesheet"), {
            firstName: firstName,
            lastName: lastName,
            date: date,
            started: started,
            ended: ended,
            time: readableTime,
            created: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
          setFirstName("");
          setLastName("");
          alert("Task created");
        } else {
          const docRef = await addDoc(collection(db, "timesheet"), {
            firstName: firstName,
            lastName: lastName,
            date: date,
            started: started,
            ended: ended,
            time: 0,
            created: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
          setFirstName("");
          setLastName("");
          alert("Task created");
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please check your entries");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<Add />}>
        New Timesheet
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
               {usersCol && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Workers</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={`${selectedUID as string},${firstName as string},${
                    //   lastName as string
                    // }`}
                    renderValue={(value) => (
                      <span>{firstName + " " + lastName}</span>
                    )}
                    defaultValue=""
                    label="Worker"
                    onChange={handleChange}
                  >
                    {usersCol?.docs.map((user) => (
                      <MenuItem
                        className="text-black"
                        key={user.id}
                        value={[
                          user.id,
                          user.get("firstName"),
                          user.get("lastName"),
                        ]}
                      >
                        {user.get("firstName") + " " + user.get("lastName")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <TextField
                id="outlined-error-helper-text"
                label="date"
                placeholder=""
                onChange={(e) => setDate(e.target.value)}
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      < DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              </div>

              <div>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Time Started"
                  value={started}
                  onChange={(newValue: any) => {
                    setStarted(newValue);
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
        
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Time Ended"
                  value={ended}
                  onChange={(newValue: any) => {
                    setEnded(newValue);
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>

              </div>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createTimesheet}>Add Timesheet</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
