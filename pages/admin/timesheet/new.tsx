import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../../config/firebase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useCollection } from "react-firebase-hooks/firestore";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";

export default function New() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [started, setStarted] = useState();
  const [ended, setEnded] = useState();
  const [time, setTime] = useState("");
  const [selectedUID, setSelectedUserID] = React.useState("");

  const [usersCol, loadings, errors] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

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
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <div className="newUserTitle text-2xl font-bold">New Timesheet</div>
        <form
          className="userUpdateForm flex justify-between mt-5"
          onSubmit={createTimesheet}
        >
          <div className="userUpdateLeft">
            <div className="userUpdateItem flex flex-col mt-2">
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
              <label className="mb-1 text-sm">Date</label>
              <input
                type="date"
                className="userUpdateInput text-base shadow-sm w-60 border-none border-b-2 border-gray-600 h-7"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
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
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
  router.push("/");
  return null;
}
