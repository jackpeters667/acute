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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';

export default function DialogNewExpense() {
  const [departmentsCol, loadings, errors] = useCollection(
    collection(db, "departments"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameHelper, setNameHelper] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [amountError, setAmountError] = React.useState(false);
  const [amountHelper, setAmountHelper] = React.useState("");
  const [date, setDate] = React.useState("");
  const [dateError, setdateError] = React.useState(false);
  const [dateHelper, setdateHelper] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [isActiveError, setsActiveError] = React.useState(false);
  const [isActiveHelper, setisActiveHelper] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const err: string = "This is a required field";
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  function checkName(e: string) {
    setName(e);
    if (e.length != 0) {
      setNameError(false);
      setNameHelper("");
    } else {
      setNameError(true);
      setNameHelper(err);
    }
  }

  function checkAmount(e: string) {
    setAmount(e);
    if (e.length != 0) {
      setAmountError(false);
      setAmountHelper("");
    } else {
      setAmountError(true);
      setAmountHelper(err);
    }
  }

  function checkdate(e: string) {
    setDate(e);
  }

//   function checkisActive(e: string) {
//     setIsActive(e);

  const handleClose = () => {
    setOpen(false);
  };


  const createExpense = async () => {
    if (
      !nameError &&
      !amountError &&
      !dateError &&
      !isActiveError
    ) {
      try {
        const docRef = await addDoc(collection(db, "Expenses"), {
          Name:name,
          Amount: amount,
          Date: date,
          isActive: isActive,
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
        New Expense
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Expense</DialogTitle>
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
                error={nameError}
                id="outlined-error-helper-text"
                label="expense name"
                placeholder=""
                defaultValue=""
                onChange={(e) => checkName(e.target.value)}
                helperText={nameHelper}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VerticalSplitIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={amountError}
                id="outlined-error-helper-text"
                label="amount"
                placeholder=""
                defaultValue=""
                onChange={(e) => checkAmount(e.target.value)}
                helperText={amountHelper}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
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
                
              <TextField
                error={isActiveError}
                id="outlined-error-helper-text"
                label="No"
                placeholder=""
                defaultValue=""
                type="radio"
                 value="No"
                 onClick={(e) => setIsActive(true)}
              />
              
            </div>
           
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createExpense}>Add Expense</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
