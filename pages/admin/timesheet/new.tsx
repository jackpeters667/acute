import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../config/firebase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useCollection } from "react-firebase-hooks/firestore";

export default function New() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [started, setEndDate] = useState("");
  const [ended, setEnded] = useState("");
  const [time, setTime] = useState("");
  const [selectedUID, setSelectedUserID] = React.useState("");

  const [usersCol, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedUserID(event.target.value as string);
    console.log(event.target.value);
  };

  const createTask = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (firstName && lastName && date && started) {
      try {
        const docRef = await addDoc(collection(db, "timesheet"), {
          firstName: firstName,
          lastName: lastName,
          date: date,
          started: started,
          ended: ended,
          time: time,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setFirstName("");
        setLastName("");
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
      <div className="newUserTitle text-2xl font-bold">New Timesheet</div>
      <form
        className="userUpdateForm flex justify-between mt-5"
        onSubmit={createTask}
      >
        <div className="userUpdateLeft">
          <div className="userUpdateItem flex flex-col mt-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Workers</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedUID}
                label="Worker"
                onChange={handleChange}
              >
                {usersCol?.docs.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.get("firstName") + " " + user.get("lastName")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <label className="mb-1 text-sm">Task Name</label>
            <input
              type="text"
              className="userUpdateInput text-base shadow-sm w-60 border-none border-b-2 border-gray-600 h-7"
              placeholder="first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="userUpdateItem flex flex-col mt-2">
            <label className="mb-1 text-sm">Department</label>
            <input
              type="text"
              className="userUpdateInput shadow-sm w-60 text-base"
              placeholder="last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="userUpdateItem flex flex-col mt-2">
            <label className="mb-1 text-sm">Start Date</label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="userUpdateInput shadow-sm w-60 text-base"
            />
          </div>
          <div className="userUpdateItem flex flex-col mt-2">
            <label className="mb-1 text-sm">End Date</label>
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              className="userUpdateInput shadow-sm w-60 text-base"
            />
          </div>
          <div className="userUpdateItem flex flex-col mt-2">
            <label className="mb-1 text-sm">Owner</label>
            <input
              type="text"
              onChange={(e) => setEnded(e.target.value)}
              className="userUpdateInput shadow-sm w-60 text-base"
              placeholder="New user"
            />
          </div>
          <div className="userUpdateItem flex flex-col mt-2">
            <label className="mb-1 text-sm">Is Active</label>
            <div className="flex flex-row items-center">
              <input type="radio" id="yes" name="active" value="Yes" />
              <label htmlFor="yes">Yes</label>
            </div>

            <div className="flex flex-row items-center mt-2">
              <input type="radio" id="no" name="active" value="No" />
              <label htmlFor="no">No</label>
            </div>
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
