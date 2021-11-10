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

export default function DialogEditUser(props: {
  user: EditUser | undefined;
  dialogState: React.Dispatch<React.SetStateAction<boolean>>;
  dialogOpen: boolean;
}) {
  const [departmentsCol, loadings, errors] = useCollection(
    collection(db, "departments"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  let myUser = props.user?.user;
  const setDialogOpen = props.dialogState;
  const [departmentName, setDepartmentName] = React.useState(
    myUser?.departmentName
  );
  console.log("user:", props);
  const [departmentID, setDepartmentID] = React.useState(myUser?.department);
  const [departmentError, setDepartmentError] = React.useState(true);
  const [firstName, setFirstName] = React.useState(myUser?.firstName);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameHelper, setFirstNameHelper] = React.useState("");
  const [lastName, setLastName] = React.useState(myUser?.lastName);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameHelper, setLastNameHelper] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState(myUser?.phoneNumber);
  const [emailAddress, setEmailAddress] = React.useState(myUser?.emailAddress);
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberHelper, setPhoneNumberHelper] = React.useState("");
  const err: string = "This is a required field";

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

  function checkEmailAddress(e: string) {
    setEmailAddress(e);
  }

  function checkPhoneNumber(e: string) {
    setPhoneNumber(e.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1"));
    console.log("phone", phoneNumber);
  }

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDepartmentError(false);
    setDepartmentID(event.target.value[0] as string);
    setDepartmentName(event.target.value[1] as string);
  };

  const createUser = async () => {
    if (
      !lastNameError &&
      !firstNameError &&
      !phoneNumberError &&
      !departmentError
    ) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          phoneNumber: phoneNumber,
          department: departmentID,
          departmentName: departmentName,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setDialogOpen(false);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <Dialog open={props.dialogOpen} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
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
                label="first name"
                placeholder="Alice"
                defaultValue={myUser?.firstName}
                onChange={(e) => checkFirstName(e.target.value)}
                helperText={firstNameHelper}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={lastNameError}
                id="outlined-error-helper-text"
                label="last name"
                placeholder="Malice"
                defaultValue={myUser?.lastName}
                onChange={(e) => checkLastName(e.target.value)}
                helperText={lastNameHelper}
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
                label="email address"
                placeholder="user@email.com"
                defaultValue={myUser?.emailAddress}
                onChange={(e) => checkEmailAddress(e.target.value)}
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={phoneNumberError}
                id="outlined-error-helper-text"
                label="mobile number"
                placeholder="0712345678"
                defaultValue={myUser?.phoneNumber}
                type="tel"
                onChange={(e) => checkPhoneNumber(e.target.value)}
                helperText={phoneNumberHelper}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <FormControl fullWidth error={departmentError}>
              <InputLabel id="demo-simple-select-label">department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="department"
                onChange={handleChange}
                defaultValue={myUser?.departmentName}
                renderValue={(value) => <span>{departmentName}</span>}
              >
                {departmentsCol?.docs.map((department) => (
                  <MenuItem
                    className="text-black"
                    key={department.id}
                    value={[department.id, department.get("departmentName")]}
                  >
                    {department.get("departmentName")}
                  </MenuItem>
                ))}
              </Select>
              {departmentError && (
                <FormHelperText>This is required!</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createUser}>Edit User</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
