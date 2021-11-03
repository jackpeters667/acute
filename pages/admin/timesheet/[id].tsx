import { HourglassBottom, PermIdentity } from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "../../../styles/Users.module.css";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import { doc, getDocFromCache, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

const Details: NextPage = () => {
  const router = useRouter();
  const { id, firstName, lastName, date, started, ended, time } = router.query;
  const docRef = doc(db, "timesheet", id as string);
  const [timeStarted, setStartTime] = useState(started);
  const [timeEnded, setEndTime] = useState(ended);

  function getTime(params: number) {
    var date = new Date((params as number) * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ":" + minutes.substr(-2);
    return `${formattedTime}`;
  }
  function parseTime(s: any) {
    var c = s.split(":");
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }
  // Get a document, forcing the SDK to fetch from the offline cache.
  async function getCachedDocs() {
    try {
      const doc = await getDocFromCache(docRef);
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      console.log("Cached document data:", doc.data());

      setStartTime(getTime(doc.get("started")));
      setEndTime(getTime(doc.get("ended")));

      var minutes = parseTime(timeEnded) - parseTime(timeStarted);
      console.log("minutes:", minutes);
      console.log("hours:", minutes / 602);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  }
  getCachedDocs();

  let started1: string = started as string;
  let ended1: string = ended as string;
  const [first, setFirstName] = useState(firstName);
  const [last, setDepartment] = useState(lastName);
  const [myDate, setStartDate] = useState(date);

  const [myIsActive, setIsActive] = useState(false);
  const [reEnteredTime, setReenteredTime] = useState();
  const updateTimesheet = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (first && last && id && myDate && timeStarted && timeEnded) {
      try {
        const documentRef = doc(db, "timesheet", id.toString());

        await updateDoc(documentRef, {
          firstName: first,
          lastName: last,
          date: myDate,
          started: timeStarted,
          ended: timeEnded,
          time: myIsActive,
        });
        console.log("Document written with ID: ", documentRef.id);
        alert("Task updated");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please check your entries");
    }
  };
  return (
    <>
      <div className="user">
        <div className="userTitleContainer flex items-center justify-between">
          <h1 className="userTitle text-2xl font-bold">Edit Timesheet</h1>
          <Link href="/admin/timesheet/new">
            <button className="userAddButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </Link>
        </div>
        <div className="userContainer flex mt-5">
          <div className={styles.userShow + " shadow-2xl p-5"}>
            <div className="userShowTop flex items-center">
              <div className="userShowTopTitle flex flex-col ml-5">
                <span className="userShowSurname font-semibold text-xl">
                  {firstName}
                </span>
                <span className="userShowFirstName font-light">{lastName}</span>
              </div>
            </div>
            <div className="userShowBottom mt-5">
              <span className="userShowTitle text-base font-semibold text-gray-400">
                Details
              </span>
              <div className="userShowInfo flex items-center mt-5 mb-0 text-gray-600">
                <HourglassBottom className=" text-base" />
                <span className="userShowInfoTitle ml-3">56345</span>
              </div>
              <hr />
              <div className="stats mt-2 flex flex-col">
                <span className="taskName">First Name: {firstName}</span>
                <span className="taskName">Last Name: {lastName}</span>
                <span className="taskName">Date: {date}</span>
                <span className="taskName">Time Started: {timeStarted}</span>
                <span className="taskName">Time Ended: {timeEnded}</span>
                <span className="taskName">Time Difference: {time}</span>
              </div>
            </div>
          </div>
          <div className={styles.userUpdate + " shadow-2xl p-5 ml-5"}>
            <span className="userUpdateTitle text-2xl font-semibold">Edit</span>
            <form
              className="userUpdateForm flex justify-between mt-5"
              onSubmit={updateTimesheet}
            >
              <div className="userUpdateLeft">
                <div className="userUpdateItem flex flex-col mt-2">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Time Ended"
                      value={ended}
                      onChange={(newValue: any) => {
                        setReenteredTime(newValue);
                      }}
                      renderInput={(params: any) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
