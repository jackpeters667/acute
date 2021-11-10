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
import {
  doc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Mail, Phone, Person, Build } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";

export default function DialogEditDepartment(props: {
  departmentName: string;
  department_id: string;
  dialogState: React.Dispatch<React.SetStateAction<boolean>>;
  dialogOpen: boolean;
}) {
  const setDialogOpen = props.dialogState;
  console.log("department:", props);
  const [departmentName, setDepartmentName] = React.useState(
    props.departmentName
  );
  const [departmentHelper, setDepartmentHelper] = React.useState(
    "This is a required field!"
  );
  const [departmentError, setDepartmentError] = React.useState(true);
  const err: string = "This is a required field";

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

  const handleClose = () => {
    setDialogOpen(false);
  };

  const editDepartment = async () => {
    if (!departmentError) {
      try {
        const documentRef = doc(
          db,
          "departments",
          props.department_id.toString()
        );
        await updateDoc(documentRef, {
          departmentName: departmentName,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", documentRef.id);
        setDialogOpen(false);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <Dialog open={props.dialogOpen} onClose={handleClose}>
        <DialogTitle>Edit Department</DialogTitle>
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
                label="department"
                placeholder="My Department"
                defaultValue={departmentName}
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
          <Button onClick={editDepartment}>Edit Department</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
