import * as React from "react";
import { TextField, Dialog, Button, InputAdornment } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Add, Build, Person } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";

export default function DialogNewDepartment() {
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentHelper, setDepartmentHelper] = React.useState("");
  const [departmentError, setDepartmentError] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const err: string = "This is a required field";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createDepartment = async () => {
    if (!departmentError) {
      try {
        const docRef = await addDoc(collection(db, "departments"), {
          departmentName: departmentName,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setOpen(false);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  function checkDepartmentName(e: string) {
    setDepartmentName(e);
    if (e.length != 0) {
      setDepartmentError(false);
      setDepartmentHelper("");
    } else {
      setDepartmentError(true);
      setDepartmentHelper(err);
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<Add />}>
        New
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Department</DialogTitle>
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
                error={departmentError}
                id="outlined-error-helper-text"
                label="department name"
                placeholder="My Department"
                type="text"
                defaultValue=""
                onChange={(e) => checkDepartmentName(e.target.value)}
                helperText={departmentHelper}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Build />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createDepartment}>Add Department</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
