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
import DateRangeIcon from '@mui/icons-material/DateRange';

export default function DialogNewTask() {
  const [departmentsCol, loadings, errors] = useCollection(
    collection(db, "departments"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [task, setTask] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [departmentError, setDepartmentError] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const err: string = "This is a required field";

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };


  const createTask = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (task && department && startDate && endDate && owner) {
      try {
        const docRef = await addDoc(collection(db, "tasks"), {
          task: task,
          department: department,
          startDate: startDate,
          endDate: endDate,
          owner: owner,
          isActive: isActive,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setTask("");
        setDepartment("");
        alert("Task created");
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
        New Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Task</DialogTitle>
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
              <TextField
                id="outlined-error-helper-text"
                label="task name"
                placeholder=""
                defaultValue=""
                onChange={(e) => setTask(e.target.value)}
              />
              <TextField
                id="outlined-error-helper-text"
                label="Project Owner"
                placeholder="Malice"
                defaultValue=""
                onChange={(e) => setOwner(e.target.value)}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
            <TextField
                id="outlined-error-helper-text"
                label="start date"
                placeholder=""
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      < DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
               <TextField
                id="outlined-error-helper-text"
                label="end date"
                placeholder=""
                onChange={(e) => setEndDate(e.target.value)}
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
            <TextField
            
                label="Approved?"
                type="radio"
                id="yes"
                name="active"
                value="Yes"
                onClick={(e) => setIsActive(true)}
                placeholder=""
                defaultValue=""
                
              />

              <TextField
                id="outlined-error-helper-text"
                label="department"
                placeholder=""
                defaultValue=""
                onChange={(e) => setDepartment(e.target.value)}
              />
              </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
