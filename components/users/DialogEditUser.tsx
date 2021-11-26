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
import { Mail, Phone, Person } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";

export default function DialogEditUser(props: {
  user: User;
  dialogState: React.Dispatch<React.SetStateAction<boolean>>;
  dialogOpen: boolean;
}) {
  const setDialogOpen = props.dialogState;
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentID, setDepartmentID] = React.useState("");
  const [departmentError, setDepartmentError] = React.useState(true);
  const [firstName, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameHelper, setFirstNameHelper] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameHelper, setLastNameHelper] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberHelper, setPhoneNumberHelper] = React.useState("");
  const err: string = "This is a required field";

  const [departmentsCol, loadings, errors] = useCollection(
    collection(db, "departments"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
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

  const initState = (user: User) => () => {
    console.log("in method: ", user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setDepartmentName(user.departmentName);
    setDepartmentID(user.department);
    if (user.emailAddress) {
      setEmailAddress(user.emailAddress);
    }
    setPhoneNumber(user.phoneNumber);
  };

  if (props.user) {
    let user = props.user;
    console.log("first name: ", firstName);
    // setDepartmentName(user.departmentName);
    // setFirstName(user.firstName);
    // setLastName(user.lastName);
    // if (user.emailAddress) {
    //   setEmailAddress(user.emailAddress);
    // }
    // setPhoneNumber(user.phoneNumber);

    //    console.log("First Name ", firstName);
    const handleClose = () => {
      setDialogOpen(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
      setDepartmentError(false);
      setDepartmentID(event.target.value[0] as string);
      setDepartmentName(event.target.value[1] as string);
    };

    const editUser = async () => {
      if (firstNameError) {
        setFirstName(props.user.firstName);
        setFirstNameError(false);
      }
      if (lastNameError) {
        setLastName(props.user.lastName);
        setLastNameError(false);
      }
      if (phoneNumberError) {
        setPhoneNumber(props.user.phoneNumber);
        setPhoneNumberError(false);
      }
      if (departmentError) {
        setDepartmentID(props.user.department);
        setDepartmentName(props.user.departmentName);
        setDepartmentError(false);
      }
      if (
        !lastNameError &&
        !firstNameError &&
        !phoneNumberError &&
        !departmentError
      ) {
        try {
          let uid = props.user.id;
          if (uid) {
            const documentRef = doc(db, "users", uid.toString());
            await updateDoc(documentRef, {
              firstName: firstName,
              lastName: lastName,
              emailAddress: emailAddress,
              phoneNumber: phoneNumber,
              department: departmentID,
              departmentName: departmentName,
              created: serverTimestamp(),
            });
            console.log("Document written with ID: ", documentRef.id);
            setDialogOpen(false);
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    };

    return (
      <div>
        <Dialog open={props.dialogOpen} onClose={() => handleClose}>
          <DialogTitle>Edit Worker</DialogTitle>
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
                  defaultValue={user.firstName}
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
                  defaultValue={user.lastName}
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
                  defaultValue={user.emailAddress}
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
                  defaultValue={user.phoneNumber}
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
                <InputLabel id="demo-simple-select-label">
                  department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="department"
                  onChange={handleChange}
                  defaultValue={user.departmentName}
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
            <Button onClick={editUser}>Edit Worker</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
}
