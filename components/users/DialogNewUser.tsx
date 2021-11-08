import * as React from "react";
import { TextField, Dialog, Button } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { Add } from "@mui/icons-material";

export default function DialogNewUser() {
  const [firstName, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameHelper, setFirstNameHelper] = React.useState("");
  const [lastName, setLastName] = React.useState("");
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

  const createUser = async () => {
    if (!lastNameError && !firstNameError) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          firstName: firstName,
          lastName: lastName,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setOpen(false);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<Add />}>
        New
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create User</DialogTitle>
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
                error={firstNameError}
                id="outlined-error-helper-text"
                label="First Name"
                placeholder="Alice"
                defaultValue=""
                onChange={(e) => checkFirstName(e.target.value)}
                helperText={firstNameHelper}
              />
              <TextField
                error={lastNameError}
                id="outlined-error-helper-text"
                label="Last Name"
                placeholder="Malice"
                defaultValue=""
                onChange={(e) => checkLastName(e.target.value)}
                helperText={lastNameHelper}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createUser}>Add User</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
